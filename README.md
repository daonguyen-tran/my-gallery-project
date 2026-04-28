# MyGallery

Version anglaise : [README.en.md](README.en.md)

MyGallery est une application web de gestion de galeries photos construite avec Next.js, Prisma, Supabase et NextAuth.

## Introduction

### Le besoin que ce projet couvre

Dans de nombreux projets personnels, associatifs ou professionnels, les photos finissent dispersées :

- dans des dossiers locaux,
- dans des messageries,
- dans plusieurs services cloud sans structure claire.

Le besoin principal est d'avoir un espace centralisé, simple à utiliser, où l'on peut :

- organiser les images par albums,
- partager proprement,
- contrôler qui peut modifier quoi,
- garder une expérience fluide sur mobile comme sur desktop.

### La réponse apportée par MyGallery

MyGallery propose :

- une gestion d'albums claire,
- un système d'authentification robuste,
- des permissions par rôle,
- un stockage cloud des images,
- une interface moderne en français et en anglais (en cours d'extension sur toutes les pages).

## Sommaire

- Présentation rapide
- Fonctionnalités principales
- Stack technique
- Architecture du projet
- Modèle de données
- Authentification et autorisations
- API (routes serveur)
- Internationalisation
- Installation locale
- Configuration des variables d'environnement
- Configuration Supabase Storage
- Scripts de développement
- Flux utilisateur
- Sécurité
- Limites connues
- Documentation complémentaire
- Feuille de route suggérée

## Présentation rapide

MyGallery est organisé en trois couches :

- Frontend : App Router Next.js (pages, composants, UI)
- Backend : API routes Next.js (auth, albums, images, upload)
- Données : PostgreSQL via Prisma + stockage d'images sur Supabase

Le projet couvre déjà les usages suivants :

- inscription et connexion,
- gestion du profil utilisateur,
- création d'albums,
- ajout et suppression d'images selon permissions,
- consultation publique de la galerie,
- tri des albums,
- bascule FR/EN sur les principaux écrans.

## Fonctionnalités principales

### 1) Comptes et sessions

- Inscription avec e-mail/mot de passe
- Connexion par identifiants
- Sessions JWT via NextAuth
- Mot de passe hashé avec bcrypt
- Photo de profil optionnelle

### 2) Gestion des albums

- Création d'un album
- Affichage de l'auteur de l'album
- Modification/suppression selon permissions

### 3) Gestion des images

- Upload d'images dans un album
- Métadonnées (titre, nom de fichier, URL)
- Suppression d'image (UI + API)
- Visionneuse plein écran

### 4) Permissions par rôle

- ADMIN : accès total
- USER : gestion de ses propres ressources
- GUEST : lecture seule
- Non connecté : lecture seule

### 5) UX et interface

- Interface responsive
- Feedback utilisateur avec toasts
- Composants UI modernes (Radix/shadcn)
- Icônes Lucide

## Stack technique

- Next.js 16 (App Router)
- React 19 + TypeScript
- Prisma ORM (client généré dans lib/generated/prisma)
- PostgreSQL (Supabase)
- NextAuth (Credentials + JWT)
- Supabase Storage
- Tailwind CSS + composants UI Radix/shadcn
- Sonner pour les notifications

Référence dépendances : package.json

## Architecture du projet

Structure principale :

```text
app/
  api/
    albums/
    images/
    auth/
    upload/
  albums/
  auth/
  profile/
  components/
components/ui/
lib/
locales/
prisma/
types/
```

Fichiers clés :

- app/layout.tsx : providers globaux (auth + langue), navbar, toaster
- app/page.tsx : page d'accueil (hero, galerie, about, contact, footer)
- lib/auth.ts : règles d'autorisation réutilisables
- prisma/schema.prisma : schéma de données
- app/api/auth/[...nextauth]/route.ts : configuration NextAuth

## Modèle de données

Schéma Prisma : prisma/schema.prisma

### Entités métier

- User : prénom, nom, e-mail, mot de passe, rôle, image de profil
- Album : nom, date de création, propriétaire
- Image : titre, filename, URL, album parent

### Entités NextAuth

- Account
- Session
- VerificationToken

### Relations

- Un User possède plusieurs Albums
- Un Album possède plusieurs Images

## Authentification et autorisations

Configuration : app/api/auth/[...nextauth]/route.ts

### Mécanisme d'authentification

- Provider Credentials
- Vérification bcrypt
- Session strategy JWT
- Enrichissement token/session avec id, rôle, image

### Helpers serveur (lib/auth.ts)

- getCurrentUser
- requireAuth
- requireAdmin
- canCreateAlbum
- canEditAlbum
- canDeleteAlbum

### Protection côté interface

Composant : app/components/permission_guard.tsx

Le frontend masque les actions interdites, et le backend valide également les permissions avant exécution.

## API (routes serveur)

### Auth

- GET/POST /api/auth/[...nextauth]
  - handler NextAuth
- POST /api/auth/signup
  - création d'utilisateur (rôle USER par défaut)
- POST /api/auth/upload-profile
  - upload de photo de profil vers gallery/profile-images
- PUT /api/auth/update-profile
  - mise à jour du profil utilisateur connecté

### Albums

- GET /api/albums
  - liste des albums avec images et auteur
- POST /api/albums
  - création d'album (utilisateur autorisé)
- GET /api/albums/[id]
  - détail d'un album
- PATCH /api/albums/[id]
  - mise à jour (owner/admin)
- DELETE /api/albums/[id]
  - suppression (owner/admin)

### Images

- GET /api/images
  - liste des images
- POST /api/images
  - upload dans un album (owner/admin), bucket gallery
- GET /api/images/[id]
  - détail d'image
- PATCH /api/images/[id]
  - mise à jour des métadonnées (owner/admin)
- DELETE /api/images/[id]
  - suppression DB + storage (owner/admin)

### Route d'upload additionnelle (legacy)

- POST /api/upload
  - encore utilisée par certains composants
  - bucket images

## Internationalisation

Implémentation actuelle :

- app/components/language_context.tsx
- app/components/language_switcher.tsx
- locales/fr.json
- locales/en.json

La langue est persistée dans localStorage via la clé locale.

### Écrans déjà traduits

- Navbar
- Hero
- Galerie (section)
- About
- Contact
- Footer
- Page Auth
- Page Profil

### Écrans encore partiellement en français statique

- app/albums/create/page.tsx
- app/albums/[id]/page.tsx
- app/albums/[id]/add-image/page.tsx
- app/components/add_image_card.tsx
- app/components/delete_album_button.tsx
- app/components/delete_image_button.tsx
- app/components/album_card.tsx
- app/components/image_viewer.tsx

## Installation locale

### Prérequis

- Node.js 20+ recommandé
- npm
- Base PostgreSQL accessible (Supabase conseillé)

### Étapes

```bash
npm install
npx prisma migrate dev
npx prisma generate
npm run seed
npm run dev
```

Application disponible sur :

- http://localhost:3000

## Configuration des variables d'environnement

Variables minimales :

```env
DATABASE_URL=postgresql://...
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=change-me-in-production

NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
```

Notes :

- DATABASE_URL est requis par Prisma
- NEXTAUTH_SECRET est obligatoire en production
- NEXT_PUBLIC_BASE_URL est utilisé dans certains fetch côté client

## Configuration Supabase Storage

Le projet utilise actuellement deux buckets selon les routes :

- gallery
  - /api/images
  - /api/auth/upload-profile

- images
  - /api/upload (legacy)

Conséquences :

- soit vous conservez les deux buckets,
- soit vous unifiez les endpoints et le stockage sur un seul bucket pour simplifier l'exploitation.

Politiques minimales à prévoir :

- SELECT public (si affichage public des images)
- INSERT pour utilisateurs autorisés
- DELETE selon vos règles de gouvernance

## Scripts de développement

Scripts npm :

- npm run dev : démarrage local
- npm run build : build de production
- npm run start : exécution production
- npm run lint : linting
- npm run seed : exécution du seed Prisma

Commandes Prisma fréquentes :

```bash
npx prisma migrate dev
npx prisma migrate status
npx prisma db pull
npx prisma studio
```

## Flux utilisateur

### Visiteur

- Consulte la galerie
- Ne peut pas créer/modifier/supprimer

### Utilisateur connecté (USER)

- Crée ses albums
- Ajoute/supprime ses images
- Modifie son profil
- N'édite pas les ressources d'autrui

### Administrateur (ADMIN)

- Accès complet (modération globale)

## Sécurité

- Hash des mots de passe (bcrypt)
- Vérifications de permission côté serveur
- Masquage des actions interdites côté client
- Session JWT via NextAuth

## Limites connues

- Internationalisation incomplète sur certains écrans albums/images
- Coexistence de deux flux d'upload (/api/upload et /api/images)
- Certains messages d'erreur API restent en français

## Documentation complémentaire

- [AUTHENTICATION_README.md](AUTHENTICATION_README.md)
- [MIGRATION_GUIDE.md](MIGRATION_GUIDE.md)
- [SUPABASE_STORAGE_SETUP.md](SUPABASE_STORAGE_SETUP.md)
- [SUPABASE_FIX.md](SUPABASE_FIX.md)
- [CORRECTIFS_26_NOV.md](CORRECTIFS_26_NOV.md)
- [RECAP.md](RECAP.md)

## Feuille de route suggérée

- Unifier tous les uploads sur une seule route et un seul bucket
- Terminer la traduction i18n des écrans album/image et de tous les dialogues
- Ajouter un fichier .env.example propre (sans secrets)
- Ajouter des tests (unitaires, API, parcours critiques)
- Harmoniser les messages d'erreur backend pour faciliter la traduction
