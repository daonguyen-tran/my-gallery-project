import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/albums/[id]
export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params; // IMPORTANT

  const album = await prisma.album.findUnique({
    where: { id: Number(id) },
    include: { images: true },
  });

  if (!album) {
    return NextResponse.json({ error: "Album not found" }, { status: 404 });
  }

  return NextResponse.json(album);
}

// PATCH /api/albums/[id]
export async function PATCH(req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;

  const albumId = Number(id);

  if (Number.isNaN(albumId)) {
    return NextResponse.json({ error: "Invalid album id" }, { status: 400 });
  }

  const updates = await req.json();

  const updatedAlbum = await prisma.album.update({
    where: { id: albumId },
    data: updates,
  });

  return NextResponse.json(updatedAlbum);
}

// DELETE /api/albums/[id]
export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;

  await prisma.album.delete({
    where: { id: Number(id) },
  });

  return NextResponse.json({ success: true });
}
