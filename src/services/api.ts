// Service API pour les recettes et autres données
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { Recipe, SearchFilters, ApiResponse, User, MealPlan, Review } from '../types';
import { API_ENDPOINTS } from '../constants';
import authService from './auth';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Intercepteur pour ajouter le token d'authentification
    this.api.interceptors.request.use(async (config) => {
      const token = await authService.getAuthToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Intercepteur pour gérer les erreurs
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Token expiré, rediriger vers la connexion
          authService.signOut();
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // === RECETTES ===

  // Obtenir la liste des recettes
  async getRecipes(filters?: SearchFilters, page = 1, limit = 12): Promise<ApiResponse<Recipe[]>> {
    try {
      // Pour la démonstration, utilisons les données mock
      const mockRecipes = (await import('../data/mockRecipes')).default;
      
      // Appliquer les filtres
      let filteredRecipes = [...mockRecipes];
      
      if (filters?.categories && filters.categories.length > 0) {
        filteredRecipes = filteredRecipes.filter(recipe => 
          filters.categories!.includes(recipe.category.id)
        );
      }
      
      if (filters?.difficulty && filters.difficulty.length > 0) {
        filteredRecipes = filteredRecipes.filter(recipe => 
          filters.difficulty!.includes(recipe.difficulty)
        );
      }
      
      if (filters?.prepTime) {
        filteredRecipes = filteredRecipes.filter(recipe => 
          recipe.prepTime <= filters.prepTime!
        );
      }
      
      if (filters?.calories) {
        filteredRecipes = filteredRecipes.filter(recipe => 
          recipe.nutrition.caloriesPerServing >= filters.calories!.min &&
          recipe.nutrition.caloriesPerServing <= filters.calories!.max
        );
      }
      
      if (filters?.rating) {
        filteredRecipes = filteredRecipes.filter(recipe => 
          recipe.rating >= filters.rating!
        );
      }
      
      // Pagination
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedRecipes = filteredRecipes.slice(startIndex, endIndex);
      
      return {
        data: paginatedRecipes,
        success: true,
        pagination: {
          page,
          limit,
          total: filteredRecipes.length,
          totalPages: Math.ceil(filteredRecipes.length / limit),
        },
      };
    } catch (error) {
      console.error('Erreur lors de la récupération des recettes:', error);
      throw new Error('Impossible de charger les recettes');
    }
  }

  // Obtenir une recette par ID
  async getRecipe(id: string): Promise<Recipe> {
    try {
      // Utiliser les données mock pour le développement
      const mockRecipes = (await import('../data/mockRecipes')).default;
      const recipe = mockRecipes.find(r => r.id === id);
      
      if (!recipe) {
        throw new Error('Recette non trouvée');
      }
      
      return recipe;
    } catch (error) {
      console.error('Erreur lors de la récupération de la recette:', error);
      throw new Error('Recette non trouvée');
    }
  }

  // Créer une nouvelle recette
  async createRecipe(recipeData: Partial<Recipe>): Promise<Recipe> {
    try {
      const response: AxiosResponse<Recipe> = await this.api.post(
        API_ENDPOINTS.recipes.create,
        recipeData
      );
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création de la recette:', error);
      throw new Error('Impossible de créer la recette');
    }
  }

  // Mettre à jour une recette
  async updateRecipe(id: string, recipeData: Partial<Recipe>): Promise<Recipe> {
    try {
      const response: AxiosResponse<Recipe> = await this.api.put(
        API_ENDPOINTS.recipes.update.replace(':id', id),
        recipeData
      );
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la recette:', error);
      throw new Error('Impossible de mettre à jour la recette');
    }
  }

  // Supprimer une recette
  async deleteRecipe(id: string): Promise<void> {
    try {
      await this.api.delete(API_ENDPOINTS.recipes.delete.replace(':id', id));
    } catch (error) {
      console.error('Erreur lors de la suppression de la recette:', error);
      throw new Error('Impossible de supprimer la recette');
    }
  }

  // Rechercher des recettes
  async searchRecipes(query: string, filters?: SearchFilters): Promise<ApiResponse<Recipe[]>> {
    try {
      // Pour la démonstration, utilisons les données mock
      const mockRecipes = (await import('../data/mockRecipes')).default;
      
      // Recherche textuelle
      const searchQuery = query.toLowerCase();
      let filteredRecipes = mockRecipes.filter(recipe => 
        recipe.title.toLowerCase().includes(searchQuery) ||
        recipe.description.toLowerCase().includes(searchQuery) ||
        recipe.shortDescription.toLowerCase().includes(searchQuery) ||
        recipe.tags.some(tag => tag.toLowerCase().includes(searchQuery)) ||
        recipe.ingredients.some(ingredient => ingredient.name.toLowerCase().includes(searchQuery))
      );
      
      // Appliquer les filtres supplémentaires
      if (filters?.categories && filters.categories.length > 0) {
        filteredRecipes = filteredRecipes.filter(recipe => 
          filters.categories!.includes(recipe.category.id)
        );
      }
      
      if (filters?.difficulty && filters.difficulty.length > 0) {
        filteredRecipes = filteredRecipes.filter(recipe => 
          filters.difficulty!.includes(recipe.difficulty)
        );
      }
      
      if (filters?.prepTime) {
        filteredRecipes = filteredRecipes.filter(recipe => 
          recipe.prepTime <= filters.prepTime!
        );
      }
      
      if (filters?.calories) {
        filteredRecipes = filteredRecipes.filter(recipe => 
          recipe.nutrition.caloriesPerServing >= filters.calories!.min &&
          recipe.nutrition.caloriesPerServing <= filters.calories!.max
        );
      }
      
      if (filters?.rating) {
        filteredRecipes = filteredRecipes.filter(recipe => 
          recipe.rating >= filters.rating!
        );
      }
      
      return {
        data: filteredRecipes,
        success: true,
        pagination: {
          page: 1,
          limit: filteredRecipes.length,
          total: filteredRecipes.length,
          totalPages: 1,
        },
      };
    } catch (error) {
      console.error('Erreur lors de la recherche:', error);
      throw new Error('Impossible de rechercher les recettes');
    }
  }

  // Obtenir les recettes favorites
  async getFavoriteRecipes(): Promise<Recipe[]> {
    try {
      const response: AxiosResponse<Recipe[]> = await this.api.get(
        API_ENDPOINTS.recipes.favorites
      );
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des favoris:', error);
      throw new Error('Impossible de charger les recettes favorites');
    }
  }

  // Ajouter/retirer des favoris
  async toggleFavorite(recipeId: string): Promise<boolean> {
    try {
      const response: AxiosResponse<{ isFavorite: boolean }> = await this.api.post(
        `${API_ENDPOINTS.recipes.favorites}/${recipeId}`
      );
      return response.data.isFavorite;
    } catch (error) {
      console.error('Erreur lors de la gestion des favoris:', error);
      throw new Error('Impossible de modifier les favoris');
    }
  }

  // === UTILISATEURS ===

  // Obtenir le profil utilisateur
  async getUserProfile(): Promise<User> {
    try {
      const response: AxiosResponse<User> = await this.api.get(
        API_ENDPOINTS.users.profile
      );
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération du profil:', error);
      throw new Error('Impossible de charger le profil');
    }
  }

  // Mettre à jour le profil utilisateur
  async updateUserProfile(updates: Partial<User>): Promise<User> {
    try {
      const response: AxiosResponse<User> = await this.api.put(
        API_ENDPOINTS.users.profile,
        updates
      );
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil:', error);
      throw new Error('Impossible de mettre à jour le profil');
    }
  }

  // Obtenir les statistiques utilisateur
  async getUserStats(): Promise<any> {
    try {
      const response: AxiosResponse<any> = await this.api.get(
        API_ENDPOINTS.users.stats
      );
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques:', error);
      throw new Error('Impossible de charger les statistiques');
    }
  }

  // === PLANIFICATEUR DE REPAS ===

  // Obtenir les plans de repas
  async getMealPlans(): Promise<MealPlan[]> {
    try {
      const response: AxiosResponse<MealPlan[]> = await this.api.get(
        API_ENDPOINTS.mealPlans.list
      );
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des plans de repas:', error);
      throw new Error('Impossible de charger les plans de repas');
    }
  }

  // Créer un plan de repas
  async createMealPlan(mealPlanData: Partial<MealPlan>): Promise<MealPlan> {
    try {
      const response: AxiosResponse<MealPlan> = await this.api.post(
        API_ENDPOINTS.mealPlans.create,
        mealPlanData
      );
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création du plan de repas:', error);
      throw new Error('Impossible de créer le plan de repas');
    }
  }

  // Mettre à jour un plan de repas
  async updateMealPlan(id: string, mealPlanData: Partial<MealPlan>): Promise<MealPlan> {
    try {
      const response: AxiosResponse<MealPlan> = await this.api.put(
        API_ENDPOINTS.mealPlans.update.replace(':id', id),
        mealPlanData
      );
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la mise à jour du plan de repas:', error);
      throw new Error('Impossible de mettre à jour le plan de repas');
    }
  }

  // Supprimer un plan de repas
  async deleteMealPlan(id: string): Promise<void> {
    try {
      await this.api.delete(API_ENDPOINTS.mealPlans.delete.replace(':id', id));
    } catch (error) {
      console.error('Erreur lors de la suppression du plan de repas:', error);
      throw new Error('Impossible de supprimer le plan de repas');
    }
  }

  // === NUTRITION ===

  // Calculer les besoins nutritionnels
  async calculateNutrition(calculatorData: any): Promise<any> {
    try {
      const response: AxiosResponse<any> = await this.api.post(
        API_ENDPOINTS.nutrition.calculate,
        calculatorData
      );
      return response.data;
    } catch (error) {
      console.error('Erreur lors du calcul nutritionnel:', error);
      throw new Error('Impossible de calculer les besoins nutritionnels');
    }
  }

  // Obtenir les informations nutritionnelles des ingrédients
  async getIngredientNutrition(ingredient: string): Promise<any> {
    try {
      const response: AxiosResponse<any> = await this.api.get(
        `${API_ENDPOINTS.nutrition.ingredients}/${encodeURIComponent(ingredient)}`
      );
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des infos nutritionnelles:', error);
      throw new Error('Impossible de charger les informations nutritionnelles');
    }
  }

  // === AVIS ET COMMENTAIRES ===

  // Ajouter un avis
  async addReview(recipeId: string, reviewData: Partial<Review>): Promise<Review> {
    try {
      const response: AxiosResponse<Review> = await this.api.post(
        `/api/recipes/${recipeId}/reviews`,
        reviewData
      );
      return response.data;
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'avis:', error);
      throw new Error('Impossible d\'ajouter l\'avis');
    }
  }

  // Obtenir les avis d'une recette
  async getRecipeReviews(recipeId: string): Promise<Review[]> {
    try {
      const response: AxiosResponse<Review[]> = await this.api.get(
        `/api/recipes/${recipeId}/reviews`
      );
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des avis:', error);
      throw new Error('Impossible de charger les avis');
    }
  }
}

export const apiService = new ApiService();
export default apiService;
