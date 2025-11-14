import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Get /an/api/images/[id]
// get one image by id
export async function get_one(req: Request, { params } : { params : { id: string }}) {
    const image = await prisma.image.findUnique({
        where: { id: Number(params.id) },
        include: { album: true },
    });

    if (!image) {
        return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    return NextResponse.json(image);
}

// PATCH /api/images/[id]
export async function patch(req: Request, { params } : { params : { id: string }}) {
    const body = await req.json();
    const { title, albumId } = body;

    const updatedData = await prisma.image.update({
        where: { id: Number(params.id) },
        data: {
            title,
            albumId: albumId ? Number(albumId) : undefined
        },
    })

    return NextResponse.json(updatedData);
}

export async function del_image(req: Request, { params }: { params: { id: string } }) {
    await prisma.image.delete({ where: { id: Number(params.id) } });
    return NextResponse.json({ success: true });
}