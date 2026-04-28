# MyGallery

French version: [README.md](README.md)

MyGallery is a web application for photo gallery management, built with Next.js, Prisma, Supabase, and NextAuth.

## Introduction

### The problem this project solves

In many personal, community, or business projects, photos end up scattered:

- across local folders,
- in messaging apps,
- in multiple cloud services without a clear structure.

The core need is a centralized, easy-to-use workspace where users can:

- organize images into albums,
- share content cleanly,
- control who can edit what,
- keep a smooth experience on both desktop and mobile.

### How MyGallery addresses this need

MyGallery provides:

- clear album management,
- robust authentication,
- role-based permissions,
- cloud image storage,
- a modern UI in French and English (still being extended to all screens).

## Table of contents

- Quick overview
- Core features
- Tech stack
- Project architecture
- Data model
- Authentication and authorization
- API routes
- Internationalization
- Local setup
- Environment variables
- Supabase Storage setup
- Development scripts
- User flows
- Security
- Known limitations
- Additional documentation
- Suggested roadmap

## Quick overview

MyGallery is organized into three layers:

- Frontend: Next.js App Router (pages, components, UI)
- Backend: Next.js API routes (auth, albums, images, upload)
- Data: PostgreSQL via Prisma + image storage on Supabase

The project already supports:

- sign up and sign in,
- profile management,
- album creation,
- image add/delete based on permissions,
- public gallery browsing,
- album sorting,
- FR/EN language switch for major screens.

## Core features

### 1) Accounts and sessions

- Sign up with email/password
- Sign in with credentials
- JWT sessions through NextAuth
- Password hashing with bcrypt
- Optional profile image

### 2) Album management

- Album creation
- Album owner display
- Update/delete with permission checks

### 3) Image management

- Upload images into albums
- Metadata management (title, filename, URL)
- Image deletion (UI + API)
- Fullscreen image viewer

### 4) Role-based permissions

- ADMIN: full access
- USER: manage own resources
- GUEST: read-only
- Unauthenticated: read-only

### 5) UI/UX

- Responsive interface
- User feedback with toasts
- Modern UI with Radix/shadcn
- Lucide icons

## Tech stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- Prisma ORM (generated client in lib/generated/prisma)
- PostgreSQL (Supabase)
- NextAuth (Credentials + JWT)
- Supabase Storage
- Tailwind CSS + Radix/shadcn UI
- Sonner notifications

Dependency reference: package.json

## Project architecture

Main structure:

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

Key files:

- app/layout.tsx: global providers (auth + language), navbar, toaster
- app/page.tsx: homepage (hero, gallery, about, contact, footer)
- lib/auth.ts: reusable authorization rules
- prisma/schema.prisma: data schema
- app/api/auth/[...nextauth]/route.ts: NextAuth configuration

## Data model

Prisma schema: prisma/schema.prisma

### Business entities

- User: firstname, surname, email, password, role, profileImage
- Album: name, createdAt, owner
- Image: title, filename, URL, parent album

### NextAuth entities

- Account
- Session
- VerificationToken

### Relations

- One User owns many Albums
- One Album contains many Images

## Authentication and authorization

Configuration: app/api/auth/[...nextauth]/route.ts

### Authentication behavior

- Credentials provider
- bcrypt validation
- JWT session strategy
- token/session enrichment with id, role, image

### Server helpers (lib/auth.ts)

- getCurrentUser
- requireAuth
- requireAdmin
- canCreateAlbum
- canEditAlbum
- canDeleteAlbum

### UI-level protection

Component: app/components/permission_guard.tsx

The frontend hides forbidden actions, and the backend also enforces permission checks before execution.

## API routes

### Auth

- GET/POST /api/auth/[...nextauth]
  - NextAuth handler
- POST /api/auth/signup
  - create user (USER role by default)
- POST /api/auth/upload-profile
  - upload profile image to gallery/profile-images
- PUT /api/auth/update-profile
  - update current user profile

### Albums

- GET /api/albums
  - list albums with images and owner info
- POST /api/albums
  - create album (authorized user)
- GET /api/albums/[id]
  - album details
- PATCH /api/albums/[id]
  - update album (owner/admin)
- DELETE /api/albums/[id]
  - delete album (owner/admin)

### Images

- GET /api/images
  - list images
- POST /api/images
  - upload image into album (owner/admin), gallery bucket
- GET /api/images/[id]
  - image details
- PATCH /api/images/[id]
  - update image metadata (owner/admin)
- DELETE /api/images/[id]
  - delete from DB + storage (owner/admin)

### Additional upload route (legacy)

- POST /api/upload
  - still used by some components
  - images bucket

## Internationalization

Current implementation:

- app/components/language_context.tsx
- app/components/language_switcher.tsx
- locales/fr.json
- locales/en.json

Language choice is persisted in localStorage using locale.

### Already translated screens

- Navbar
- Hero
- Gallery section
- About
- Contact
- Footer
- Auth page
- Profile page

### Still partially hardcoded in French

- app/albums/create/page.tsx
- app/albums/[id]/page.tsx
- app/albums/[id]/add-image/page.tsx
- app/components/add_image_card.tsx
- app/components/delete_album_button.tsx
- app/components/delete_image_button.tsx
- app/components/album_card.tsx
- app/components/image_viewer.tsx

## Local setup

### Prerequisites

- Node.js 20+ recommended
- npm
- Accessible PostgreSQL database (Supabase recommended)

### Steps

```bash
npm install
npx prisma migrate dev
npx prisma generate
npm run seed
npm run dev
```

App runs at:

- http://localhost:3000

## Environment variables

Minimum required variables:

```env
DATABASE_URL=postgresql://...
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=change-me-in-production

NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
```

Notes:

- DATABASE_URL is required by Prisma
- NEXTAUTH_SECRET is mandatory in production
- NEXT_PUBLIC_BASE_URL is used by some client-side fetch calls

## Supabase Storage setup

The current codebase uses two buckets depending on route:

- gallery
  - /api/images
  - /api/auth/upload-profile

- images
  - /api/upload (legacy)

Implications:

- either keep both buckets,
- or unify endpoints and storage into one bucket for easier operations.

Minimum policies to define:

- public SELECT (if images are publicly visible)
- INSERT for authorized users
- DELETE according to your governance rules

## Development scripts

NPM scripts:

- npm run dev: local development
- npm run build: production build
- npm run start: production runtime
- npm run lint: lint checks
- npm run seed: Prisma seed

Common Prisma commands:

```bash
npx prisma migrate dev
npx prisma migrate status
npx prisma db pull
npx prisma studio
```

## User flows

### Visitor

- Can browse galleries
- Cannot create/edit/delete

### Authenticated user (USER)

- Can create own albums
- Can add/delete own images
- Can edit profile
- Cannot edit others' resources

### Administrator (ADMIN)

- Full access (global moderation)

## Security

- Password hashing with bcrypt
- Server-side permission checks
- Client-side action hiding
- JWT session handling via NextAuth

## Known limitations

- Internationalization is not complete on album/image screens
- Two upload flows coexist (/api/upload and /api/images)
- Some API error messages are still French-only

## Suggested roadmap

- Unify uploads into one route and one storage bucket
- Finish i18n for album/image screens and all dialogs
- Add a clean .env.example file (without secrets)
- Add tests (unit, API, critical user journeys)
- Normalize backend error messages for full translation support
