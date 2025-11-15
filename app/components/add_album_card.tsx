import Link from "next/link";
import { Plus } from "lucide-react";

export default function AddAlbumCard() {
    return (
        <Link
            href="/albums/create"
            className="flex flex-col items-center justify-center bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer border-2 border-dashed border-gray-300 py-10"
        >
            <Plus className="w-12 h-12 text-gray-400" />
            <p className="mt-4 text-gray-500 font-medium">Nouvel album</p>
        </Link>
    );
}
