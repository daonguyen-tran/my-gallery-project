import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser, canDeleteAlbum } from "@/lib/auth";

// GET /api/albums/[id]
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: idParam } = await params;
  const id = Number(idParam);

  if (Number.isNaN(id)) {
    return NextResponse.json({ error: "ID d'album invalide" }, { status: 400 });
  }

  const album = await prisma.album.findUnique({
    where: { id },
    include: {
      images: true,
      user: {
        select: {
          id: true,
          firstname: true,
          surname: true,
          email: true,
          profileImage: true,
        },
      },
    },
  });

  if (!album) {
    return NextResponse.json({ error: "Album non trouvé" }, { status: 404 });
  }

  return NextResponse.json(album);
}

// PATCH /api/albums/[id]
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const { id: idParam } = await params;
    const id = Number(idParam);

    if (Number.isNaN(id)) {
      return NextResponse.json(
        { error: "ID d'album invalide" },
        { status: 400 }
      );
    }

    const album = await prisma.album.findUnique({
      where: { id },
    });

    if (!album) {
      return NextResponse.json({ error: "Album non trouvé" }, { status: 404 });
    }

    if (!canDeleteAlbum(user.id, album.userId, user.role)) {
      return NextResponse.json(
        { error: "Vous n'avez pas la permission de modifier cet album" },
        { status: 403 }
      );
    }

    const updates = await req.json();

    const updatedAlbum = await prisma.album.update({
      where: { id },
      data: updates,
      include: {
        user: {
          select: {
            id: true,
            firstname: true,
            surname: true,
            email: true,
            profileImage: true,
          },
        },
      },
    });

    return NextResponse.json(updatedAlbum);
  } catch (error) {
    console.error("Error updating album:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour de l'album" },
      { status: 500 }
    );
  }
}

// DELETE /api/albums/[id]
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const { id: idParam } = await params;
    const id = Number(idParam);

    if (Number.isNaN(id)) {
      return NextResponse.json(
        { error: "ID d'album invalide" },
        { status: 400 }
      );
    }

    const album = await prisma.album.findUnique({
      where: { id },
    });

    if (!album) {
      return NextResponse.json({ error: "Album non trouvé" }, { status: 404 });
    }

    if (!canDeleteAlbum(user.id, album.userId, user.role)) {
      return NextResponse.json(
        { error: "Vous n'avez pas la permission de supprimer cet album" },
        { status: 403 }
      );
    }

    await prisma.album.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting album:", error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression de l'album" },
      { status: 500 }
    );
  }
}
