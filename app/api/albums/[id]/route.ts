import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function get_one_album(req: Request, { params } : { params : { id: string }}) {
    const album = await prisma.album.findUnique({
        where: { id: Number(params.id) },
        include: { images: true },
    });

    if (!album) {
        return NextResponse.json({ error: "Album not found" }, { status: 404 });
    }

    return NextResponse.json(album);
};

export async function patch(req: Request, id: string) {
    const albumId = Number(id);

    if (Number.isNaN(albumId)) {
        return NextResponse.json({ error: "Invalid album id" }, { status: 400 });
    }

    const updatedData = await prisma.album.update({
        where: { id: albumId },
        data: await req.json(),
    });

    return NextResponse.json(updatedData);
}


export async function del_album(req: Request, { params }: { params: { id: string } }) {
  await prisma.album.delete({ where: { id: Number(params.id) } });
  return NextResponse.json({ success: true });
}