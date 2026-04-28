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
import { useLanguage } from "../components/language_context";

export default function AuthPage() {
  const router = useRouter();
  const { t } = useLanguage();
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
      toast.error(t("auth.errors.invalidCredentials"));
      setLoading(false);
      return;
    }

    toast.success(t("auth.success.loginSuccess"));
    router.push("/");
    router.refresh();
  }

  async function handleSignUp(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (signupData.password !== signupData.confirmPassword) {
      toast.error(t("auth.errors.passwordMismatch"));
      return;
    }

    if (signupData.password.length < 6) {
      toast.error(t("auth.errors.passwordTooShort"));
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

        const uploadRes = await fetch("/api/auth/upload-profile", {
          method: "POST",
          body: formData,
        });

        if (!uploadRes.ok) {
          toast.error(t("auth.errors.uploadError"));
          setLoading(false);
          setUploading(false);
          return;
        }

        const uploadData = await uploadRes.json();
        profileImageUrl = uploadData.url;
        setUploading(false);
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
        toast.error(data.error || t("auth.errors.signupError"));
        setLoading(false);
        return;
      }

      toast.success(t("auth.success.signupSuccess"));

      // Connexion automatique
      const signInRes = await signIn("credentials", {
        email: signupData.email,
        password: signupData.password,
        redirect: false,
      });

      if (signInRes?.error) {
        toast.error(t("auth.errors.signupError"));
        setMode("signin");
        setLoading(false);
        return;
      }

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error(t("auth.errors.signupError"));
      setLoading(false);
    }
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error(t("auth.errors.fileMustBeImage"));
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-white to-gray-50 p-4">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
        <div className="grid md:grid-cols-2 min-h-[600px]">
          {/* Left side - Welcome / Info */}
          <div className="hidden md:flex flex-col justify-center p-8 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
            <h1 className="text-4xl font-bold mb-4">MyGallery</h1>
            <p className="text-gray-300 mb-6">
              {mode === "signin"
                ? t("auth.signInDescription")
                : t("auth.signUpDescription")}
            </p>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>{t("hero.unlimitedAlbums")}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>{t("hero.easySharing")}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>{t("hero.modernInterface")}</span>
              </div>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="flex flex-col justify-center p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-1 text-center text-black">
              {mode === "signin" ? t("auth.signIn") : t("auth.signUp")}
            </h2>
            <p className="text-gray-600 text-center mb-6 text-sm md:hidden">
              {mode === "signin" ? t("auth.welcomeBack") : t("auth.joinUs")}
            </p>

            {mode === "signin" ? (
              <form onSubmit={handleSignIn} className="space-y-3">
                <div>
                  <Label htmlFor="signin-email">{t("auth.email")}</Label>
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
                  <Label htmlFor="signin-password">{t("auth.password")}</Label>
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
                  className="w-full mt-4 bg-gradient-to-r from-gray-900 to-black hover:from-black hover:to-gray-900 text-white transition-all duration-300 shadow-lg hover:shadow-xl"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {t("common.loading")}
                    </div>
                  ) : (
                    t("auth.login")
                  )}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleSignUp} className="space-y-3">
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
                      <span>{t("auth.optionalImage")}</span>
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
                    <Label htmlFor="firstname">{t("auth.firstname")}</Label>
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
                    <Label htmlFor="surname">{t("auth.surname")}</Label>
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
                  <Label htmlFor="signup-email">{t("auth.email")}</Label>
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
                  <Label htmlFor="signup-password">{t("auth.password")}</Label>
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
                    {t("auth.confirmPassword")}
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
                  className="w-full mt-4 bg-gradient-to-r from-gray-900 to-black hover:from-black hover:to-gray-900 text-white transition-all duration-300 shadow-lg hover:shadow-xl"
                  disabled={loading || uploading}
                >
                  {loading || uploading ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {uploading ? t("common.loading") : t("common.loading")}
                    </div>
                  ) : (
                    t("auth.createAccount")
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
                className="text-sm text-gray-700 hover:text-black hover:underline transition-colors duration-300 font-medium"
              >
                {mode === "signin"
                  ? `${t("auth.noAccount")} ${t("auth.signUpNow")}`
                  : `${t("auth.haveAccount")} ${t("auth.signInNow")}`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
