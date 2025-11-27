# Correctifs appliqués - 26 novembre 2025

## 🔒 Sécurité : Blocage des invités pour l'ajout d'images

### Problème

Les utilisateurs invités (non connectés ou avec rôle GUEST) pouvaient ajouter des images aux albums des autres utilisateurs.

### Solution

**Frontend (`app/components/permission_guard.tsx`)**

- Ajout d'une vérification stricte : si `canEdit` est demandé et qu'il n'y a pas de session, retourner `null`
- Les boutons "Ajouter une image" et "Supprimer" ne s'affichent plus pour les invités

**Backend (`app/api/images/route.ts`)**

- La fonction `canEditAlbum()` dans `lib/auth.ts` bloque déjà les GUEST
- Vérification stricte du rôle avant toute opération d'ajout/suppression

### Règles de permissions finales

- **ADMIN** : Peut tout faire (créer, éditer, supprimer tous les albums et images)
- **USER** : Peut créer ses propres albums, éditer/supprimer uniquement ses propres albums et images
- **GUEST** : Lecture seule uniquement (peut voir les albums publics mais aucune édition)
- **Non connecté** : Lecture seule (comme GUEST)

## 📐 Interface : Page d'authentification sans scroll

### Problème

La page signin/signup avait un scroll vertical sur écran PC standard.

### Solutions appliquées

**1. Conteneur principal (`h-screen` au lieu de `min-h-screen`)**

```tsx
<div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 overflow-hidden">
```

**2. Hauteur fixe adaptative pour la carte**

```tsx
<div className="grid md:grid-cols-2 h-[550px] max-h-[85vh]">
```

- `h-[550px]` : Hauteur fixe optimale pour la plupart des écrans
- `max-h-[85vh]` : S'adapte aux petits écrans (max 85% de la hauteur visible)

**3. Scroll interne si nécessaire**

```tsx
<div className="flex flex-col justify-center p-6 md:p-8 overflow-y-auto">
```

- Le formulaire signup devient scrollable en interne si l'écran est très petit
- Évite le scroll de la page entière

**4. Espacement optimisé**

- Réduction de `space-y-3` à `space-y-2` pour le formulaire signup
- Hauteur de la photo de profil réduite de `w-24 h-24` à `w-20 h-20`
- Bouton upload réduit avec `text-xs` au lieu de `text-sm`

## 🎨 Design : Fond d'écran cohérent

Le fond d'écran de la page auth utilise déjà le dégradé cohérent avec l'application :

```tsx
bg-gradient-to-br from-blue-50 via-white to-purple-50
```

Ce dégradé est similaire à celui utilisé dans :

- Page de profil (`/profile`)
- Autres pages de l'application

## ✅ Tests recommandés

1. **Test invité non connecté** :

   - Ouvrir l'application en navigation privée
   - Vérifier qu'aucun bouton "Ajouter une image" n'apparaît sur les albums
   - Vérifier qu'aucun bouton "Supprimer" n'apparaît sur les images

2. **Test utilisateur GUEST** :

   - Se connecter avec un compte GUEST (si vous en créez un)
   - Vérifier les mêmes restrictions que ci-dessus

3. **Test utilisateur USER** :

   - Se connecter avec un compte USER
   - Vérifier qu'on peut éditer UNIQUEMENT ses propres albums
   - Vérifier qu'on ne peut PAS éditer les albums des autres

4. **Test page auth** :
   - Ouvrir `/auth` sur différentes résolutions d'écran
   - Vérifier qu'il n'y a pas de scroll vertical sur écran PC (1920x1080, 1366x768)
   - Vérifier que le formulaire est accessible sur mobile

## 📝 Fichiers modifiés

- `app/components/permission_guard.tsx` - Renforcement des vérifications
- `app/auth/page.tsx` - Hauteur fixe et optimisation de l'espacement
