import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const { firstname, surname, profileImage } = await req.json();

    // Validation
    if (!firstname || !surname) {
      return NextResponse.json(
        { error: "Le prénom et le nom sont requis" },
        { status: 400 }
      );
    }

    // Update user in database
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        firstname,
        surname,
        profileImage: profileImage || null,
      },
    });

    return NextResponse.json({
      message: "Profil mis à jour avec succès",
      user: {
        name: `${updatedUser.firstname} ${updatedUser.surname}`,
        image: updatedUser.profileImage,
      },
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du profil:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour du profil" },
      { status: 500 }
    );
  }
}
