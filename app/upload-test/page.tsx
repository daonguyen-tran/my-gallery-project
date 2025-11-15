"use client";

import { useEffect, useState } from "react";

export default function UploadTest() {
  const [albums, setAlbums] = useState<any[]>([]);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

  // Fetch albums for dropdown
  useEffect(() => {
    fetch("/api/albums")
      .then((r) => r.json())
      .then((data) => setAlbums(data));
  }, []);

  const uploadImage = async (e: any) => {
    const file = e.target.fileInput.files?.[0];
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const form = new FormData(e.target);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: form,
    });

    const data = await res.json();
    console.log(data);

    if (data.image?.url) setUploadedUrl(data.image.url);
  };

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-3xl font-bold">Upload vers un Album</h1>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="file"
          name="file"
          required
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) setPreview(URL.createObjectURL(file));
          }}
        />

        <input
          type="text"
          name="title"
          placeholder="Titre de la photo"
          className="border px-3 py-2 rounded w-full"
          required
        />

        <select
          name="albumId"
          className="border px-3 py-2 rounded w-full"
          required
        >
          <option value="">Choisir un album…</option>

          {albums.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded"
        >
          Upload
        </button>
      </form>

      {preview && (
        <div className="mt-6">
          <h3 className="font-medium mb-2">Preview :</h3>
          <img src={preview} alt="preview" className="w-64 rounded" />
        </div>
      )}

      {uploadedUrl && (
        <div className="mt-6">
          <h3 className="font-medium mb-2">Uploaded URL :</h3>
          <a href={uploadedUrl} target="_blank" className="text-blue-500 underline">
            {uploadedUrl}
          </a>
        </div>
      )}
    </div>
  );
}
