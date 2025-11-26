import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";

export async function getSession() {
  return await getServerSession();
}

export async function getCurrentUser() {
  const session = await getSession();
  if (!session?.user?.email) return null;

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  return user;
}

export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Non authentifié");
  }
  return user;
}

export async function requireAdmin() {
  const user = await requireAuth();
  if (user.role !== "ADMIN") {
    throw new Error("Accès non autorisé - Admin requis");
  }
  return user;
}

export function canEditAlbum(
  userId: number,
  albumUserId: number | null,
  userRole: string
) {
  if (userRole === "ADMIN") return true;
  if (userRole === "GUEST") return false;
  return userId === albumUserId;
}

export function canDeleteAlbum(
  userId: number,
  albumUserId: number | null,
  userRole: string
) {
  if (userRole === "ADMIN") return true;
  if (userRole === "GUEST") return false;
  return userId === albumUserId;
}

export function canCreateAlbum(userRole: string) {
  return userRole === "ADMIN" || userRole === "USER";
}

export function canViewAlbum(userRole: string) {
  return true; // Tout le monde peut voir les albums
}
