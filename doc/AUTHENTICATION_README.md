# MyGallery - Application de Galerie Photos avec Authentification

Une application moderne de galerie photos construite avec Next.js 16, Prisma, Supabase et NextAuth.

## 🚀 Fonctionnalités

### Système d'Authentification

- **Inscription/Connexion** avec email et mot de passe
- **Photo de profil** optionnelle lors de l'inscription
- **3 types d'utilisateurs** avec permissions différentes :
  - **Admin** : Peut tout faire (créer, modifier, supprimer n'importe quel album/image)
  - **User** : Peut créer ses propres albums et images, voir ceux des autres
  - **Guest** : Peut seulement voir les albums et images (aucune modification)

### Gestion des Albums et Images

- Création d'albums personnels
- Upload d'images vers Supabase Storage
- Affichage du créateur pour chaque album
- Permissions granulaires basées sur les rôles
- Interface moderne et responsive

## 📋 Prérequis

- Node.js 18+
- PostgreSQL (via Supabase)
- Un compte Supabase

## 🛠️ Installation

### 1. Cloner le projet et installer les dépendances

```bash
npm install
```

### 2. Configuration des variables d'environnement

Le fichier `.env` est déjà configuré avec :

```env
DATABASE_URL="postgresql://postgres:d!@m0nd:T110904tr@db.okvybczkwkviwbmocbhz.supabase.co:5432/postgres"
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=https://okvybczkwkviwbmocbhz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-change-this-in-production-2024
```

**⚠️ Important** : En production, changez `NEXTAUTH_SECRET` avec une clé sécurisée.

### 3. Configuration de Supabase Storage

1. Allez sur votre dashboard Supabase : https://supabase.com/dashboard
2. Créez un bucket nommé **`gallery`**
3. Configurez-le en **public** pour permettre l'accès aux images

### 4. Migration de la base de données

Appliquez les migrations Prisma :

```bash
npx prisma migrate dev
```

Si vous rencontrez des problèmes de connexion, vérifiez que :

- Votre base de données Supabase est accessible
- Les credentials dans `DATABASE_URL` sont corrects
- Votre IP est autorisée dans Supabase (Settings > Database > Connection pooling)

### 5. Générer le client Prisma

```bash
npx prisma generate
```

### 6. (Optionnel) Seed de la base de données

Pour créer des utilisateurs de test :

```bash
npm run seed
```

## 🚀 Lancement

```bash
npm run dev
```

L'application sera accessible sur http://localhost:3000

## 📖 Utilisation

### Créer un compte

1. Cliquez sur "Se connecter" dans la navbar
2. Cliquez sur "Pas encore de compte ? Créer un compte"
3. Remplissez le formulaire :
   - Prénom et Nom
   - Email
   - Mot de passe (min. 6 caractères)
   - Photo de profil (optionnel)
4. Cliquez sur "Créer mon compte"

Par défaut, les nouveaux utilisateurs ont le rôle **USER**.

### Connexion

1. Entrez votre email et mot de passe
2. Cliquez sur "Se connecter"

### Permissions par Rôle

| Action                    | Admin | User | Guest |
| ------------------------- | ----- | ---- | ----- |
| Voir albums/images        | ✅    | ✅   | ✅    |
| Créer ses albums          | ✅    | ✅   | ❌    |
| Modifier ses albums       | ✅    | ✅   | ❌    |
| Supprimer ses albums      | ✅    | ✅   | ❌    |
| Modifier albums d'autres  | ✅    | ❌   | ❌    |
| Supprimer albums d'autres | ✅    | ❌   | ❌    |

### Créer un Admin

Pour promouvoir un utilisateur en admin, modifiez directement dans la base de données :

```sql
UPDATE "User" SET role = 'ADMIN' WHERE email = 'votre@email.com';
```

Ou utilisez Prisma Studio :

```bash
npx prisma studio
```

## 🗄️ Structure de la Base de Données

### Modèle User

- `id` : Identifiant unique
- `firstname` : Prénom
- `surname` : Nom
- `email` : Email (unique)
- `password` : Mot de passe hashé (bcrypt)
- `role` : ADMIN, USER, ou GUEST
- `profileImage` : URL de la photo de profil (optionnel)

### Modèle Album

- `id` : Identifiant unique
- `name` : Nom de l'album
- `userId` : Propriétaire de l'album
- Relations : User, Images

### Modèle Image

- `id` : Identifiant unique
- `title` : Titre
- `url` : URL Supabase
- `filename` : Nom du fichier
- `albumId` : Album parent

## 🔒 Sécurité

- Mots de passe hashés avec bcrypt
- Sessions JWT avec NextAuth
- Validation côté serveur et client
- Protection CSRF
- Validation des permissions sur toutes les routes API

## 🎨 Technologies Utilisées

- **Next.js 16** - Framework React
- **TypeScript** - Typage statique
- **Prisma** - ORM
- **PostgreSQL** - Base de données
- **Supabase** - Storage et base de données
- **NextAuth** - Authentification
- **Tailwind CSS** - Styling
- **Radix UI** - Composants UI
- **Lucide React** - Icônes

## 🐛 Dépannage

### Erreur de connexion à la base de données

Vérifiez que :

1. Votre base Supabase est active
2. La `DATABASE_URL` est correcte
3. Votre IP est autorisée dans Supabase

### Images ne s'affichent pas

Vérifiez que :

1. Le bucket `gallery` existe sur Supabase
2. Le bucket est configuré en public
3. Les URLs dans `.env` sont correctes

### Erreur NextAuth

Assurez-vous que :

1. `NEXTAUTH_URL` correspond à votre URL
2. `NEXTAUTH_SECRET` est défini

## 📝 Notes

- Les migrations de base de données peuvent être exécutées avec `npx prisma migrate dev` quand la connexion est établie
- Pour réinitialiser la base : `npx prisma migrate reset` (⚠️ Supprime toutes les données)
- Pour voir la base en GUI : `npx prisma studio`

## 👨‍💻 Développement

Structure des composants :

- `/app/components` : Composants réutilisables
- `/app/api` : Routes API
- `/lib` : Utilitaires (Prisma, Supabase, Auth)
- `/types` : Types TypeScript

Bonnes pratiques :

- Les permissions sont vérifiées côté serveur ET client
- Utilisez `usePermissions()` hook pour les vérifications côté client
- Utilisez les helpers dans `/lib/auth.ts` pour les routes API
