import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Début du seed de la base de données...");

  // Créer un utilisateur Admin
  const adminPassword = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@gallery.com" },
    update: {},
    create: {
      email: "admin@gallery.com",
      password: adminPassword,
      firstname: "Admin",
      surname: "Gallery",
      role: "ADMIN",
    },
  });
  console.log("✅ Admin créé:", admin.email);

  // Créer un utilisateur normal
  const userPassword = await bcrypt.hash("user123", 10);
  const user = await prisma.user.upsert({
    where: { email: "user@gallery.com" },
    update: {},
    create: {
      email: "user@gallery.com",
      password: userPassword,
      firstname: "Jean",
      surname: "Dupont",
      role: "USER",
    },
  });
  console.log("✅ Utilisateur créé:", user.email);

  // Créer un invité
  const guestPassword = await bcrypt.hash("guest123", 10);
  const guest = await prisma.user.upsert({
    where: { email: "guest@gallery.com" },
    update: {},
    create: {
      email: "guest@gallery.com",
      password: guestPassword,
      firstname: "Invité",
      surname: "Demo",
      role: "GUEST",
    },
  });
  console.log("✅ Invité créé:", guest.email);

  // Créer un album pour l'admin
  const adminAlbum = await prisma.album.create({
    data: {
      name: "Album de l'Admin",
      userId: admin.id,
    },
  });
  console.log("✅ Album admin créé:", adminAlbum.name);

  // Créer un album pour l'utilisateur
  const userAlbum = await prisma.album.create({
    data: {
      name: "Mes Vacances",
      userId: user.id,
    },
  });
  console.log("✅ Album utilisateur créé:", userAlbum.name);

  console.log("\n📋 Comptes de test créés :");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("👑 Admin : admin@gallery.com / admin123");
  console.log("👤 User  : user@gallery.com / user123");
  console.log("👁️  Guest : guest@gallery.com / guest123");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Erreur lors du seed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
