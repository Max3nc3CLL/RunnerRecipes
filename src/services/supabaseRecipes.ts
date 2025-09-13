import { supabase } from '../config/supabase';
import { Recipe } from '../types';

class SupabaseRecipesService {
  // Récupérer toutes les recettes
  async getAllRecipes(): Promise<Recipe[]> {
    try {
      const { data, error } = await supabase
        .from('recipes')
        .select(`
          *,
          profiles!recipes_author_id_fkey (
            id,
            full_name,
            avatar_url
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erreur lors de la récupération des recettes:', error);
        return [];
      }

      return data?.map(this.mapRecipeFromSupabase) || [];
    } catch (error) {
      console.error('Erreur lors de la récupération des recettes:', error);
      return [];
    }
  }

  // Récupérer une recette par ID
  async getRecipeById(id: string): Promise<Recipe | null> {
    try {
      const { data, error } = await supabase
        .from('recipes')
        .select(`
          *,
          profiles!recipes_author_id_fkey (
            id,
            full_name,
            avatar_url
          )
        `)
        .eq('id', id)
        .single();

      if (error) {
        console.error('Erreur lors de la récupération de la recette:', error);
        return null;
      }

      return this.mapRecipeFromSupabase(data);
    } catch (error) {
      console.error('Erreur lors de la récupération de la recette:', error);
      return null;
    }
  }

  // Récupérer les recettes par catégorie
  async getRecipesByCategory(category: string): Promise<Recipe[]> {
    try {
      const { data, error } = await supabase
        .from('recipes')
        .select(`
          *,
          profiles!recipes_author_id_fkey (
            id,
            full_name,
            avatar_url
          )
        `)
        .eq('category', category)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erreur lors de la récupération des recettes par catégorie:', error);
        return [];
      }

      return data?.map(this.mapRecipeFromSupabase) || [];
    } catch (error) {
      console.error('Erreur lors de la récupération des recettes par catégorie:', error);
      return [];
    }
  }

  // Rechercher des recettes
  async searchRecipes(query: string): Promise<Recipe[]> {
    try {
      const { data, error } = await supabase
        .from('recipes')
        .select(`
          *,
          profiles!recipes_author_id_fkey (
            id,
            full_name,
            avatar_url
          )
        `)
        .or(`title.ilike.%${query}%,description.ilike.%${query}%,category.ilike.%${query}%`)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erreur lors de la recherche de recettes:', error);
        return [];
      }

      return data?.map(this.mapRecipeFromSupabase) || [];
    } catch (error) {
      console.error('Erreur lors de la recherche de recettes:', error);
      return [];
    }
  }

  // Créer une nouvelle recette
  async createRecipe(recipe: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>): Promise<Recipe | null> {
    try {
      const { data, error } = await supabase
        .from('recipes')
        .insert({
          title: recipe.title,
          description: recipe.description,
          image_url: recipe.imageUrl,
          prep_time: recipe.prepTime,
          cook_time: recipe.cookTime,
          servings: recipe.servings,
          difficulty: recipe.difficulty,
          category: recipe.category,
          ingredients: recipe.ingredients,
          instructions: recipe.instructions,
          nutrition: recipe.nutrition,
          author_id: recipe.authorId
        })
        .select(`
          *,
          profiles!recipes_author_id_fkey (
            id,
            full_name,
            avatar_url
          )
        `)
        .single();

      if (error) {
        console.error('Erreur lors de la création de la recette:', error);
        return null;
      }

      return this.mapRecipeFromSupabase(data);
    } catch (error) {
      console.error('Erreur lors de la création de la recette:', error);
      return null;
    }
  }

  // Mettre à jour une recette
  async updateRecipe(id: string, updates: Partial<Recipe>): Promise<Recipe | null> {
    try {
      const updateData: any = {};
      
      if (updates.title) updateData.title = updates.title;
      if (updates.description) updateData.description = updates.description;
      if (updates.imageUrl) updateData.image_url = updates.imageUrl;
      if (updates.prepTime) updateData.prep_time = updates.prepTime;
      if (updates.cookTime) updateData.cook_time = updates.cookTime;
      if (updates.servings) updateData.servings = updates.servings;
      if (updates.difficulty) updateData.difficulty = updates.difficulty;
      if (updates.category) updateData.category = updates.category;
      if (updates.ingredients) updateData.ingredients = updates.ingredients;
      if (updates.instructions) updateData.instructions = updates.instructions;
      if (updates.nutrition) updateData.nutrition = updates.nutrition;
      
      updateData.updated_at = new Date().toISOString();

      const { data, error } = await supabase
        .from('recipes')
        .update(updateData)
        .eq('id', id)
        .select(`
          *,
          profiles!recipes_author_id_fkey (
            id,
            full_name,
            avatar_url
          )
        `)
        .single();

      if (error) {
        console.error('Erreur lors de la mise à jour de la recette:', error);
        return null;
      }

      return this.mapRecipeFromSupabase(data);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la recette:', error);
      return null;
    }
  }

  // Supprimer une recette
  async deleteRecipe(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('recipes')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Erreur lors de la suppression de la recette:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Erreur lors de la suppression de la recette:', error);
      return false;
    }
  }

  // Mapper les données Supabase vers le format Recipe
  private mapRecipeFromSupabase(data: any): Recipe {
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      imageUrl: data.image_url,
      prepTime: data.prep_time,
      cookTime: data.cook_time,
      servings: data.servings,
      difficulty: data.difficulty,
      category: data.category,
      ingredients: data.ingredients || [],
      instructions: data.instructions || [],
      nutrition: data.nutrition || {},
      authorId: data.author_id,
      author: data.profiles ? {
        id: data.profiles.id,
        name: data.profiles.full_name || 'Utilisateur anonyme',
        avatar: data.profiles.avatar_url
      } : undefined,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    };
  }
}

export const supabaseRecipesService = new SupabaseRecipesService();
export default supabaseRecipesService;
