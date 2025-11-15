import Image from "next/image";
import Link from "next/link";
import { ImageIcon } from "lucide-react";

export default function AlbumCard({ album }: { album: any }) {
    const hasImages = album.images && album.images.length > 0;
    const cover = hasImages ? album.images[0].url : null;

    return (
        <Link href={`/albums/${album.id}`} className="block">
            <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden cursor-pointer">
                <div className="relative w-full h-48 flex items-center justify-center bg-gray-200">

                    {hasImages ? (
                        <Image 
                            src={cover!}
                            alt={album.name}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <ImageIcon className="w-12 h-12 text-gray-400" />
                    )}

                </div>

                <div className="p-4">
                    <h2 className="text-xl font-semibold">{album.name}</h2>
                    <p className="text-gray-500 text-sm mt-1">
                        {album.images?.length || 0} photo(s)
                    </p>
                </div>
            </div>
        </Link>
    );
}
