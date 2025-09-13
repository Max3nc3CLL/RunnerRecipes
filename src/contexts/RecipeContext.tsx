// Contexte pour la gestion des recettes avec Supabase
import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Recipe, SearchFilters } from '../types';
import { supabaseRecipesService } from '../services/supabaseRecipes';

interface RecipeContextType {
  recipes: Recipe[];
  loading: boolean;
  error: string | null;
  searchFilters: SearchFilters;
  currentPage: number;
  totalPages: number;
  totalRecipes: number;
  fetchRecipes: (filters?: SearchFilters, page?: number) => Promise<void>;
  searchRecipes: (query: string, filters?: SearchFilters) => Promise<void>;
  getRecipe: (id: string) => Promise<Recipe | null>;
  toggleFavorite: (recipeId: string) => Promise<void>;
  updateFilters: (filters: Partial<SearchFilters>) => void;
  clearFilters: () => void;
  refreshRecipes: () => Promise<void>;
}

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

interface RecipeProviderProps {
  children: ReactNode;
}

export const RecipeProvider: React.FC<RecipeProviderProps> = ({ children }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    categories: [],
    difficulty: [],
    prepTime: undefined,
    cookTime: undefined,
    rating: undefined,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecipes, setTotalRecipes] = useState(0);

  const ITEMS_PER_PAGE = 12;

  // Récupérer toutes les recettes
  const fetchRecipes = useCallback(async (filters?: SearchFilters, page: number = 1) => {
    try {
      setLoading(true);
      setError(null);

      let allRecipes = await supabaseRecipesService.getAllRecipes();

      // Appliquer les filtres
      if (filters) {
        allRecipes = allRecipes.filter(recipe => {
          if (filters.categories && filters.categories.length > 0 && !filters.categories.includes(recipe.category.id)) return false;
          if (filters.difficulty && filters.difficulty.length > 0 && !filters.difficulty.includes(recipe.difficulty)) return false;
          if (filters.prepTime && recipe.prepTime > filters.prepTime) return false;
          if (filters.cookTime && recipe.cookTime > filters.cookTime) return false;
          if (filters.rating && recipe.rating < filters.rating) return false;
          return true;
        });
      }

      // Pagination
      const startIndex = (page - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      const paginatedRecipes = allRecipes.slice(startIndex, endIndex);

      setRecipes(paginatedRecipes);
      setTotalRecipes(allRecipes.length);
      setTotalPages(Math.ceil(allRecipes.length / ITEMS_PER_PAGE));
      setCurrentPage(page);
    } catch (err) {
      setError('Erreur lors du chargement des recettes');
      console.error('Erreur fetchRecipes:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Rechercher des recettes
  const searchRecipes = useCallback(async (query: string, filters?: SearchFilters) => {
    try {
      setLoading(true);
      setError(null);

      let searchResults = await supabaseRecipesService.searchRecipes(query);

      // Appliquer les filtres supplémentaires
      if (filters) {
        searchResults = searchResults.filter(recipe => {
          if (filters.categories && filters.categories.length > 0 && !filters.categories.includes(recipe.category.id)) return false;
          if (filters.difficulty && filters.difficulty.length > 0 && !filters.difficulty.includes(recipe.difficulty)) return false;
          if (filters.prepTime && recipe.prepTime > filters.prepTime) return false;
          if (filters.cookTime && recipe.cookTime > filters.cookTime) return false;
          if (filters.rating && recipe.rating < filters.rating) return false;
          return true;
        });
      }

      setRecipes(searchResults);
      setTotalRecipes(searchResults.length);
      setTotalPages(1);
      setCurrentPage(1);
    } catch (err) {
      setError('Erreur lors de la recherche');
      console.error('Erreur searchRecipes:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Récupérer une recette par ID
  const getRecipe = useCallback(async (id: string): Promise<Recipe | null> => {
    try {
      setLoading(true);
      setError(null);

      const recipe = await supabaseRecipesService.getRecipeById(id);
      return recipe;
    } catch (err) {
      setError('Erreur lors du chargement de la recette');
      console.error('Erreur getRecipe:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Basculer le favori (pour l'instant, juste une simulation)
  const toggleFavorite = useCallback(async (recipeId: string) => {
    try {
      // TODO: Implémenter la logique de favoris avec Supabase
      console.log('Toggle favorite pour la recette:', recipeId);
    } catch (err) {
      console.error('Erreur toggleFavorite:', err);
    }
  }, []);

  // Mettre à jour les filtres
  const updateFilters = useCallback((filters: Partial<SearchFilters>) => {
    setSearchFilters(prev => ({ ...prev, ...filters }));
  }, []);

  // Effacer les filtres
  const clearFilters = useCallback(() => {
    setSearchFilters({
      categories: [],
      difficulty: [],
      prepTime: undefined,
      cookTime: undefined,
      rating: undefined,
    });
  }, []);

  // Actualiser les recettes
  const refreshRecipes = useCallback(async () => {
    await fetchRecipes(searchFilters, currentPage);
  }, [fetchRecipes, searchFilters, currentPage]);

  // Charger les recettes au montage du composant
  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  // Recharger les recettes quand les filtres changent
  useEffect(() => {
    fetchRecipes(searchFilters, 1);
  }, [searchFilters, fetchRecipes]);

  const value: RecipeContextType = {
    recipes,
    loading,
    error,
    searchFilters,
    currentPage,
    totalPages,
    totalRecipes,
    fetchRecipes,
    searchRecipes,
    getRecipe,
    toggleFavorite,
    updateFilters,
    clearFilters,
    refreshRecipes,
  };

  return (
    <RecipeContext.Provider value={value}>
      {children}
    </RecipeContext.Provider>
  );
};

export const useRecipes = (): RecipeContextType => {
  const context = useContext(RecipeContext);
  if (context === undefined) {
    throw new Error('useRecipes doit être utilisé dans un RecipeProvider');
  }
  return context;
};

export default RecipeContext;