"use client";
import { useState } from "react";

export default function UploadTest() {
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

  const uploadImage = async (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));

    const form = new FormData();
    form.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: form,
    });

    const data = await res.json();
    console.log(data);

    if (data.url) setUploadedUrl(data.url);
  };

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-3xl font-bold">Upload Test</h1>

      <input type="file" onChange={uploadImage} />

      {preview && (
        <div>
          <h2 className="font-semibold mt-4">Preview :</h2>
          <img src={preview} alt="preview" className="w-64 rounded" />
        </div>
      )}

      {uploadedUrl && (
        <div>
          <h2 className="font-semibold mt-4">Uploaded Image URL :</h2>
          <a href={uploadedUrl} target="_blank" className="text-blue-500 underline">
            {uploadedUrl}
          </a>
        </div>
      )}
    </div>
  );
}
