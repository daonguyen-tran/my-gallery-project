import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/albums/[id]
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: idParam } = await params;
  const id = Number(idParam);

  if (Number.isNaN(id)) {
    return NextResponse.json({ error: "Invalid album ID" }, { status: 400 });
  }

  const album = await prisma.album.findUnique({
    where: { id },
    include: { images: true },
  });

  if (!album) {
    return NextResponse.json({ error: "Album not found" }, { status: 404 });
  }

  return NextResponse.json(album);
}

// PATCH /api/albums/[id]
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: idParam } = await params;
  const id = Number(idParam);

  if (Number.isNaN(id)) {
    return NextResponse.json({ error: "Invalid album ID" }, { status: 400 });
  }

  const updates = await req.json();

  const updatedAlbum = await prisma.album.update({
    where: { id },
    data: updates,
  });

  return NextResponse.json(updatedAlbum);
}

// DELETE /api/albums/[id]
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: idParam } = await params;
  const id = Number(idParam);

  if (Number.isNaN(id)) {
    return NextResponse.json({ error: "Invalid album ID" }, { status: 400 });
  }

  await prisma.album.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}
