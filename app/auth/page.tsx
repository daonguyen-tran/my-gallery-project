"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Upload, UserCircle } from "lucide-react";
import Image from "next/image";

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  // Signin
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Signup
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstname: "",
    surname: "",
  });
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string>("");
  const [uploading, setUploading] = useState(false);

  async function handleSignIn(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      toast.error("Email ou mot de passe incorrect.");
      setLoading(false);
      return;
    }

    toast.success("Connexion réussie !");
    router.push("/");
    router.refresh();
  }

  async function handleSignUp(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (signupData.password !== signupData.confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas");
      return;
    }

    if (signupData.password.length < 6) {
      toast.error("Le mot de passe doit contenir au moins 6 caractères");
      return;
    }

    setLoading(true);

    try {
      let profileImageUrl = "";

      // Upload de l'image de profil si présente
      if (profileImage) {
        setUploading(true);
        const formData = new FormData();
        formData.append("file", profileImage);

        try {
          const uploadRes = await fetch("/api/auth/upload-profile", {
            method: "POST",
            body: formData,
          });

          if (!uploadRes.ok) {
            toast.error("Erreur lors de l'upload de l'image (bucket Supabase non configuré). Compte créé sans photo.");
            setUploading(false);
            // Continue sans photo de profil au lieu d'arrêter
          } else {
            const uploadData = await uploadRes.json();
            profileImageUrl = uploadData.url;
            setUploading(false);
          }
        } catch (uploadError) {
          console.error("Upload error:", uploadError);
          toast.error("Erreur upload - Compte créé sans photo");
          setUploading(false);
          // Continue sans photo de profil
        }
      }

      // Créer le compte
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: signupData.email,
          password: signupData.password,
          firstname: signupData.firstname,
          surname: signupData.surname,
          profileImage: profileImageUrl,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Erreur lors de la création du compte");
        setLoading(false);
        return;
      }

      toast.success("Compte créé avec succès ! Connexion...");

      // Connexion automatique
      const signInRes = await signIn("credentials", {
        email: signupData.email,
        password: signupData.password,
        redirect: false,
      });

      if (signInRes?.error) {
        toast.error("Compte créé mais erreur de connexion");
        setMode("signin");
        setLoading(false);
        return;
      }

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la création du compte");
      setLoading(false);
    }
  }

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

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 md:p-8">
      <div className="bg-white w-full max-w-5xl aspect-[16/10] max-h-[85vh] rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="grid md:grid-cols-2 h-full">
          {/* Left side - Welcome / Info */}
          <div className="hidden md:flex flex-col justify-center p-8 lg:p-10 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 lg:mb-6">MyGallery</h1>
            <p className="text-blue-100 mb-6 lg:mb-8 text-base lg:text-lg leading-relaxed">
              {mode === "signin"
                ? "Bienvenue ! Connectez-vous pour accéder à vos albums et partager vos plus beaux souvenirs."
                : "Rejoignez notre communauté et créez votre propre galerie photo en quelques clics."}
            </p>
            <div className="space-y-3 lg:space-y-4 text-sm lg:text-base text-blue-100">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>Albums illimités</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>Partage facile</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>Interface moderne</span>
              </div>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="flex flex-col justify-center p-6 md:p-8 lg:p-10">
            <h2 className="text-2xl lg:text-3xl font-bold mb-2 text-center">
              {mode === "signin" ? "Connexion" : "Créer un compte"}
            </h2>
            <p className="text-gray-500 text-center mb-6 text-sm md:hidden">
              {mode === "signin"
                ? "Bienvenue sur MyGallery"
                : "Rejoignez notre communauté"}
            </p>

            {mode === "signin" ? (
              <form onSubmit={handleSignIn} className="space-y-3">
                <div>
                  <Label htmlFor="signin-email">Email</Label>
                  <Input
                    id="signin-email"
                    type="email"
                    placeholder="votre@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="signin-password">Mot de passe</Label>
                  <Input
                    id="signin-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full mt-4"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Connexion...
                    </div>
                  ) : (
                    "Se connecter"
                  )}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleSignUp} className="space-y-2">
                {/* Photo de profil */}
                <div className="flex flex-col items-center mb-2">
                  <div className="relative w-20 h-20 mb-2">
                    {profileImagePreview ? (
                      <Image
                        src={profileImagePreview}
                        alt="Aperçu"
                        fill
                        className="rounded-full object-cover border-2 border-gray-200"
                      />
                    ) : (
                      <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center border-2 border-gray-200">
                        <UserCircle className="w-12 h-12 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <label htmlFor="profile-image" className="cursor-pointer">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition text-xs">
                      <Upload className="w-4 h-4" />
                      <span>Photo de profil (optionnel)</span>
                    </div>
                    <input
                      id="profile-image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="firstname">Prénom</Label>
                    <Input
                      id="firstname"
                      type="text"
                      placeholder="Jean"
                      value={signupData.firstname}
                      onChange={(e) =>
                        setSignupData({
                          ...signupData,
                          firstname: e.target.value,
                        })
                      }
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="surname">Nom</Label>
                    <Input
                      id="surname"
                      type="text"
                      placeholder="Dupont"
                      value={signupData.surname}
                      onChange={(e) =>
                        setSignupData({
                          ...signupData,
                          surname: e.target.value,
                        })
                      }
                      required
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="votre@email.com"
                    value={signupData.email}
                    onChange={(e) =>
                      setSignupData({ ...signupData, email: e.target.value })
                    }
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="signup-password">Mot de passe</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="Min. 6 caractères"
                    value={signupData.password}
                    onChange={(e) =>
                      setSignupData({ ...signupData, password: e.target.value })
                    }
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="confirm-password">
                    Confirmer le mot de passe
                  </Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="••••••••"
                    value={signupData.confirmPassword}
                    onChange={(e) =>
                      setSignupData({
                        ...signupData,
                        confirmPassword: e.target.value,
                      })
                    }
                    required
                    className="mt-1"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full mt-4"
                  disabled={loading || uploading}
                >
                  {loading || uploading ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {uploading ? "Upload en cours..." : "Création..."}
                    </div>
                  ) : (
                    "Créer mon compte"
                  )}
                </Button>
              </form>
            )}

            <div className="mt-4 text-center">
              <button
                onClick={() => {
                  setMode(mode === "signin" ? "signup" : "signin");
                  setLoading(false);
                }}
                className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
              >
                {mode === "signin"
                  ? "Pas encore de compte ? Créer un compte"
                  : "Déjà un compte ? Se connecter"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
