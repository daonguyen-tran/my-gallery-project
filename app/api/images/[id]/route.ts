import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { getCurrentUser, canEditAlbum } from "@/lib/auth";

// GET /api/images/[id]
// Get one image by ID
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const image = await prisma.image.findUnique({
    where: { id: Number(id) },
    include: { album: true },
  });

  if (!image) {
    return NextResponse.json({ error: "Image non trouvée" }, { status: 404 });
  }

  return NextResponse.json(image);
}

// PATCH /api/images/[id]
// Update one image by ID
export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const { id } = await context.params;

    const image = await prisma.image.findUnique({
      where: { id: Number(id) },
      include: { album: true },
    });

    if (!image) {
      return NextResponse.json({ error: "Image non trouvée" }, { status: 404 });
    }

    if (!canEditAlbum(user.id, image.album.userId, user.role)) {
      return NextResponse.json(
        { error: "Vous n'avez pas la permission de modifier cette image" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { title, albumId } = body;

    const updatedImage = await prisma.image.update({
      where: { id: Number(id) },
      data: {
        title,
        albumId: albumId ? Number(albumId) : undefined,
      },
    });

    return NextResponse.json(updatedImage);
  } catch (error) {
    console.error("Error updating image:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour de l'image" },
      { status: 500 }
    );
  }
}

// DELETE /api/images/[id]
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const { id } = await context.params;

    const image = await prisma.image.findUnique({
      where: { id: Number(id) },
      include: { album: true },
    });

    if (!image) {
      return NextResponse.json({ error: "Image non trouvée" }, { status: 404 });
    }

    if (!canEditAlbum(user.id, image.album.userId, user.role)) {
      return NextResponse.json(
        { error: "Vous n'avez pas la permission de supprimer cette image" },
        { status: 403 }
      );
    }

    // Delete from Supabase storage
    await supabase.storage.from("gallery").remove([image.filename]);

    // Delete from DB
    await prisma.image.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting image:", error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression de l'image" },
      { status: 500 }
    );
  }
}
