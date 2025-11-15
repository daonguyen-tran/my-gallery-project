import AlbumCard from "../album_card";
import AddAlbumCard from "../add_album_card";

export default async function GallerySection() {
    const res = await fetch("http://localhost:3000/api/albums", { cache: "no-store" });
    const albums = await res.json();

    return (
        <section id="gallery" className="py-20 bg-gray-50">
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="text-4xl font-bold mb-10">Galerie</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {albums.map((album: any) => (
                        <AlbumCard key={album.id} album={album} />
                    ))}

                    {/* Bouton Ajouter un album */}
                    <AddAlbumCard />
                </div>
            </div>
        </section>
    );
}
