"use client";

import { useEffect, useState } from "react";
import AlbumCard from "../album_card";
import ProtectedAddAlbumCard from "../protected_add_album_card";
import AnimateOnScroll from "../animate_on_scroll";
import { ArrowUpAZ, ArrowDownAZ, ArrowUp, ArrowDown } from "lucide-react";

type SortCriteria = "name" | "createdAt" | "updatedAt" | "user" | "imageCount";
type SortOrder = "asc" | "desc";

export default function GallerySection() {
  const [albums, setAlbums] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortCriteria, setSortCriteria] = useState<SortCriteria>("createdAt");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

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

  const sortAlbums = (albumsToSort: any[]) => {
    const sorted = [...albumsToSort].sort((a, b) => {
      let comparison = 0;

      switch (sortCriteria) {
        case "name":
          comparison = a.name.localeCompare(b.name, "fr", {
            sensitivity: "base",
          });
          break;
        case "createdAt":
          comparison =
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
        case "updatedAt":
          comparison =
            new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
          break;
        case "user":
          const userA = a.user?.name || a.user?.email || "";
          const userB = b.user?.name || b.user?.email || "";
          comparison = userA.localeCompare(userB, "fr", {
            sensitivity: "base",
          });
          break;
        case "imageCount":
          const countA = a._count?.images || 0;
          const countB = b._count?.images || 0;
          comparison = countA - countB;
          break;
      }

      return sortOrder === "asc" ? comparison : -comparison;
    });

    return sorted;
  };

  const sortedAlbums = sortAlbums(albums);

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const getSortIcon = () => {
    const isAlphabetic = sortCriteria === "name" || sortCriteria === "user";

    if (isAlphabetic) {
      return sortOrder === "asc" ? (
        <ArrowUpAZ className="w-5 h-5" />
      ) : (
        <ArrowDownAZ className="w-5 h-5" />
      );
    } else {
      return sortOrder === "asc" ? (
        <ArrowUp className="w-5 h-5" />
      ) : (
        <ArrowDown className="w-5 h-5" />
      );
    }
  };

  const getSortLabel = () => {
    const isAlphabetic = sortCriteria === "name" || sortCriteria === "user";

    if (isAlphabetic) {
      return sortOrder === "asc" ? "A → Z" : "Z → A";
    } else {
      return sortOrder === "asc" ? "Croissant" : "Décroissant";
    }
  };

  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="flex justify-center">
        <div className="w-full max-w-7xl px-6">
          <AnimateOnScroll>
            <h2 className="text-4xl text-center font-bold mb-10">Galerie</h2>
          </AnimateOnScroll>

          {/* Filtres de tri */}
          <AnimateOnScroll>
            <div className="flex flex-wrap items-center justify-center gap-4 mb-8 bg-white rounded-xl shadow-md p-4">
              <div className="flex items-center gap-2">
                <label
                  htmlFor="sort-criteria"
                  className="text-sm font-medium text-gray-700"
                >
                  Trier par:
                </label>
                <select
                  id="sort-criteria"
                  value={sortCriteria}
                  onChange={(e) =>
                    setSortCriteria(e.target.value as SortCriteria)
                  }
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="name">Nom</option>
                  <option value="createdAt">Date de création</option>
                  <option value="updatedAt">Dernière mise à jour</option>
                  <option value="user">Utilisateur</option>
                  <option value="imageCount">Nombre d'images</option>
                </select>
              </div>

              <button
                onClick={toggleSortOrder}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
                title={`Changer l'ordre de tri`}
              >
                {getSortIcon()}
                <span>{getSortLabel()}</span>
              </button>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll className="mt-6">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {sortedAlbums.map((album: any) => (
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
