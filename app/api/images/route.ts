import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();

        const file = formData.get("file") as File | null;
        const albumId = formData.get("albumId");

        if (!file || !albumId) {
            return NextResponse.json({ error: "Missing file or albumId" }, { status: 400 });
        }

        // init supabase
        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );

        // upload
        const fileName = `img_${Date.now()}_${file.name}`;
        const { data, error } = await supabase.storage
            .from("gallery")
            .upload(fileName, file, {
                cacheControl: "3600",
                upsert: false,
        });

        if (error) {
            console.error(error);
            return NextResponse.json({ error: "Upload failed" }, { status: 500 });
        }

        // public URL
        const {
            data: { publicUrl },
        } = supabase.storage.from("gallery").getPublicUrl(fileName);

        // save into DB
        const image = await prisma.image.create({
            data: {
                title: file.name,
                url: publicUrl,
                albumId: Number(albumId),
                filename: fileName,
            },
        });

        return NextResponse.json(image);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
