import { createClient } from '@supabase/supabase-js';

// Configuration Supabase
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://ldtyphlzufcitetqsekp.supabase.co';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkdHlwaGx6dWZjaXRldHFzZWtwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc3ODQ0MDUsImV4cCI6MjA3MzM2MDQwNX0.380qnH1WESpivkDX8rDvIVYa1dvaDf7EodVMZz_yImI';

// Création du client Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Types pour TypeScript
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      recipes: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          image_url: string | null;
          prep_time: number;
          cook_time: number;
          servings: number;
          difficulty: 'facile' | 'moyen' | 'difficile';
          category: string;
          ingredients: any[];
          instructions: any[];
          nutrition: any;
          author_id: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          image_url?: string | null;
          prep_time: number;
          cook_time: number;
          servings: number;
          difficulty: 'facile' | 'moyen' | 'difficile';
          category: string;
          ingredients: any[];
          instructions: any[];
          nutrition: any;
          author_id: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          image_url?: string | null;
          prep_time?: number;
          cook_time?: number;
          servings?: number;
          difficulty?: 'facile' | 'moyen' | 'difficile';
          category?: string;
          ingredients?: any[];
          instructions?: any[];
          nutrition?: any;
          author_id?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}

export default supabase;
