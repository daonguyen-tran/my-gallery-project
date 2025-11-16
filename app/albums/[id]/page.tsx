"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import AddImageCard from "@/app/components/add_image_card";
import DeleteImageButton from "@/app/components/delete_image_button";

export default function AlbumPage(props: { params: Promise<{ id: string }> }) {
  const [album, setAlbum] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Chargement de l’album
  async function loadAlbum() {
    const { id } = await props.params; // Turbopack : obligatoire

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const res = await fetch(`${baseUrl}/api/albums/${id}`, {
      cache: "no-store",
    });

    const data = await res.json();
    setAlbum(data);
    setLoading(false);
  }

  // 🔥 Chargement correct au montage
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

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Retour */}
      <a
        href="/"
        className="flex items-center text-gray-600 hover:text-black transition mb-6"
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
          {album.images.map((img: any) => (
            <div
              key={img.id}
              className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden shadow-sm group transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
            >
              <a
                href={img.url}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 block"
                aria-label={img.title || "Ouvrir l'image"}
              >
                <Image
                  src={img.url}
                  alt={img.title}
                  fill
                  className="object-cover"
                />

                {/* Overlay shown on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

                <div className="absolute left-3 right-3 bottom-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-black/50 backdrop-blur-sm px-3 py-1 rounded text-sm truncate">
                    {img.title || "Sans titre"}
                  </div>
                </div>
              </a>

              <DeleteImageButton
                imageId={img.id}
                onDeleted={() => {
                  // remove image from local state for instant feedback
                  setAlbum((prev: any) => ({
                    ...prev,
                    images: prev.images.filter((i: any) => i.id !== img.id),
                  }));
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
