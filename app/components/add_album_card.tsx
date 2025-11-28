import Link from "next/link";
import { Plus } from "lucide-react";

export default function AddAlbumCard() {
  return (
    <Link
      href="/albums/create"
      className="group flex flex-col items-center justify-center bg-white rounded-xl shadow hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 border-dashed border-gray-300 hover:border-blue-500 py-10 hover:scale-105 hover:bg-blue-50"
    >
      <Plus className="w-12 h-12 text-gray-400 group-hover:text-blue-600 group-hover:scale-110 transition-all duration-300" />
      <p className="mt-4 text-gray-500 font-medium group-hover:text-blue-600 transition-colors duration-300">
        Créer un album
      </p>
    </Link>
  );
}
