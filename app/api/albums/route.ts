import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET /api/albums
// Returns a list of albums with their associated images
export async function get_all() {
  const albums = await prisma.album.findMany({
    include: { images: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(albums);
}

// POST /api/albums
// Creates a new album
export async function add_one(req: Request) {
  const { name } = await req.json();

  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  const album = await prisma.album.create({
    data: { name },
  });

  return NextResponse.json(album);
}