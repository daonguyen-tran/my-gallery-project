import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
    try {
        const form = await req.formData();
        const file = form.get("file") as File | null;

        if (!file) {
        return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        // Convert File → Buffer (nécessaire pour server-side)
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const fileName = `${Date.now()}-${file.name}`;

        const { data, error } = await supabase.storage
        .from("images")
        .upload(fileName, buffer, {
            contentType: file.type,
        });

        if (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
        }

        // get public URL
        const { data: publicUrl } = supabase.storage
        .from("images")
        .getPublicUrl(fileName);

        return NextResponse.json({
        url: publicUrl.publicUrl,
        path: data.path,
        });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
