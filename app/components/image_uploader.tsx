"use client";

import { useState } from "react";

export default function ImageUploader({ albumId }: { albumId: number }) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleUpload() {
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("albumId", String(albumId));

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    setLoading(false);

    if (!res.ok) {
      alert("Erreur upload");
      return;
    }

    alert("Image uploadée !");
  }

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mb-3"
      />
      <button
        onClick={handleUpload}
        disabled={loading}
        className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}
