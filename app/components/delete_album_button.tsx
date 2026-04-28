"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeleteAlbumButtonProps {
  albumId: number;
  albumName: string;
  onDeleted: () => void;
}

export default function DeleteAlbumButton({
  albumId,
  albumName,
  onDeleted,
}: DeleteAlbumButtonProps) {
  const [showDialog, setShowDialog] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    setDeleting(true);
    try {
      const res = await fetch(`/api/albums/${albumId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        toast.error(data.error || "Erreur lors de la suppression");
        setDeleting(false);
        return;
      }

      toast.success(`Album "${albumName}" supprimé avec succès`);
      setShowDialog(false);
      onDeleted();
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la suppression");
      setDeleting(false);
    }
  }

  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setShowDialog(true);
        }}
        className="absolute top-3 right-3 p-2 bg-red-500/90 hover:bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg hover:scale-110 z-10"
        aria-label="Supprimer l'album"
        title="Supprimer l'album"
      >
        <Trash2 className="w-4 h-4" />
      </button>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Supprimer l'album ?</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer l'album{" "}
              <span className="font-semibold">"{albumName}"</span> ?<br />
              <span className="text-red-600 font-medium">
                Toutes les images de cet album seront également supprimées.
              </span>
              <br />
              Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDialog(false)}
              disabled={deleting}
            >
              Annuler
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? "Suppression..." : "Supprimer définitivement"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
