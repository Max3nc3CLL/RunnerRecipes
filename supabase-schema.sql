-- Script de création des tables pour Runner Recipes
-- Base de données Supabase PostgreSQL

-- 1. Table des profils utilisateurs
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Table des recettes
CREATE TABLE IF NOT EXISTS recipes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  short_description TEXT,
  image_url TEXT,
  images JSONB DEFAULT '[]',
  prep_time INTEGER NOT NULL DEFAULT 0,
  cook_time INTEGER NOT NULL DEFAULT 0,
  servings INTEGER NOT NULL DEFAULT 1,
  difficulty INTEGER NOT NULL CHECK (difficulty BETWEEN 1 AND 5),
  category TEXT NOT NULL,
  ingredients JSONB NOT NULL DEFAULT '[]',
  instructions JSONB NOT NULL DEFAULT '[]',
  nutrition JSONB NOT NULL DEFAULT '{}',
  tags JSONB DEFAULT '[]',
  rating DECIMAL(3,2) DEFAULT 0.0,
  review_count INTEGER DEFAULT 0,
  author_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Table des avis/commentaires
CREATE TABLE IF NOT EXISTS reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE NOT NULL,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  images JSONB DEFAULT '[]',
  helpful INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Table des favoris
CREATE TABLE IF NOT EXISTS favorites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, recipe_id)
);

-- 5. Table des plans de repas
CREATE TABLE IF NOT EXISTS meal_plans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  week_start DATE NOT NULL,
  meals JSONB NOT NULL DEFAULT '{}',
  shopping_list JSONB DEFAULT '[]',
  total_nutrition JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Fonction pour mettre à jour automatiquement updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers pour les tables avec updated_at
CREATE TRIGGER update_profiles_updated_at 
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_recipes_updated_at 
  BEFORE UPDATE ON recipes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_meal_plans_updated_at 
  BEFORE UPDATE ON meal_plans
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- RLS (Row Level Security) - Politiques de sécurité

-- Activer RLS sur toutes les tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE meal_plans ENABLE ROW LEVEL SECURITY;

-- Politiques pour la table profiles
CREATE POLICY "Profiles are viewable by everyone" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Politiques pour la table recipes
CREATE POLICY "Recipes are viewable by everyone" ON recipes
  FOR SELECT USING (true);

CREATE POLICY "Users can create recipes" ON recipes
  FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update own recipes" ON recipes
  FOR UPDATE USING (auth.uid() = author_id);

CREATE POLICY "Users can delete own recipes" ON recipes
  FOR DELETE USING (auth.uid() = author_id);

-- Politiques pour la table reviews
CREATE POLICY "Reviews are viewable by everyone" ON reviews
  FOR SELECT USING (true);

CREATE POLICY "Users can create reviews" ON reviews
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reviews" ON reviews
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own reviews" ON reviews
  FOR DELETE USING (auth.uid() = user_id);

-- Politiques pour la table favorites
CREATE POLICY "Users can view own favorites" ON favorites
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own favorites" ON favorites
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own favorites" ON favorites
  FOR DELETE USING (auth.uid() = user_id);

-- Politiques pour la table meal_plans
CREATE POLICY "Users can view own meal plans" ON meal_plans
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own meal plans" ON meal_plans
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own meal plans" ON meal_plans
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own meal plans" ON meal_plans
  FOR DELETE USING (auth.uid() = user_id);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_recipes_category ON recipes(category);
