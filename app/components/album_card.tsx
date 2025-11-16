import Image from "next/image";
import Link from "next/link";
import { ImageIcon } from "lucide-react";

export default function AlbumCard({ album }: { album: any }) {
  const hasImages = album.images && album.images.length > 0;
  const cover = hasImages ? album.images[0].url : null;

  return (
    <Link href={`/albums/${album.id}`} className="block group">
      <div className="bg-white rounded-xl shadow transition transform duration-300 group-hover:scale-105 group-hover:shadow-lg overflow-hidden cursor-pointer">
        <div className="relative w-full h-48 flex items-center justify-center bg-gray-200">
          {hasImages ? (
            <Image
              src={cover!}
              alt={album.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full">
              <ImageIcon className="w-12 h-12 text-gray-400" />
            </div>
          )}

          {/* Overlay title on hover */}
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <h3 className="text-white text-lg font-semibold px-3 text-center">
              {album.name}
            </h3>
          </div>
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
