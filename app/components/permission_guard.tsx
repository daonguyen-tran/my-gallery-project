"use client";

import { useSession } from "next-auth/react";

interface PermissionGuardProps {
  children: React.ReactNode;
  albumUserId?: number | null;
  requireAuth?: boolean;
  requireRole?: "ADMIN" | "USER" | "GUEST";
  canEdit?: boolean;
}

export function PermissionGuard({
  children,
  albumUserId,
  requireAuth = false,
  requireRole,
  canEdit = false,
}: PermissionGuardProps) {
  const { data: session, status } = useSession();

  // Si loading, ne rien afficher
  if (status === "loading") {
    return null;
  }

  // Si l'authentification est requise et l'utilisateur n'est pas connecté
  if (requireAuth && !session) {
    return null;
  }

  // Vérifier le rôle requis
  if (requireRole && session?.user?.role !== requireRole) {
    return null;
  }

  // Vérifier les permissions d'édition
  if (canEdit && session?.user) {
    const userRole = session.user.role;
    const userId = session.user.id;

    // Admin peut tout faire
    if (userRole === "ADMIN") {
      return <>{children}</>;
    }

    // Guest ne peut rien éditer
    if (userRole === "GUEST") {
      return null;
    }

    // USER peut éditer seulement ses propres ressources
    if (userRole === "USER" && albumUserId !== userId) {
      return null;
    }
  }

  return <>{children}</>;
}

export function usePermissions() {
  const { data: session } = useSession();

  const canCreateAlbum = () => {
    if (!session?.user) return false;
    const role = session.user.role;
    return role === "ADMIN" || role === "USER";
  };

  const canEditAlbum = (albumUserId: number | null) => {
    if (!session?.user) return false;
    const role = session.user.role;
    const userId = session.user.id;

    if (role === "ADMIN") return true;
    if (role === "GUEST") return false;
    return userId === albumUserId;
  };

  const canDeleteAlbum = (albumUserId: number | null) => {
    return canEditAlbum(albumUserId);
  };

  const isAdmin = () => {
    return session?.user?.role === "ADMIN";
  };

  const isGuest = () => {
    return session?.user?.role === "GUEST";
  };

  return {
    canCreateAlbum,
    canEditAlbum,
    canDeleteAlbum,
    isAdmin,
    isGuest,
    isAuthenticated: !!session?.user,
    user: session?.user,
  };
}
