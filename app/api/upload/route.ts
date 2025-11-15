import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const form = await req.formData();
        const file = form.get("file") as File | null;
        const albumId = form.get("albumId") as string;
        const title = (form.get("title") as string) || "Sans titre";

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        if (!albumId) {
            return NextResponse.json({ error: "Missing albumId" }, { status: 400 });
        }

        // Convert File
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const fileName = `${Date.now()}-${file.name}`;

        // Upload to bucket
        const { data, error } = await supabase.storage
        .from("images")
        .upload(fileName, buffer, {
            contentType: file.type,
        });

        if (error) {
            console.error(error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        // Public URL
        const { data: publicUrlData } = supabase.storage
            .from("images")
            .getPublicUrl(fileName);

        const publicUrl = publicUrlData.publicUrl;

        // Insert in DB
        const image = await prisma.image.create({
            data: {
                title,
                url: publicUrl,
                albumId: Number(albumId),
            },
        });

        return NextResponse.json({
            success: true,
            image,
        });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
