import Link from "next/link";
import { ImageIcon } from "lucide-react";

export default function AlbumCard({ album }: { album: any }) {
    const cover =
        album.images?.[0]?.url ??
        "https://images.unsplash.com/photo-1584395630827-860eee694d7b?q=80&w=800&auto=format";

    return (
        <Link
            href={`/albums/${album.id}`}
            className="group block overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition"
        >
            {/* Image */}
            <div className="relative h-48 w-full overflow-hidden">
                <img
                    src={cover}
                    alt={album.name}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
            </div>

            {/* Content */}
            <div className="p-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold">{album.name}</h3>

                <div className="flex items-center gap-1 text-gray-600 text-sm">
                    <ImageIcon className="w-4 h-4" />
                    {album.images?.length ?? 0}
                </div>
            </div>
        </Link>
    );
}
