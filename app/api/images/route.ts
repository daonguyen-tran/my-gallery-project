import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createClient } from "@supabase/supabase-js";
import { getCurrentUser, canEditAlbum } from "@/lib/auth";

// GET /api/images/
export async function GET(req: Request) {
  const images = await prisma.image.findMany();
  return NextResponse.json(images);
}

// POST /api/images
export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const formData = await req.formData();

    const file = formData.get("file") as File | null;
    const albumId = formData.get("albumId");

    if (!file || !albumId) {
      return NextResponse.json(
        { error: "Fichier ou albumId manquant" },
        { status: 400 }
      );
    }

    // Vérifier les permissions sur l'album
    const album = await prisma.album.findUnique({
      where: { id: Number(albumId) },
    });

    if (!album) {
      return NextResponse.json({ error: "Album non trouvé" }, { status: 404 });
    }

    if (!canEditAlbum(user.id, album.userId, user.role)) {
      return NextResponse.json(
        {
          error:
            "Vous n'avez pas la permission d'ajouter des images à cet album",
        },
        { status: 403 }
      );
    }

    // init supabase
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    // upload
    const fileName = `img_${Date.now()}_${file.name}`;
    const { data, error } = await supabase.storage
      .from("gallery")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error(error);
      return NextResponse.json({ error: "Échec de l'upload" }, { status: 500 });
    }

    // public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from("gallery").getPublicUrl(fileName);

    // save into DB
    const image = await prisma.image.create({
      data: {
        title: file.name,
        url: publicUrl,
        albumId: Number(albumId),
        filename: fileName,
      },
    });

    return NextResponse.json(image);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
