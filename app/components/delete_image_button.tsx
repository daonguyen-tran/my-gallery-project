"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function DeleteImageButton({
  imageId,
  onDeleted,
}: {
  imageId: number;
  onDeleted?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    const res = await fetch(`/api/images/${imageId}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      toast.error("Erreur lors de la suppression.");
      return;
    }

    toast.success("Image supprimée !");
    setOpen(false);

    // If parent provided an onDeleted callback, call it to update UI client-side.
    if (onDeleted) {
      try {
        onDeleted();
        return;
      } catch (e) {
        // fall back to refresh if callback fails
      }
    }

    // Fallback: refresh router to update server-rendered data
    router.refresh();
  }

  return (
    <>
      {/* Bouton dans la miniature */}
      <button
        onClick={() => setOpen(true)}
        className="
          absolute top-3 right-3 
          p-2 rounded-full 
          bg-black/40 backdrop-blur-md 
          text-white 
          opacity-0 group-hover:opacity-100
          transition-all duration-300 
          hover:bg-red-500 hover:shadow-lg
          cursor-pointer
        "
      >
        <Trash2 className="w-4 h-4" />
      </button>

      {/* Dialog de confirmation */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Supprimer cette image ?</DialogTitle>
          </DialogHeader>

          <p className="text-gray-600">
            Cette action est irréversible. L’image sera définitivement
            supprimée. Êtes-vous sûr de vouloir la supprimer ?
          </p>

          <DialogFooter className="mt-4 flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              className="cursor-pointer"
            >
              Annuler
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              className="cursor-pointer"
            >
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
