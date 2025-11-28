"use client";

import { FormEvent, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Upload, UserCircle, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function ProfilePage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Form data
  const [formData, setFormData] = useState({
    firstname: "",
    surname: "",
    email: "",
  });
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string>("");

  // Confirmation dialogs
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Load initial data from session
  useEffect(() => {
    if (session?.user) {
      const nameParts = session.user.name?.split(" ") || ["", ""];
      setFormData({
        firstname: nameParts[0] || "",
        surname: nameParts.slice(1).join(" ") || "",
        email: session.user.email || "",
      });
      if (session.user.image) {
        setProfileImagePreview(session.user.image);
      }
    }
  }, [session]);

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth");
    }
  }, [status, router]);

  // Check for changes
  useEffect(() => {
    if (!session?.user) return;
    const nameParts = session.user.name?.split(" ") || ["", ""];
    const originalFirstname = nameParts[0] || "";
    const originalSurname = nameParts.slice(1).join(" ") || "";

    const changed =
      formData.firstname !== originalFirstname ||
      formData.surname !== originalSurname ||
      profileImage !== null;

    setHasChanges(changed);
  }, [formData, profileImage, session]);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Le fichier doit être une image");
        return;
      }
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  async function handleSave() {
    setShowSaveDialog(false);
    setLoading(true);

    try {
      let profileImageUrl = session?.user?.image || "";

      // Upload new profile image if changed
      if (profileImage) {
        setUploading(true);
        const formDataUpload = new FormData();
        formDataUpload.append("file", profileImage);

        const uploadRes = await fetch("/api/auth/upload-profile", {
          method: "POST",
          body: formDataUpload,
        });

        if (!uploadRes.ok) {
          toast.error("Erreur lors de l'upload de l'image");
          setLoading(false);
          setUploading(false);
          return;
        }

        const uploadData = await uploadRes.json();
        profileImageUrl = uploadData.url;
        setUploading(false);
      }

      // Update profile
      const res = await fetch("/api/auth/update-profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstname: formData.firstname,
          surname: formData.surname,
          profileImage: profileImageUrl,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        toast.error(data.error || "Erreur lors de la mise à jour");
        setLoading(false);
        return;
      }

      // Mettre à jour la session avec les nouvelles données
      await update({
        ...session,
        user: {
          ...session?.user,
          name: `${formData.firstname} ${formData.surname}`,
          image: profileImageUrl,
        },
      });

      toast.success("Profil mis à jour avec succès !");
      setProfileImage(null);
      setLoading(false);

      // Rediriger vers la page d'accueil après un court délai
      setTimeout(() => {
        router.push("/");
      }, 500);
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la mise à jour");
      setLoading(false);
    }
  }

  function handleCancel() {
    if (!hasChanges) {
      router.push("/");
      return;
    }
    setShowCancelDialog(true);
  }

  function confirmCancel() {
    setShowCancelDialog(false);
    // Reset form to original values
    if (session?.user) {
      const nameParts = session.user.name?.split(" ") || ["", ""];
      setFormData({
        firstname: nameParts[0] || "",
        surname: nameParts.slice(1).join(" ") || "",
        email: session.user.email || "",
      });
      setProfileImage(null);
      setProfileImagePreview(session.user.image || "");
    }
    router.push("/");
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-50 py-12 px-4 animate-fadeIn">
      <div className="max-w-2xl mx-auto">
        {/* Back button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-700 hover:text-black mb-6 transition-all duration-300 font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour
        </Link>

        {/* Profile card */}
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-8 hover:shadow-3xl transition-shadow duration-300">
          <h1 className="text-3xl font-bold mb-2 text-black">Mon Profil</h1>
          <p className="text-gray-600 mb-8">
            Gérez vos informations personnelles
          </p>

          <form className="space-y-6">
            {/* Profile Image */}
            <div className="flex flex-col items-center">
              <div className="relative w-32 h-32 mb-4">
                {profileImagePreview ? (
                  <Image
                    src={profileImagePreview}
                    alt="Profile"
                    fill
                    className="rounded-full object-cover border-4 border-gray-200"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-700 to-black flex items-center justify-center border-4 border-gray-200">
                    <UserCircle className="w-16 h-16 text-white" />
                  </div>
                )}
              </div>
              <label htmlFor="profile-image-edit" className="cursor-pointer">
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition">
                  <Upload className="w-4 h-4" />
                  <span className="text-sm">Changer la photo</span>
                </div>
                <input
                  id="profile-image-edit"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Name fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstname">Prénom</Label>
                <Input
                  id="firstname"
                  type="text"
                  value={formData.firstname}
                  onChange={(e) =>
                    setFormData({ ...formData, firstname: e.target.value })
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="surname">Nom</Label>
                <Input
                  id="surname"
                  type="text"
                  value={formData.surname}
                  onChange={(e) =>
                    setFormData({ ...formData, surname: e.target.value })
                  }
                  className="mt-1"
                />
              </div>
            </div>

            {/* Email (readonly) */}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                disabled
                className="mt-1 bg-gray-50"
              />
              <p className="text-xs text-gray-500 mt-1">
                L'email ne peut pas être modifié
              </p>
            </div>

            {/* Role display */}
            <div>
              <Label>Rôle</Label>
              <div className="mt-1">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${
                    session.user.role === "ADMIN"
                      ? "bg-black text-white border-black"
                      : session.user.role === "USER"
                      ? "bg-gray-200 text-gray-900 border-gray-300"
                      : "bg-gray-100 text-gray-700 border-gray-200"
                  }`}
                >
                  {session.user.role === "ADMIN"
                    ? "Administrateur"
                    : session.user.role === "USER"
                    ? "Utilisateur"
                    : "Invité"}
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                onClick={() => setShowSaveDialog(true)}
                disabled={!hasChanges || loading || uploading}
                className="flex-1 cursor-pointer bg-gradient-to-r from-gray-900 to-black hover:from-black hover:to-gray-900 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {loading || uploading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {uploading ? "Upload..." : "Enregistrement..."}
                  </div>
                ) : (
                  "Enregistrer les modifications"
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={loading || uploading}
                className="flex-1 cursor-pointer border-2 border-gray-300 hover:border-black text-gray-700 hover:text-black hover:bg-gray-50 transition-all duration-300"
              >
                Annuler
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Save confirmation dialog */}
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmer les modifications</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir enregistrer ces modifications ?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSaveDialog(false)}>
              Annuler
            </Button>
            <Button onClick={handleSave}>Confirmer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cancel confirmation dialog */}
      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Annuler les modifications</DialogTitle>
            <DialogDescription>
              Vous avez des modifications non enregistrées. Voulez-vous vraiment
              quitter sans sauvegarder ?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowCancelDialog(false)}
            >
              Continuer l'édition
            </Button>
            <Button variant="destructive" onClick={confirmCancel}>
              Quitter sans sauvegarder
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
