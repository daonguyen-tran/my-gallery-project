"use client";

import { useEffect, useState } from "react";
import AlbumCard from "../album_card";

export default function GallerySection() {
    const [albums, setAlbums] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/albums")
        .then((res) => res.json())
        .then((data) => {
            setAlbums(data);
            setLoading(false);
        });
    }, []);

    return (
        <section id="gallery" className="py-24 bg-gray-50">
            <div className="mx-auto max-w-6xl px-6">
                {/* Title */}
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                    Albums
                </h2>

                {/* Loading skeleton */}
                {loading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className="h-64 rounded-lg bg-gray-200 animate-pulse"
                    />
                    ))}
                </div>
                )}

                {/* Albums grid */}
                {!loading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {albums.map((album) => (
                    <AlbumCard key={album.id} album={album} />
                    ))}
                </div>
                )}
            </div>
        </section>
    );
}
