"use client";

import { useState } from "react";

export default function CreateAlbumPage() {
  const [name, setName] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/albums", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    if (res.ok) {
      window.location.href = "/"; // redirect
    } else {
      alert("Erreur lors de la création");
    }
  }

  return (
    <div className="max-w-xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Créer un album</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          className="w-full border rounded-lg p-3"
          placeholder="Nom de l’album"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <button
          type="submit"
          className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
        >
          Créer
        </button>
      </form>
    </div>
  );
}
