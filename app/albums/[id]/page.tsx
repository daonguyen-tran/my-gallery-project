"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

import AddImageCard from "@/app/components/add_image_card";
import DeleteImageButton from "@/app/components/delete_image_button";
import ImageViewer from "@/app/components/image_viewer";

export default function AlbumPage(props: { params: Promise<{ id: string }> }) {
  const [album, setAlbum] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Visionneuse
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Charger l’album
  async function loadAlbum() {
    const { id } = await props.params;

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const res = await fetch(`${baseUrl}/api/albums/${id}`, {
      cache: "no-store",
    });

    const data = await res.json();
    setAlbum(data);
    setLoading(false);
  }

  // Chargement initial
  useEffect(() => {
    loadAlbum();
  }, []);

  if (loading) return <p className="p-10 text-center">Chargement...</p>;

  if (!album)
    return (
      <div className="p-10 text-center">
        <h1 className="text-3xl font-bold">Album introuvable</h1>
        <a href="/" className="text-blue-500 underline mt-4 inline-block">
          Retour
        </a>
      </div>
    );

  // Visionneuse
  const openViewer = (i: number) => setSelectedIndex(i);
  const closeViewer = () => setSelectedIndex(null);

  const prevImage = () =>
    setSelectedIndex((i) => (i! > 0 ? i! - 1 : album.images.length - 1));

  const nextImage = () =>
    setSelectedIndex((i) => (i! < album.images.length - 1 ? i! + 1 : 0));

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Retour */}
      <a
        href="/"
        className="w-fit flex items-center text-gray-600 hover:text-black hover:cursor-pointer transition mb-6"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Retour
      </a>

      {/* Titre + bouton upload */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">{album.name}</h1>
        <AddImageCard albumId={album.id} onUploaded={loadAlbum} />
      </div>

      {/* Images */}
      {album.images.length === 0 ? (
        <p className="text-gray-500">Aucune image dans cet album.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {album.images.map((img: any, i: number) => (
            <div
              key={img.id}
              className="
                relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden shadow-sm
                group transform transition-transform duration-300 hover:scale-105 hover:shadow-lg
                cursor-pointer
              "
              onClick={() => openViewer(i)} // OUVERTURE DE LA VISIONNEUSE
            >
              {/* Image */}
              <Image
                src={img.url}
                alt={img.title}
                fill
                className="object-cover"
              />

              {/* Overlay + titre */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

              <div className="absolute left-3 right-3 bottom-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-black/50 backdrop-blur-sm px-3 py-1 rounded text-sm truncate">
                  {img.title || "Sans titre"}
                </div>
              </div>

              {/* Bouton supprimer — STOP PROPAGATION */}
              <div
                onClick={(e) => e.stopPropagation()} // empêche d’ouvrir la visionneuse
              >
                <DeleteImageButton
                  imageId={img.id}
                  onDeleted={() => {
                    // Mise à jour locale instantanée
                    setAlbum((prev: any) => ({
                      ...prev,
                      images: prev.images.filter((im: any) => im.id !== img.id),
                    }));
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Visionneuse plein écran */}
      {selectedIndex !== null && (
        <ImageViewer
          images={album.images}
          index={selectedIndex}
          onClose={closeViewer}
          onPrev={prevImage}
          onNext={nextImage}
          albumName={album.name}
        />
      )}
    </div>
  );
}
