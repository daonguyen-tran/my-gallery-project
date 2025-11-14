import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET /api/images/[id]
// Get one image by ID
export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params;

    const image = await prisma.image.findUnique({
        where: { id: Number(id) },
        include: { album: true },
    });

    if (!image) {
        return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    return NextResponse.json(image);
}

// PATCH /api/images/[id]
// Update one image by ID
export async function PATCH(req: Request,context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params;

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
}

// DELETE /api/images/[id]
// Delete one image by ID
export async function DELETE(req: Request,context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params;

    await prisma.image.delete({
        where: { id: Number(id) },
    });

    return NextResponse.json({ success: true });
}
