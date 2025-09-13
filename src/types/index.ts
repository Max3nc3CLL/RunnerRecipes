// Types principaux pour l'application de recettes pour coureurs

export interface User {
  id: string;
  email: string;
  name: string;
  photoURL?: string;
  sportProfile: SportProfile;
  preferences: UserPreferences;
  createdAt: Date;
  updatedAt: Date;
}

export interface SportProfile {
  activityType: 'running' | 'trail' | 'both';
  averageDistance: number; // en km
  frequency: 'occasional' | 'regular' | 'intensive';
  goals: 'endurance' | 'performance' | 'recovery' | 'weight_loss';
  weight: number; // en kg
  height: number; // en cm
}

export interface UserPreferences {
  dietaryRestrictions: string[];
  favoriteIngredients: string[];
  dislikedIngredients: string[];
  cookingSkill: 1 | 2 | 3 | 4 | 5;
  preferredMealTimes: string[];
  servingSize: 'small' | 'medium' | 'large';
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  imageUrl: string;
  images: string[];
  category: RecipeCategory;
  difficulty: 1 | 2 | 3 | 4 | 5;
  prepTime: number; // en minutes
  cookTime: number; // en minutes
  servings: number;
  ingredients: Ingredient[];
  instructions: Instruction[];
  nutrition: NutritionInfo;
  tags: string[];
  author: User;
  createdAt: Date;
  updatedAt: Date;
  rating: number;
  reviewCount: number;
  isFavorite?: boolean;
}

export interface RecipeCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export interface Ingredient {
  id: string;
  name: string;
  amount: number;
  unit: string;
  notes?: string;
  isOptional: boolean;
  nutritionPer100g?: Partial<NutritionInfo>;
}

export interface Instruction {
  id: string;
  step: number;
  description: string;
  imageUrl?: string;
  timeMinutes?: number;
  temperature?: number;
  tips?: string;
}

export interface NutritionInfo {
  calories: number;
  caloriesPerServing: number;
  macronutrients: {
    carbohydrates: number; // g
    proteins: number; // g
    fats: number; // g
    fiber: number; // g
    sugars: number; // g
  };
  micronutrients: {
    sodium: number; // mg
    potassium: number; // mg
    magnesium: number; // mg
    calcium: number; // mg
    iron: number; // mg
    vitaminB12: number; // mcg
    vitaminC: number; // mg
    vitaminD: number; // mcg
    vitaminE: number; // mg
  };
  glycemicIndex: number;
  carbToProteinRatio: number;
  hydrationScore: number; // 1-10
}

export interface Review {
  id: string;
  userId: string;
  recipeId: string;
  rating: number;
  comment: string;
  images?: string[];
  createdAt: Date;
  helpful: number;
}

export interface MealPlan {
  id: string;
  userId: string;
  weekStart: Date;
  meals: MealPlanDay[];
  shoppingList: ShoppingItem[];
  totalNutrition: NutritionInfo;
  createdAt: Date;
  updatedAt: Date;
}

export interface MealPlanDay {
  date: Date;
  meals: {
    breakfast?: Recipe;
    lunch?: Recipe;
    dinner?: Recipe;
    snacks: Recipe[];
  };
  trainingType?: 'easy' | 'moderate' | 'hard' | 'race' | 'rest';
  notes?: string;
}

export interface ShoppingItem {
  id: string;
  ingredient: string;
  amount: number;
  unit: string;
  isPurchased: boolean;
  category: string;
}

export interface SearchFilters {
  categories?: string[];
  difficulty?: number[];
  prepTime?: number;
  cookTime?: number;
  calories?: {
    min: number;
    max: number;
  };
  ingredients?: string[];
  tags?: string[];
  rating?: number;
  author?: string;
}

export interface NutritionCalculator {
  weight: number;
  height: number;
  age: number;
  gender: 'male' | 'female';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  trainingIntensity: 'low' | 'medium' | 'high';
  trainingDuration: number; // minutes per week
  goals: 'maintenance' | 'weight_loss' | 'muscle_gain' | 'performance';
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ErrorResponse {
  error: string;
  message: string;
  statusCode: number;
}

// Types pour les formulaires
export interface RecipeFormData {
  title: string;
  description: string;
  shortDescription: string;
  category: string;
  difficulty: number;
  prepTime: number;
  cookTime: number;
  servings: number;
  ingredients: Omit<Ingredient, 'id'>[];
  instructions: Omit<Instruction, 'id'>[];
  tags: string[];
}

export interface UserProfileFormData {
  name: string;
  sportProfile: Partial<SportProfile>;
  preferences: Partial<UserPreferences>;
}

// Types pour les statistiques
export interface UserStats {
  totalRecipes: number;
  favoriteRecipes: number;
  mealPlansCreated: number;
  reviewsWritten: number;
  averageRating: number;
  mostUsedIngredients: string[];
  favoriteCategories: string[];
}

// Types pour les notifications
export interface Notification {
  id: string;
  userId: string;
  type: 'recipe_reminder' | 'meal_plan_reminder' | 'new_recipe' | 'review_reply';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
  data?: any;
}
