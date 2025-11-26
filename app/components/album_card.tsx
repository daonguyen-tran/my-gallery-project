import Image from "next/image";
import Link from "next/link";
import { ImageIcon, User } from "lucide-react";

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

          {/* Afficher le créateur */}
          {album.user && (
            <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
              {album.user.profileImage ? (
                <Image
                  src={album.user.profileImage}
                  alt={`${album.user.firstname} ${album.user.surname}`}
                  width={20}
                  height={20}
                  className="rounded-full object-cover"
                />
              ) : (
                <User className="w-4 h-4" />
              )}
              <span>
                {album.user.firstname} {album.user.surname}
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
