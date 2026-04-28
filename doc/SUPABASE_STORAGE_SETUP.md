# Configuration Supabase Storage pour les photos de profil

## Étape 1 : Créer le bucket dans Supabase

1. **Ouvrez votre Supabase Dashboard** : https://supabase.com/dashboard/project/okvybczkwkviwbmocbhz/storage/buckets

2. **Créez un nouveau bucket** :
   - Cliquez sur "New bucket"
   - Nom : `gallery`
   - Public bucket : **OUI** ✅ (cochez "Public bucket")
   - Cliquez sur "Create bucket"

## Étape 2 : Configurer les permissions (Policies)

Une fois le bucket créé :

1. Cliquez sur le bucket `gallery`
2. Allez dans l'onglet **"Policies"**
3. Cliquez sur **"New Policy"**

### Policy 1 : Upload (INSERT)

```sql
-- Nom : Allow authenticated users to upload
-- Operation : INSERT
-- Policy definition :
(bucket_id = 'gallery'::text)
```

### Policy 2 : Read (SELECT)

```sql
-- Nom : Allow public read access
-- Operation : SELECT
-- Policy definition :
(bucket_id = 'gallery'::text)
```

### Policy 3 : Delete (DELETE) - Optionnel

```sql
-- Nom : Allow users to delete their own files
-- Operation : DELETE
-- Policy definition :
(bucket_id = 'gallery'::text)
```

## Étape 3 : Vérifier la configuration

Le bucket doit être **PUBLIC** pour que les URLs des images soient accessibles sans authentification.

## Alternative temporaire : Désactiver l'upload de photo

Si vous voulez tester sans configurer Supabase Storage immédiatement, vous pouvez désactiver temporairement l'upload de photo de profil. Le système continuera à fonctionner avec des avatars par défaut.

## Structure des fichiers dans le bucket

```
gallery/
├── profile-images/     # Photos de profil des utilisateurs
│   ├── abc123-1234567890.jpg
│   └── xyz789-1234567891.png
└── albums/            # Images des albums (si vous l'utilisez)
    └── ...
```

## Tester l'upload après configuration

1. Créez le bucket
2. Configurez les policies
3. Redémarrez votre serveur de dev : `npm run dev`
4. Essayez de créer un nouveau compte avec une photo de profil

L'erreur "Bucket not found" devrait disparaître !
