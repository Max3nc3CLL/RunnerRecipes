import { supabase } from '../config/supabase';
import { User as SupabaseUser, Session, AuthError } from '@supabase/supabase-js';
import { User } from '../types';

export interface AuthUser {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
}

export interface AuthResponse {
  user: AuthUser | null;
  error: AuthError | null;
}

class SupabaseAuthService {
  // Connexion avec Google
  async signInWithGoogle(): Promise<AuthResponse> {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (error) {
        return { user: null, error };
      }

      return { user: null, error: null };
    } catch (error) {
      return { 
        user: null, 
        error: error as AuthError 
      };
    }
  }

  // Connexion avec email/mot de passe
  async signInWithEmail(email: string, password: string): Promise<AuthResponse> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        return { user: null, error };
      }

      const authUser = await this.getUserProfile(data.user);
      const user = authUser ? this.mapAuthUserToUser(authUser) : null;
      return { user, error: null };
    } catch (error) {
      return { 
        user: null, 
        error: error as AuthError 
      };
    }
  }

  // Inscription avec email/mot de passe
  async signUpWithEmail(email: string, password: string, fullName?: string): Promise<AuthResponse> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName
          }
        }
      });

      if (error) {
        return { user: null, error };
      }

      if (!data.user) {
        return { user: null, error: null };
      }
      
      const authUser = await this.getUserProfile(data.user);
      const user = authUser ? this.mapAuthUserToUser(authUser) : null;
      return { user, error: null };
    } catch (error) {
      return { 
        user: null, 
        error: error as AuthError 
      };
    }
  }

  // Déconnexion
  async signOut(): Promise<{ error: AuthError | null }> {
    try {
      const { error } = await supabase.auth.signOut();
      return { error };
    } catch (error) {
      return { 
        error: error as AuthError 
      };
    }
  }

  // Obtenir l'utilisateur actuel
  async getCurrentUser(): Promise<User | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;
      
      const authUser = await this.getUserProfile(user);
      if (!authUser) return null;
      
      return this.mapAuthUserToUser(authUser);
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'utilisateur:', error);
      return null;
    }
  }

  // Obtenir la session actuelle
  async getCurrentSession(): Promise<Session | null> {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      return session;
    } catch (error) {
      console.error('Erreur lors de la récupération de la session:', error);
      return null;
    }
  }

  // Écouter les changements d'authentification
  onAuthStateChange(callback: (user: User | null) => void) {
    return supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const authUser = await this.getUserProfile(session.user);
        if (authUser) {
          const user = this.mapAuthUserToUser(authUser);
          callback(user);
        } else {
          callback(null);
        }
      } else {
        callback(null);
      }
    });
  }

  // Obtenir le profil utilisateur depuis la table profiles
  private async getUserProfile(user: SupabaseUser): Promise<AuthUser | null> {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
        console.error('Erreur lors de la récupération du profil:', error);
        return null;
      }

      // Si le profil n'existe pas, le créer
      if (!profile) {
        const newProfile = {
          id: user.id,
          email: user.email || '',
          full_name: user.user_metadata?.full_name || null,
          avatar_url: user.user_metadata?.avatar_url || null,
        };

        const { error: insertError } = await supabase
          .from('profiles')
          .insert(newProfile);

        if (insertError) {
          console.error('Erreur lors de la création du profil:', insertError);
          return null;
        }

        return newProfile;
      }

      return {
        id: profile.id,
        email: profile.email,
        full_name: profile.full_name,
        avatar_url: profile.avatar_url
      };
    } catch (error) {
      console.error('Erreur lors de la récupération du profil:', error);
      return null;
    }
  }

  // Mettre à jour le profil utilisateur
  async updateUserProfile(updates: Partial<AuthUser>): Promise<{ error: AuthError | null }> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        return { error: { message: 'Utilisateur non connecté' } as AuthError };
      }

      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: updates.full_name,
          avatar_url: updates.avatar_url,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      return { error: error as unknown as AuthError };
    } catch (error) {
      return { 
        error: error as AuthError 
      };
    }
  }

  // Mapper AuthUser vers User
  private mapAuthUserToUser(authUser: AuthUser): User {
    return {
      id: authUser.id,
      email: authUser.email,
      name: authUser.full_name || 'Utilisateur',
      photoURL: authUser.avatar_url,
      sportProfile: {
        activityType: 'running',
        averageDistance: 10,
        frequency: 'regular',
        goals: 'endurance',
        weight: 70,
        height: 175
      },
      preferences: {
        dietaryRestrictions: [],
        favoriteIngredients: [],
        dislikedIngredients: [],
        cookingSkill: 3,
        preferredMealTimes: ['breakfast', 'lunch', 'dinner'],
        servingSize: 'medium'
      },
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }
}

export const supabaseAuthService = new SupabaseAuthService();
export default supabaseAuthService;
