"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function CreateAlbumPage() {
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    async function handleCreate() {
        if (!name.trim()) {
            toast.error("Le nom est obligatoire");
            return;
        }

        try {
            setLoading(true);

            const res = await fetch("/api/albums", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name }),
            });

            if (!res.ok) {
                toast.error("Erreur lors de la création");
                return;
            }

            const album = await res.json();
            toast.success("Album créé 🎉");

            router.push(`/albums/${album.id}`);

        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center px-6 bg-gray-50">
            <Card className="w-full max-w-md shadow-xl">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold">Créer un album</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                    <div className="flex flex-col space-y-2">
                        <Label htmlFor="name">Nom de l’album</Label>
                        <Input
                            id="name"
                            placeholder="Ex: Vacances 2024"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                </CardContent>

                <CardFooter>
                    <Button 
                        className="w-full text-lg"
                        onClick={handleCreate}
                        disabled={loading}
                    >
                        {loading ? (
                            <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        ) : null}
                        Créer l’album
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
