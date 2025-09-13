# Configuration de la Base de Données Supabase

## 🚀 Guide de Configuration Rapide

### 1. Accès à Supabase

1. **Connectez-vous** à [supabase.com](https://supabase.com)
2. **Sélectionnez** votre projet `ldtyphlzufcitetqsekp`
3. **Allez** dans l'onglet "SQL Editor"

### 2. Exécution du Script

1. **Copiez** le contenu du fichier `supabase-schema.sql`
2. **Collez-le** dans l'éditeur SQL de Supabase
3. **Cliquez** sur "Run" pour exécuter le script

### 3. Configuration de l'Authentification Google

1. **Allez** dans l'onglet "Authentication" → "Providers"
2. **Activez** Google
3. **Configurez** les credentials :
   - **Client ID** : Votre Google Client ID
   - **Client Secret** : Votre Google Client Secret
4. **Ajoutez** l'URL de redirection :
   ```
   https://ldtyphlzufcitetqsekp.supabase.co/auth/v1/callback
   ```

### 4. Variables d'Environnement

Créez un fichier `.env.local` dans votre projet :

```bash
# Configuration Supabase
REACT_APP_SUPABASE_URL=https://ldtyphlzufcitetqsekp.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkdHlwaGx6dWZjaXRldHFzZWtwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc3ODQ0MDUsImV4cCI6MjA3MzM2MDQwNX0.380qnH1WESpivkDX8rDvIVYa1dvaDf7EodVMZz_yImI

# Configuration de l'application
REACT_APP_API_URL=https://api.runner-recipes.com
```

### 5. Test de la Connexion

Pour tester que tout fonctionne :

```bash
# Démarrer l'application
npm start

# Ouvrir http://localhost:3000
# Tester la connexion Google
```

## 📊 Structure de la Base de Données

### Tables Créées

1. **`profiles`** - Profils utilisateurs
2. **`recipes`** - Recettes de cuisine
3. **`reviews`** - Avis et commentaires
4. **`favorites`** - Recettes favorites
5. **`meal_plans`** - Plans de repas

### Sécurité (RLS)

- ✅ **Row Level Security** activé sur toutes les tables
- ✅ **Politiques** configurées pour la sécurité
- ✅ **Utilisateurs** peuvent seulement modifier leurs propres données

### Index de Performance

- ✅ **Index** sur les colonnes fréquemment utilisées
- ✅ **Optimisation** des requêtes de recherche
- ✅ **Statistiques** mises à jour

## 🔧 Connexion Directe PostgreSQL

Si vous voulez vous connecter directement à la base de données :

```bash
# Avec psql
psql "postgresql://postgres.ldtyphlzufcitetqsekp:v/u93wuGjb+4f%A@aws-1-eu-west-3.pooler.supabase.com:6543/postgres"

# Avec un client graphique (DBeaver, pgAdmin, etc.)
Host: aws-1-eu-west-3.pooler.supabase.com
Port: 6543
Database: postgres
Username: postgres.ldtyphlzufcitetqsekp
Password: v/u93wuGjb+4f%A
```

## 🚀 Déploiement Vercel

### Variables d'Environnement Vercel

Ajoutez ces variables dans les paramètres de votre projet Vercel :

1. **Allez** dans Vercel → Votre projet → Settings → Environment Variables
2. **Ajoutez** :
   - `REACT_APP_SUPABASE_URL` = `https://ldtyphlzufcitetqsekp.supabase.co`
   - `REACT_APP_SUPABASE_ANON_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkdHlwaGx6dWZjaXRldHFzZWtwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc3ODQ0MDUsImV4cCI6MjA3MzM2MDQwNX0.380qnH1WESpivkDX8rDvIVYa1dvaDf7EodVMZz_yImI`
   - `REACT_APP_API_URL` = `https://api.runner-recipes.com`

### Redéploiement

1. **Redéployez** votre projet Vercel
2. **Testez** l'authentification Google
3. **Vérifiez** que les recettes s'affichent

## 🧪 Données de Test

Le script inclut 2 recettes de test :
- **Pâtes Carbonara** (Italien, niveau 2)
- **Salade de Quinoa** (Salade, niveau 1)

## 🔍 Vérification

Pour vérifier que tout fonctionne :

1. **Tables créées** : Vérifiez dans Supabase → Table Editor
2. **RLS activé** : Vérifiez dans Supabase → Authentication → Policies
3. **Données insérées** : Vérifiez les recettes de test
4. **Application** : Testez la connexion et l'affichage des recettes

## 🆘 Dépannage

### Problèmes Courants

1. **Erreur de connexion** : Vérifiez les variables d'environnement
2. **RLS bloque** : Vérifiez les politiques de sécurité
3. **Google Auth** : Vérifiez les URLs de redirection
4. **Données manquantes** : Relancez le script SQL

### Logs Utiles

- **Supabase** : Onglet Logs pour voir les erreurs
- **Vercel** : Onglet Functions pour les logs de déploiement
- **Navigateur** : Console développeur pour les erreurs JS

## ✅ Checklist de Validation

- [ ] Script SQL exécuté avec succès
- [ ] Tables créées (profiles, recipes, reviews, favorites, meal_plans)
- [ ] RLS activé sur toutes les tables
- [ ] Politiques de sécurité configurées
- [ ] Index créés pour les performances
- [ ] Données de test insérées
- [ ] Authentification Google configurée
- [ ] Variables d'environnement définies
- [ ] Application locale fonctionne
- [ ] Déploiement Vercel réussi
- [ ] Authentification Google fonctionne en production

---

🎉 **Félicitations !** Votre base de données Supabase est maintenant configurée et prête pour votre application Runner Recipes !
