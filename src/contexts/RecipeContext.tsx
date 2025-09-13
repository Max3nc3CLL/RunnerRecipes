// Contexte pour la gestion des recettes
import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Recipe, SearchFilters } from '../types';
import apiService from '../services/api';

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
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecipes, setTotalRecipes] = useState(0);

  const fetchRecipes = useCallback(async (filters?: SearchFilters, page = 1) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiService.getRecipes(filters, page);
      setRecipes(response.data);
      setCurrentPage(page);
      
      if (response.pagination) {
        setTotalPages(response.pagination.totalPages);
        setTotalRecipes(response.pagination.total);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement des recettes');
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const searchRecipes = useCallback(async (query: string, filters?: SearchFilters) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiService.searchRecipes(query, filters);
      setRecipes(response.data);
      setCurrentPage(1);
      
      if (response.pagination) {
        setTotalPages(response.pagination.totalPages);
        setTotalRecipes(response.pagination.total);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la recherche');
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const getRecipe = useCallback(async (id: string) => {
    try {
      const recipe = await apiService.getRecipe(id);
      return recipe;
    } catch (err) {
      console.error('Erreur lors de la récupération de la recette:', err);
      return null;
    }
  }, []);

  const toggleFavorite = useCallback(async (recipeId: string) => {
    try {
      const isFavorite = await apiService.toggleFavorite(recipeId);
      
      // Mettre à jour l'état local
      setRecipes(prevRecipes =>
        prevRecipes.map(recipe =>
          recipe.id === recipeId
            ? { ...recipe, isFavorite }
            : recipe
        )
      );
    } catch (err) {
      console.error('Erreur lors de la gestion des favoris:', err);
    }
  }, []);

  const updateFilters = useCallback((newFilters: Partial<SearchFilters>) => {
    const updatedFilters = { ...searchFilters, ...newFilters };
    setSearchFilters(updatedFilters);
    fetchRecipes(updatedFilters, 1);
  }, [searchFilters, fetchRecipes]);

  const clearFilters = useCallback(() => {
    setSearchFilters({});
    fetchRecipes({}, 1);
  }, [fetchRecipes]);

  const refreshRecipes = useCallback(async () => {
    await fetchRecipes(searchFilters, currentPage);
  }, [searchFilters, currentPage, fetchRecipes]);

  // Charger les recettes au montage du composant
  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

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