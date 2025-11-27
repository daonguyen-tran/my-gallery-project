"use client";

import { useEffect, useState } from "react";
import AlbumCard from "../album_card";
import ProtectedAddAlbumCard from "../protected_add_album_card";
import AnimateOnScroll from "../animate_on_scroll";

export default function GallerySection() {
  const [albums, setAlbums] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAlbums();
  }, []);

  async function fetchAlbums() {
    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
      const res = await fetch(`${baseUrl}/api/albums`, {
        cache: "no-store",
      });

      if (res.ok) {
        const data = await res.json();
        setAlbums(data);
      }
    } catch (error) {
      console.error("Error fetching albums:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="flex justify-center">
        <div className="w-full max-w-7xl px-6">
          <AnimateOnScroll>
            <h2 className="text-4xl font-bold mb-10">Galerie</h2>
          </AnimateOnScroll>

          <AnimateOnScroll className="mt-6">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {albums.map((album: any) => (
                  <AlbumCard
                    key={album.id}
                    album={album}
                    onDeleted={fetchAlbums}
                  />
                ))}

                {/* Bouton Ajouter un album - protégé par permissions */}
                <ProtectedAddAlbumCard />
              </div>
            )}
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
