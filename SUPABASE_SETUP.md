# Configuration Supabase

## Variables d'environnement

Créez un fichier `.env.local` dans le répertoire racine avec les variables suivantes :

```bash
# Configuration Supabase
REACT_APP_SUPABASE_URL=https://ldtyphlzufcitetqsekp.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkdHlwaGx6dWZjaXRldHFzZWtwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc3ODQ0MDUsImV4cCI6MjA3MzM2MDQwNX0.380qnH1WESpivkDX8rDvIVYa1dvaDf7EodVMZz_yImI

# Configuration de l'application
REACT_APP_API_URL=https://api.runner-recipes.com
```

## Configuration de la base de données

### 1. Tables à créer dans Supabase

#### Table `profiles`
```sql
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS (Row Level Security)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre aux utilisateurs de voir tous les profils
CREATE POLICY "Profiles are viewable by everyone" ON profiles
  FOR SELECT USING (true);

-- Politique pour permettre aux utilisateurs de modifier leur propre profil
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Politique pour permettre aux utilisateurs de créer leur propre profil
CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);
```

#### Table `recipes`
```sql
CREATE TABLE recipes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  prep_time INTEGER NOT NULL DEFAULT 0,
  cook_time INTEGER NOT NULL DEFAULT 0,
  servings INTEGER NOT NULL DEFAULT 1,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('facile', 'moyen', 'difficile')),
  category TEXT NOT NULL,
  ingredients JSONB NOT NULL DEFAULT '[]',
  instructions JSONB NOT NULL DEFAULT '[]',
  nutrition JSONB NOT NULL DEFAULT '{}',
  author_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS (Row Level Security)
ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre à tous de voir les recettes
CREATE POLICY "Recipes are viewable by everyone" ON recipes
  FOR SELECT USING (true);

-- Politique pour permettre aux utilisateurs de créer des recettes
CREATE POLICY "Users can create recipes" ON recipes
  FOR INSERT WITH CHECK (auth.uid() = author_id);

-- Politique pour permettre aux utilisateurs de modifier leurs propres recettes
CREATE POLICY "Users can update own recipes" ON recipes
  FOR UPDATE USING (auth.uid() = author_id);

-- Politique pour permettre aux utilisateurs de supprimer leurs propres recettes
CREATE POLICY "Users can delete own recipes" ON recipes
  FOR DELETE USING (auth.uid() = author_id);
```

### 2. Fonction pour mettre à jour updated_at

```sql
-- Fonction pour mettre à jour automatiquement updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers pour les tables
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_recipes_updated_at BEFORE UPDATE ON recipes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### 3. Configuration de l'authentification Google

1. Allez dans l'onglet "Authentication" de votre projet Supabase
2. Activez "Google" dans les providers
3. Configurez les credentials Google OAuth
4. Ajoutez l'URL de redirection : `https://your-domain.com/auth/callback`

### 4. Données de test

Vous pouvez insérer quelques recettes de test :

```sql
-- Insérer des recettes de test (remplacez l'author_id par un ID d'utilisateur valide)
INSERT INTO recipes (title, description, prep_time, cook_time, servings, difficulty, category, ingredients, instructions, nutrition, author_id) VALUES
('Pâtes Carbonara', 'Un classique italien simple et délicieux', 10, 15, 4, 'facile', 'Italien', 
 '[{"name": "Pâtes", "amount": "400", "unit": "g"}, {"name": "Lardons", "amount": "200", "unit": "g"}, {"name": "Œufs", "amount": "3", "unit": "pièces"}]',
 '[{"step": 1, "instruction": "Faire cuire les pâtes dans l''eau bouillante salée"}, {"step": 2, "instruction": "Faire revenir les lardons dans une poêle"}, {"step": 3, "instruction": "Mélanger les œufs avec le parmesan"}]',
 '{"caloriesPerServing": 450, "carbohydrates": 65, "proteins": 20, "fats": 12}',
 'your-user-id-here');
```

## Déploiement

### Variables d'environnement pour Vercel

Ajoutez ces variables dans les paramètres de votre projet Vercel :

- `REACT_APP_SUPABASE_URL`
- `REACT_APP_SUPABASE_ANON_KEY`
- `REACT_APP_API_URL`

## Test de la connexion

Pour tester la connexion Supabase, vous pouvez utiliser la console du navigateur :

```javascript
// Dans la console du navigateur
import { supabase } from './src/config/supabase';
console.log('Supabase client:', supabase);
```
