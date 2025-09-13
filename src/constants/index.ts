// Constantes pour l'application de recettes pour coureurs

export const APP_CONFIG = {
  name: 'Runner Recipes',
  description: 'Recettes végétariennes pour coureurs et traileurs',
  version: '1.0.0',
  author: 'Runner Recipes Team',
  url: 'https://runner-recipes.com',
} as const;

export const RECIPE_CATEGORIES = [
  {
    id: 'pre-workout',
    name: 'Pré-entraînement',
    description: 'Énergie avant l\'effort',
    icon: '🏃‍♂️',
    color: '#FF6B35',
  },
  {
    id: 'post-workout',
    name: 'Post-entraînement',
    description: 'Récupération optimale',
    icon: '💪',
    color: '#4ECDC4',
  },
  {
    id: 'hydration',
    name: 'Hydratation',
    description: 'Boissons et électrolytes',
    icon: '💧',
    color: '#45B7D1',
  },
  {
    id: 'trail-snacks',
    name: 'Snacks Trail',
    description: 'En-cas pour la course',
    icon: '🥜',
    color: '#96CEB4',
  },
  {
    id: 'main-meals',
    name: 'Repas Principaux',
    description: 'Plats complets et équilibrés',
    icon: '🍽️',
    color: '#FECA57',
  },
  {
    id: 'breakfast',
    name: 'Petit-déjeuner',
    description: 'Énergie matinale',
    icon: '🌅',
    color: '#FF9FF3',
  },
  {
    id: 'recovery',
    name: 'Récupération',
    description: 'Soins post-effort',
    icon: '🛌',
    color: '#A8E6CF',
  },
] as const;

export const DIFFICULTY_LEVELS = [
  { value: 1, label: 'Très facile', color: '#4CAF50' },
  { value: 2, label: 'Facile', color: '#8BC34A' },
  { value: 3, label: 'Modéré', color: '#FFC107' },
  { value: 4, label: 'Difficile', color: '#FF9800' },
  { value: 5, label: 'Expert', color: '#F44336' },
] as const;

export const COOKING_TIME_RANGES = [
  { label: 'Moins de 15 min', value: 15 },
  { label: '15-30 min', value: 30 },
  { label: '30-60 min', value: 60 },
  { label: 'Plus d\'1h', value: 120 },
] as const;

export const CALORIE_RANGES = [
  { label: 'Moins de 200 cal', min: 0, max: 200 },
  { label: '200-400 cal', min: 200, max: 400 },
  { label: '400-600 cal', min: 400, max: 600 },
  { label: 'Plus de 600 cal', min: 600, max: 2000 },
] as const;

export const NUTRITION_TARGETS = {
  preWorkout: {
    carbs: { min: 30, max: 60 }, // g
    proteins: { min: 5, max: 15 }, // g
    fats: { max: 10 }, // g
    fiber: { max: 8 }, // g
  },
  postWorkout: {
    carbs: { min: 20, max: 50 }, // g
    proteins: { min: 15, max: 30 }, // g
    ratio: { min: 2, max: 4 }, // carbs:proteins
  },
  general: {
    sodium: { min: 200, max: 600 }, // mg
    potassium: { min: 300, max: 800 }, // mg
    magnesium: { min: 50, max: 200 }, // mg
  },
} as const;

export const INGREDIENT_CATEGORIES = [
  'Céréales et grains',
  'Légumineuses',
  'Fruits',
  'Légumes',
  'Noix et graines',
  'Épices et herbes',
  'Produits laitiers végétaux',
  'Huiles et matières grasses',
  'Édulcorants naturels',
  'Suppléments',
] as const;

export const MEAL_TIMES = [
  'Petit-déjeuner',
  'Collation matinale',
  'Déjeuner',
  'Collation après-midi',
  'Dîner',
  'Collation soirée',
] as const;

