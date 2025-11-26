# Guide de Migration de la Base de Données

## ⚠️ Important

La migration de la base de données doit être effectuée lorsque la connexion à Supabase est établie.

## 📝 Étapes de Migration

### 1. Vérifier la connexion à la base de données

Testez la connexion :

```bash
npx prisma db pull
```

Si cela fonctionne, vous êtes connecté !

### 2. Appliquer les migrations

```bash
npx prisma migrate dev --name add_profile_image
```

Cette commande va :

- Créer les tables selon le schéma Prisma
- Ajouter le champ `profileImage` au modèle User
- Générer le client Prisma

### 3. Vérifier les tables créées

Ouvrez Prisma Studio pour voir votre base :

```bash
npx prisma studio
```

Vous devriez voir les tables :

- User
- Album
- Image
- Account
- Session
- VerificationToken

### 4. Créer des utilisateurs de test

```bash
npm run seed
```

Cela créera :

- 1 Admin (admin@gallery.com / admin123)
- 1 User (user@gallery.com / user123)
- 1 Guest (guest@gallery.com / guest123)

## 🔧 Dépannage

### Erreur P1001: Can't reach database server

**Problème** : Impossible de se connecter à la base de données.

**Solutions** :

1. Vérifiez que votre base Supabase est active
2. Vérifiez la `DATABASE_URL` dans `.env`
3. Ajoutez votre IP dans les règles Supabase :
   - Allez sur supabase.com/dashboard
   - Settings > Database
   - Sous "Connection pooling", ajoutez votre IP

### Les migrations existent déjà

Si les tables existent déjà, vous pouvez :

**Option 1** : Synchroniser le schéma sans migration

```bash
npx prisma db push
```

**Option 2** : Réinitialiser complètement (⚠️ SUPPRIME TOUTES LES DONNÉES)

```bash
npx prisma migrate reset
```

### Régénérer le client Prisma après modification du schéma

```bash
npx prisma generate
```

## 📊 Schéma Actuel

Le schéma inclut :

### User

- Authentification avec email/password
- Rôles : ADMIN, USER, GUEST
- Photo de profil (profileImage)
- Relations avec albums

### Album

- Nom de l'album
- Propriétaire (userId)
- Relations avec images

### Image

- Titre
- URL (Supabase)
- Nom de fichier
- Relation avec album

## 🚀 Après la Migration

Une fois la migration effectuée :

1. ✅ Générez le client Prisma : `npx prisma generate`
2. ✅ Lancez le seed : `npm run seed`
3. ✅ Démarrez l'application : `npm run dev`
4. ✅ Testez la connexion avec les comptes de test

## 📝 Commandes Utiles

```bash
# Voir le statut des migrations
npx prisma migrate status

# Créer une nouvelle migration
npx prisma migrate dev --name nom_de_la_migration

# Appliquer les migrations en production
npx prisma migrate deploy

# Ouvrir l'interface de base de données
npx prisma studio

# Synchroniser sans migration (développement)
npx prisma db push

# Formater le schéma Prisma
npx prisma format
```
