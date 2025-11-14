import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET /api/images
export async function get_all() {
    const images = await prisma.image.findMany({
        include: { album: true},
        orderBy: { createdAt: "desc"}
    });

    return NextResponse.json(images);
}

// POST /api/images
export async function add_one(req: Request) {
    const body = await req.json();
    const { title, filename, url, albumId } = body;

    const image = await prisma.image.create({
        data: {
            title,
            filename,
            url,
            albumId: albumId ? Number(albumId) : undefined
        }
    })

    return NextResponse.json(image);
}