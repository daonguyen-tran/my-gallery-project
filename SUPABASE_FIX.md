# 🔧 Guide de Réparation Connexion Supabase

## ❌ Problème Détecté

Le serveur `db.okvybczkwkviwbmocbhz.supabase.co` n'est **pas accessible**.

## ✅ Solutions

### Option 1 : Vérifier le Projet Supabase (RECOMMANDÉ)

1. **Allez sur** : https://supabase.com/dashboard
2. **Trouvez votre projet** : okvybczkwkviwbmocbhz
3. **Vérifiez l'état** :
   - ❌ **En pause ?** → Cliquez sur "Resume Project"
   - ✅ **Actif ?** → Continuez ci-dessous

### Option 2 : Obtenir les Vraies Connection Strings

1. **Dans Supabase Dashboard** :

   - Settings → Database
   - Cherchez "Connection String"

2. **Copiez ces deux valeurs** :

   **Transaction Mode (pour DATABASE_URL)** :

   ```
   postgresql://postgres.[REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
   ```

   **Session Mode (pour DIRECT_URL)** :

   ```
   postgresql://postgres:[PASSWORD]@db.[REF].supabase.co:5432/postgres
   ```

3. **Mettez à jour `.env`** :

   ```env
   # Pour Prisma migrations
   DIRECT_URL="votre_session_mode_url"

   # Pour l'application
   DATABASE_URL="votre_transaction_mode_url"
   ```

### Option 3 : Créer un Nouveau Projet Supabase

Si le projet n'existe plus :

1. Allez sur https://supabase.com/dashboard
2. Créez un nouveau projet
3. Récupérez les nouvelles credentials
4. Mettez à jour `.env`
5. Lancez `npx prisma db push` pour créer les tables

## 🧪 Tester la Connexion

```bash
# Test 1 : Ping le serveur
Test-NetConnection -ComputerName db.VOTRE_REF.supabase.co -Port 5432

# Test 2 : Prisma pull
npx prisma db pull

# Test 3 : Si ça marche, pushez le schema
npx prisma db push
```

## 🚀 Après la Connexion Réussie

```bash
# 1. Générer le client Prisma
npx prisma generate

# 2. Créer les utilisateurs de test
npm run seed

# 3. Lancer l'app
npm run dev
```

## 🆘 Si Rien Ne Marche

Mode développement sans DB (données mockées) :

- Suivez les instructions dans `MOCK_MODE.md`

---

**Statut Actuel** : Le serveur Supabase n'est pas joignable depuis votre réseau.
**Prochaine étape** : Vérifiez le dashboard Supabase.
