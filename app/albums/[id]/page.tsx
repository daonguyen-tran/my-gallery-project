export default async function AlbumPage(props: { params: Promise<{ id: string }> }) {
    const { id } = await props.params;   // <--- OBLIGATOIRE avec Turbopack

    const res = await fetch(`http://localhost:3000/api/albums/${id}`, {
        cache: "no-store"
    });

    if (!res.ok) {
        return (
            <div className="p-10 text-center">
                <h1 className="text-3xl font-bold">Album introuvable</h1>
                <a href="/" className="text-blue-500 underline mt-4 inline-block">Retour</a>
            </div>
        );
    }

    const album = await res.json();

    return (
        <div>
            <h1>{album.name}</h1>
            {/* reste du rendu */}
        </div>
    );
}
