import Link from "next/link";
import Image from "next/image";
import { ImageIcon } from "lucide-react";

export function AlbumCard({ album }: { album: any }) {
    const hasImages = Array.isArray(album.images) && album.images.length > 0;
    const cover = hasImages ? album.images[0].url : null;

    return (
        <Link
        href={`/albums/${album.id}`}
        className="group block rounded-xl shadow hover:shadow-lg transition overflow-hidden border border-white/10 bg-white/5"
        >
            <div className="relative w-full h-48 flex items-center justify-center bg-gray-900/20">
                {hasImages ? (
                <Image
                    src={cover!}
                    alt={album.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                ) : (
                <ImageIcon className="text-gray-400 w-16 h-16" />
                )}
            </div>

            <div className="p-4 text-center">
                <h3 className="text-lg font-semibold">{album.name}</h3>
                <p className="text-sm text-muted-foreground">
                    {album.images.length} image{album.images.length > 1 ? "s" : ""}
                </p>
            </div>
        </Link>
    );
}
