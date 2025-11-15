"use client";

import { useState } from "react";

export default function AddImagePage({ params }: { params: { id: string } }) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return;

    setLoading(true);

    const form = new FormData();
    form.append("file", file);
    form.append("albumId", params.id);

    const res = await fetch("/api/images", {
      method: "POST",
      body: form,
    });

    setLoading(false);

    if (res.ok) {
      window.location.href = `/albums/${params.id}`;
    } else {
      alert("Erreur lors de l'ajout.");
    }
  }

  return (
    <div className="max-w-xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Ajouter une image</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="block border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Chargement..." : "Uploader"}
        </button>
      </form>
    </div>
  );
}
