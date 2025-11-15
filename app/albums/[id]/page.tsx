"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, ImageIcon, PlusCircle } from "lucide-react";

export default function AlbumPage(props: { params: Promise<{ id: string }> }) {
    const [album, setAlbum] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [showUpload, setShowUpload] = useState(false);

    const [title, setTitle] = useState("");
    const [file, setFile] = useState<File | null>(null);

    async function loadAlbum() {
        const { id } = await props.params;

        const res = await fetch(`/api/albums/${id}`, { cache: "no-store" });
        const data = await res.json();

        setAlbum(data);
        setLoading(false);
    }

    // Charger l’album au montage
    useState(() => {
        loadAlbum();
    });

    if (loading) return <p className="p-10 text-center">Chargement...</p>;

    if (!album)
        return (
            <div className="p-10 text-center">
                <h1 className="text-3xl font-bold">Album introuvable</h1>
                <a href="/" className="text-blue-500 underline mt-4 inline-block">Retour</a>
            </div>
        );

    // -------------------------------------------------
    // 🔼 UPLOAD IMAGE
    // -------------------------------------------------
    async function handleUpload() {
        if (!file) return alert("Sélectionne une image.");

        const form = new FormData();
        form.append("file", file);
        form.append("title", title);
        form.append("albumId", String(album.id));

        const res = await fetch("/api/upload", {
            method: "POST",
            body: form,
        });

        if (!res.ok) return alert("Erreur lors de l’upload.");

        setShowUpload(false);
        setTitle("");
        setFile(null);

        await loadAlbum(); // rafraîchir l’album après upload
    }

    return (
        <div className="max-w-6xl mx-auto px-6 py-10">
            {/* Retour */}
            <a href="/" className="flex items-center text-gray-600 hover:text-black transition mb-6">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Retour
            </a>

            {/* Titre */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold">{album.name}</h1>

                {/* Bouton Ajouter une image */}
                <button
                    onClick={() => setShowUpload(true)}
                    className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
                >
                    <PlusCircle className="w-5 h-5" />
                    Ajouter une image
                </button>
            </div>

            {/* Images */}
            {album.images.length === 0 ? (
                <p className="text-gray-500">Aucune image dans cet album.</p>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                    {album.images.map((img: any) => (
                        <div
                            key={img.id}
                            className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden shadow-sm"
                        >
                            <Image
                                src={img.url}
                                alt={img.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                    ))}
                </div>
            )}

            {/* ------------------------------------------------ */}
            {/* MODAL D'AJOUT D’IMAGE */}
            {/* ------------------------------------------------ */}
            {showUpload && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
                        <h2 className="text-2xl font-semibold mb-4">Ajouter une image</h2>

                        <label className="block mb-2 text-sm">Titre</label>
                        <input
                            type="text"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            className="w-full border rounded px-3 py-2 mb-4"
                        />

                        <label className="block mb-2 text-sm">Fichier</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={e => setFile(e.target.files?.[0] ?? null)}
                            className="mb-4"
                        />

                        <div className="flex justify-end gap-3 mt-4">
                            <button
                                onClick={() => setShowUpload(false)}
                                className="px-4 py-2 border rounded hover:bg-gray-100"
                            >
                                Annuler
                            </button>

                            <button
                                onClick={handleUpload}
                                className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
                            >
                                Upload
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