CREATE INDEX IF NOT EXISTS idx_recipes_difficulty ON recipes(difficulty);
CREATE INDEX IF NOT EXISTS idx_recipes_author_id ON recipes(author_id);
CREATE INDEX IF NOT EXISTS idx_recipes_created_at ON recipes(created_at);
CREATE INDEX IF NOT EXISTS idx_reviews_recipe_id ON reviews(recipe_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_user_id ON favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_recipe_id ON favorites(recipe_id);
CREATE INDEX IF NOT EXISTS idx_meal_plans_user_id ON meal_plans(user_id);

-- Données de test (optionnel)
-- Note: Les profils seront créés automatiquement lors de la première connexion
-- Pour les recettes de test, nous allons les créer sans author_id pour l'instant
-- et les mettre à jour une fois qu'un utilisateur se connectera

-- Insérer quelques recettes de test
INSERT INTO recipes (
  title, 
  description, 
  short_description,
  prep_time, 
  cook_time, 
  servings, 
  difficulty, 
  category, 
  ingredients, 
  instructions, 
  nutrition, 
  author_id,
  tags
) VALUES 
(
  'Pâtes Carbonara',
  'Un classique italien simple et délicieux, parfait pour les coureurs après l''entraînement',
  'Pâtes crémeuses aux lardons et parmesan',
  10,
  15,
  4,
  2,
  'Italien',
  '[
    {"id": "1", "name": "Pâtes spaghetti", "amount": 400, "unit": "g", "notes": "", "isOptional": false},
    {"id": "2", "name": "Lardons", "amount": 200, "unit": "g", "notes": "", "isOptional": false},
    {"id": "3", "name": "Œufs", "amount": 3, "unit": "pièces", "notes": "", "isOptional": false},
    {"id": "4", "name": "Parmesan râpé", "amount": 80, "unit": "g", "notes": "", "isOptional": false},
    {"id": "5", "name": "Poivre noir", "amount": 1, "unit": "pincée", "notes": "", "isOptional": false}
  ]',
  '[
    {"id": "1", "step": 1, "description": "Faire cuire les pâtes dans l''eau bouillante salée selon les instructions", "timeMinutes": 8},
    {"id": "2", "step": 2, "description": "Pendant ce temps, faire revenir les lardons dans une poêle sans matière grasse", "timeMinutes": 5},
    {"id": "3", "step": 3, "description": "Dans un bol, mélanger les œufs avec le parmesan et le poivre", "timeMinutes": 2},
    {"id": "4", "step": 4, "description": "Égoutter les pâtes et les mélanger immédiatement avec les lardons", "timeMinutes": 1},
    {"id": "5", "step": 5, "description": "Ajouter le mélange œufs-parmesan en remuant rapidement pour créer la sauce crémeuse", "timeMinutes": 1}
  ]',
  '{
    "calories": 1800,
    "caloriesPerServing": 450,
    "macronutrients": {
      "carbohydrates": 65,
      "proteins": 20,
      "fats": 12,
      "fiber": 3,
      "sugars": 2
    },
    "micronutrients": {
      "sodium": 800,
      "potassium": 300,
      "magnesium": 50,
      "calcium": 200,
      "iron": 3,
      "vitaminB12": 1.5,
      "vitaminC": 0,
      "vitaminD": 0.5,
      "vitaminE": 1
    },
    "glycemicIndex": 65,
    "carbToProteinRatio": 3.25,
    "hydrationScore": 6
  }',
  NULL,
  '["pâtes", "italien", "rapide", "protéines"]'
),
(
  'Salade de Quinoa aux Légumes',
  'Salade complète et nutritive, idéale pour la récupération après course',
  'Quinoa aux légumes de saison et vinaigrette légère',
  15,
  20,
  2,
  1,
  'Salade',
  '[
    {"id": "1", "name": "Quinoa", "amount": 150, "unit": "g", "notes": "", "isOptional": false},
    {"id": "2", "name": "Tomates cerises", "amount": 200, "unit": "g", "notes": "", "isOptional": false},
    {"id": "3", "name": "Concombre", "amount": 1, "unit": "pièce", "notes": "", "isOptional": false},
    {"id": "4", "name": "Avocat", "amount": 1, "unit": "pièce", "notes": "", "isOptional": false},
    {"id": "5", "name": "Huile d''olive", "amount": 2, "unit": "c.à.s", "notes": "", "isOptional": false},
    {"id": "6", "name": "Citron", "amount": 1, "unit": "pièce", "notes": "", "isOptional": false}
  ]',
  '[
    {"id": "1", "step": 1, "description": "Rincer le quinoa et le faire cuire dans l''eau bouillante salée", "timeMinutes": 15},
    {"id": "2", "step": 2, "description": "Laver et couper tous les légumes en dés", "timeMinutes": 10},
    {"id": "3", "step": 3, "description": "Préparer la vinaigrette avec l''huile d''olive et le jus de citron", "timeMinutes": 2},
    {"id": "4", "step": 4, "description": "Mélanger le quinoa refroidi avec les légumes", "timeMinutes": 3},
    {"id": "5", "step": 5, "description": "Arroser de vinaigrette et servir frais", "timeMinutes": 1}
  ]',
  '{
    "calories": 800,
    "caloriesPerServing": 400,
    "macronutrients": {
      "carbohydrates": 45,
      "proteins": 12,
      "fats": 18,
      "fiber": 8,
      "sugars": 6
    },
    "micronutrients": {
      "sodium": 200,
      "potassium": 800,
      "magnesium": 120,
      "calcium": 60,
      "iron": 4,
      "vitaminB12": 0,
      "vitaminC": 45,
      "vitaminD": 0,
      "vitaminE": 3
    },
    "glycemicIndex": 53,
    "carbToProteinRatio": 3.75,
    "hydrationScore": 8
  }',
  NULL,
  '["quinoa", "salade", "légumes", "sain", "récupération"]'
);

-- Fonction pour attribuer les recettes sans auteur au premier utilisateur connecté
CREATE OR REPLACE FUNCTION assign_orphan_recipes_to_user(user_id UUID)
RETURNS INTEGER AS $$
DECLARE
  updated_count INTEGER;
BEGIN
  UPDATE recipes 
  SET author_id = user_id 
  WHERE author_id IS NULL;
  
  GET DIAGNOSTICS updated_count = ROW_COUNT;
  RETURN updated_count;
END;
$$ LANGUAGE plpgsql;

-- Commentaires sur les tables
COMMENT ON TABLE profiles IS 'Profils utilisateurs liés à auth.users';
COMMENT ON TABLE recipes IS 'Recettes de cuisine pour coureurs';
COMMENT ON TABLE reviews IS 'Avis et commentaires sur les recettes';
COMMENT ON TABLE favorites IS 'Recettes favorites des utilisateurs';
COMMENT ON TABLE meal_plans IS 'Plans de repas hebdomadaires';

-- Statistiques
ANALYZE profiles;
ANALYZE recipes;
ANALYZE reviews;
ANALYZE favorites;
ANALYZE meal_plans;
