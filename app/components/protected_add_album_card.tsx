"use client";

import { usePermissions } from "./permission_guard";
import AddAlbumCard from "./add_album_card";

export default function ProtectedAddAlbumCard() {
  const permissions = usePermissions();

  if (!permissions.canCreateAlbum()) {
    return null;
  }

  return <AddAlbumCard />;
}
