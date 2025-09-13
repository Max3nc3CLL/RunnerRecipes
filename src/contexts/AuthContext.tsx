// Contexte d'authentification avec Supabase
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabaseAuthService } from '../services/supabaseAuth';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (updates: Partial<User>) => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Récupérer l'utilisateur actuel au chargement
    const getCurrentUser = async () => {
      try {
        const currentUser = await supabaseAuthService.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'utilisateur:', error);
      } finally {
        setLoading(false);
      }
    };

    getCurrentUser();

    // Écouter les changements d'authentification
    const { data: { subscription } } = supabaseAuthService.onAuthStateChange((authUser) => {
      setUser(authUser);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async () => {
    try {
      setLoading(true);
      const { error } = await supabaseAuthService.signInWithGoogle();
      
      if (error) {
        throw new Error(error.message);
      }
      
      // L'utilisateur sera mis à jour via onAuthStateChange
    } catch (error) {
      console.error('Erreur de connexion:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabaseAuthService.signOut();
      
      if (error) {
        throw new Error(error.message);
      }
      
      setUser(null);
    } catch (error) {
      console.error('Erreur de déconnexion:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (updates: Partial<User>) => {
    if (!user) return;

    try {
      const { error } = await supabaseAuthService.updateUserProfile(updates);
      
      if (error) {
        throw new Error(error.message);
      }
      
      // Mettre à jour l'utilisateur local
      setUser({ ...user, ...updates });
    } catch (error) {
      console.error('Erreur de mise à jour du profil:', error);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    signIn,
    signOut,
    updateUser,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider');
  }
  return context;
};

export default AuthContext;