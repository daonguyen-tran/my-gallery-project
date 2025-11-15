"use client";

import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { ImagePlus, Loader2, Trash2 } from "lucide-react";

export default function AddImageCard({
  albumId,
  onUploaded,
}: {
  albumId: number;
  onUploaded: () => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0];
    setFile(selected || null);

    if (selected) {
      setPreview(URL.createObjectURL(selected));
    }
  }

  function removeSelectedImage() {
    setFile(null);
    setPreview(null);
    setTitle("");
  }

  async function handleUpload() {
    if (!file) {
      toast.error("⚠️ Veuillez sélectionner une image");
      return;
    }

    setLoading(true);
    setProgress(40);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("albumId", String(albumId));
    formData.append("title", title || file.name);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        setLoading(false);
        return toast.error("❌ Erreur lors de l’upload");
      }

      setProgress(100);
      toast.success("✅ Image ajoutée !");

      setOpen(false); // 🔥 Ferme la modal proprement
      removeSelectedImage();

      onUploaded(); // 🔥 Notifie le parent (AlbumPage) pour reload
    } catch (err) {
      console.error(err);
      toast.error("❌ Erreur serveur");
    } finally {
      setLoading(false);
      setTimeout(() => setProgress(0), 400);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 cursor-pointer">
          <ImagePlus className="w-5 h-5" />
          Ajouter une image
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Ajouter une nouvelle image</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Preview */}
          <div className="relative group border rounded-lg p-4 bg-gray-50 overflow-hidden flex flex-col items-center justify-center">
            {preview ? (
              <>
                <img
                  src={preview}
                  className="max-h-48 rounded-lg shadow transition-transform duration-300 group-hover:scale-105"
                />
                <button
                  onClick={removeSelectedImage}
                  className="absolute top-3 right-3 p-2 rounded-full bg-black/40 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-500 hover:shadow-lg cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </>
            ) : (
              <div className="text-gray-400 text-center py-10">
                <ImagePlus className="w-12 h-12 mx-auto opacity-30" />
                <p className="mt-2">Preview</p>
                <p className="mt-2">Aucune image sélectionnée</p>
              </div>
            )}
          </div>

          {/* File Input */}
          <div className="space-y-2">
            <Label>Image</Label>

            <div
              className="border border-dashed border-gray-300 hover:border-gray-400 rounded-lg p-3 flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer bg-gray-50 hover:bg-gray-100"
              onClick={() =>
                document.getElementById("fileInputHidden")?.click()
              }
            >
              <ImagePlus className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-600">Choisir une image</span>
            </div>

            <input
              id="fileInputHidden"
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileSelect}
            />
          </div>

          {/* Title Input */}
          <div className="space-y-2">
            <Label>Titre (optionnel)</Label>
            <Input
              placeholder="Titre de l’image"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {loading && <Progress value={progress} className="h-2" />}

          <Button
            onClick={handleUpload}
            disabled={loading || !file}
            className="w-full cursor-pointer"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Upload...
              </div>
            ) : (
              "Ajouter"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
