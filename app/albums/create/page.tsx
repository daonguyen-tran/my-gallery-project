"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2, FolderPlus, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CreateAlbumPage() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function handleCreate() {
    if (!name.trim()) {
      toast.error("Le nom est obligatoire");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/albums", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      if (!res.ok) {
        toast.error("Erreur lors de la création");
        return;
      }

      const album = await res.json();
      toast.success("Album créé avec succès");

      router.push(`/albums/${album.id}`);
    } finally {
      setLoading(false);
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !loading) {
      handleCreate();
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Pattern de fond décoratif */}
      <div className="absolute inset-0 opacity-30">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="20" cy="20" r="1.5" fill="#000000" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Bouton retour */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-700 hover:text-black mb-8 transition-all duration-300 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Retour à la galerie</span>
        </Link>

        <Card className="shadow-2xl border border-gray-200 overflow-hidden hover:shadow-3xl transition-shadow duration-300">
          <CardHeader className="bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white py-6 border-b border-gray-700">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20">
                <FolderPlus className="w-8 h-8" />
              </div>
              <div>
                <CardTitle className="text-3xl font-bold ">
                  Créer un nouvel album
                </CardTitle>
                <p className="text-gray-300 mt-1 text-sm">
                  Organisez vos photos en créant un album
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-8 pb-6 space-y-6 bg-white">
            <div className="space-y-3">
              <Label
                htmlFor="name"
                className="text-base font-semibold text-gray-900"
              >
                Nom de l'album <span className="text-black">*</span>
              </Label>
              <Input
                id="name"
                placeholder="Ex: Vacances à la montagne"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyPress={handleKeyPress}
                className="text-base py-6 border-gray-300 focus:border-black focus:ring-black transition-all duration-300"
                autoFocus
              />
              <p className="text-sm text-gray-500">
                Choisissez un nom descriptif pour votre album
              </p>
            </div>
          </CardContent>

          <CardFooter className="bg-gray-50 flex gap-3 border-t border-gray-100">
            <Button
              variant="outline"
              className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400 transition-all duration-300 cursor-pointer"
              onClick={() => router.push("/")}
              disabled={loading}
            >
              Annuler
            </Button>
            <Button
              className="flex-1 bg-gradient-to-r from-gray-900 to-black hover:from-black hover:to-gray-900 text-white font-semibold cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={handleCreate}
              disabled={loading || !name.trim()}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Création...
                </>
              ) : (
                <>
                  <FolderPlus className="w-5 h-5 mr-2" />
                  Créer l'album
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
