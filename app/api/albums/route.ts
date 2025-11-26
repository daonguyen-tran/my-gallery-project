import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getCurrentUser, canCreateAlbum } from "@/lib/auth";

// GET /api/albums
// Returns a list of albums with their associated images and user info
export async function GET() {
  const albums = await prisma.album.findMany({
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
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(albums);
}

// POST /api/albums
// Creates a new album - requires authentication
export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    if (!canCreateAlbum(user.role)) {
      return NextResponse.json(
        { error: "Vous n'avez pas la permission de créer des albums" },
        { status: 403 }
      );
    }

    const { name } = await req.json();

    if (!name) {
      return NextResponse.json({ error: "Le nom est requis" }, { status: 400 });
    }

    const album = await prisma.album.create({
      data: {
        name,
        userId: user.id,
      },
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

    return NextResponse.json(album);
  } catch (error) {
    console.error("Error creating album:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création de l'album" },
      { status: 500 }
    );
  }
}