export const TRAINING_TYPES = [
  { value: 'easy', label: 'Facile', color: '#4CAF50', description: 'Course d\'endurance facile' },
  { value: 'moderate', label: 'Modéré', color: '#FFC107', description: 'Entraînement modéré' },
  { value: 'hard', label: 'Intense', color: '#FF9800', description: 'Séance intensive' },
  { value: 'race', label: 'Compétition', color: '#F44336', description: 'Course ou compétition' },
  { value: 'rest', label: 'Repos', color: '#9E9E9E', description: 'Jour de récupération' },
] as const;

export const ACTIVITY_LEVELS = [
  { value: 'sedentary', label: 'Sédentaire', multiplier: 1.2 },
  { value: 'light', label: 'Légèrement actif', multiplier: 1.375 },
  { value: 'moderate', label: 'Modérément actif', multiplier: 1.55 },
  { value: 'active', label: 'Très actif', multiplier: 1.725 },
  { value: 'very_active', label: 'Extrêmement actif', multiplier: 1.9 },
] as const;

export const NUTRITION_GOALS = [
  { value: 'maintenance', label: 'Maintien du poids', description: 'Conserver votre poids actuel' },
  { value: 'weight_loss', label: 'Perte de poids', description: 'Perdre du poids progressivement' },
  { value: 'muscle_gain', label: 'Prise de muscle', description: 'Développer la masse musculaire' },
  { value: 'performance', label: 'Performance', description: 'Optimiser les performances sportives' },
] as const;

export const API_ENDPOINTS = {
  auth: {
    login: '/api/auth/login',
    logout: '/api/auth/logout',
    profile: '/api/auth/profile',
  },
  recipes: {
    list: '/api/recipes',
    detail: '/api/recipes/:id',
    create: '/api/recipes',
    update: '/api/recipes/:id',
    delete: '/api/recipes/:id',
    search: '/api/recipes/search',
    favorites: '/api/recipes/favorites',
  },
  users: {
    profile: '/api/users/profile',
    stats: '/api/users/stats',
    preferences: '/api/users/preferences',
  },
  mealPlans: {
    list: '/api/meal-plans',
    create: '/api/meal-plans',
    update: '/api/meal-plans/:id',
    delete: '/api/meal-plans/:id',
  },
  nutrition: {
    calculate: '/api/nutrition/calculate',
    ingredients: '/api/nutrition/ingredients',
  },
} as const;

export const STORAGE_KEYS = {
  user: 'runner_recipes_user',
  preferences: 'runner_recipes_preferences',
  theme: 'runner_recipes_theme',
  language: 'runner_recipes_language',
  offlineRecipes: 'runner_recipes_offline',
} as const;

export const THEME_COLORS = {
  primary: '#2E7D32',
  secondary: '#FF6B35',
  accent: '#4ECDC4',
  background: '#FAFAFA',
  surface: '#FFFFFF',
  text: '#212121',
  textSecondary: '#757575',
  error: '#F44336',
  warning: '#FF9800',
  success: '#4CAF50',
  info: '#2196F3',
} as const;

export const BREAKPOINTS = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920,
} as const;

export const ANIMATION_DURATION = {
  short: 200,
  medium: 300,
  long: 500,
} as const;

export const PAGINATION = {
  defaultLimit: 12,
  maxLimit: 50,
} as const;

export const IMAGE_CONFIG = {
  maxSize: 5 * 1024 * 1024, // 5MB
  allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
  quality: 0.8,
  maxWidth: 1920,
  maxHeight: 1080,
} as const;

export const VALIDATION_RULES = {
  recipe: {
    title: { min: 3, max: 100 },
    description: { min: 10, max: 1000 },
    shortDescription: { min: 10, max: 200 },
    prepTime: { min: 0, max: 480 },
    cookTime: { min: 0, max: 480 },
    servings: { min: 1, max: 20 },
  },
  user: {
    name: { min: 2, max: 50 },
    weight: { min: 30, max: 200 },
    height: { min: 100, max: 250 },
  },
} as const;
