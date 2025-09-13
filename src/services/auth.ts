// Service d'authentification avec Firebase
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { auth } from '../config/firebase';
import { User, SportProfile, UserPreferences } from '../types';

class AuthService {
  private googleProvider: GoogleAuthProvider;

  constructor() {
    this.googleProvider = new GoogleAuthProvider();
    this.googleProvider.addScope('email');
    this.googleProvider.addScope('profile');
  }

  // Connexion avec Google
  async signInWithGoogle(): Promise<User> {
    try {
      const result = await signInWithPopup(auth, this.googleProvider);
      const firebaseUser = result.user;
      
      // Créer ou mettre à jour le profil utilisateur
      const user = await this.createOrUpdateUser(firebaseUser);
      return user;
    } catch (error) {
      console.error('Erreur lors de la connexion Google:', error);
      throw new Error('Échec de la connexion avec Google');
    }
  }

  // Déconnexion
  async signOut(): Promise<void> {
    try {
      await signOut(auth);
      localStorage.removeItem('runner_recipes_user');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      throw new Error('Échec de la déconnexion');
    }
  }

  // Écouter les changements d'état d'authentification
  onAuthStateChanged(callback: (user: User | null) => void): () => void {
    return onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const user = await this.createOrUpdateUser(firebaseUser);
          callback(user);
        } catch (error) {
          console.error('Erreur lors de la récupération du profil:', error);
          callback(null);
        }
      } else {
        callback(null);
      }
    });
  }

  // Obtenir l'utilisateur actuel
  getCurrentUser(): User | null {
    const userData = localStorage.getItem('runner_recipes_user');
    return userData ? JSON.parse(userData) : null;
  }

  // Créer ou mettre à jour un utilisateur
  private async createOrUpdateUser(firebaseUser: FirebaseUser): Promise<User> {
    const defaultSportProfile: SportProfile = {
      activityType: 'running',
      averageDistance: 5,
      frequency: 'regular',
      goals: 'endurance',
      weight: 70,
      height: 170,
    };

    const defaultPreferences: UserPreferences = {
      dietaryRestrictions: [],
      favoriteIngredients: [],
      dislikedIngredients: [],
      cookingSkill: 3,
      preferredMealTimes: ['breakfast', 'lunch', 'dinner'],
      servingSize: 'medium',
    };

    const user: User = {
      id: firebaseUser.uid,
      email: firebaseUser.email || '',
      name: firebaseUser.displayName || '',
      photoURL: firebaseUser.photoURL || undefined,
      sportProfile: defaultSportProfile,
      preferences: defaultPreferences,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Sauvegarder en local storage (en production, ceci serait fait via l'API)
    localStorage.setItem('runner_recipes_user', JSON.stringify(user));
    
    return user;
  }

  // Mettre à jour le profil utilisateur
  async updateUserProfile(userId: string, updates: Partial<User>): Promise<User> {
    try {
      const currentUser = this.getCurrentUser();
      if (!currentUser || currentUser.id !== userId) {
        throw new Error('Utilisateur non autorisé');
      }

      const updatedUser: User = {
        ...currentUser,
        ...updates,
        updatedAt: new Date(),
      };

      localStorage.setItem('runner_recipes_user', JSON.stringify(updatedUser));
      return updatedUser;
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil:', error);
      throw new Error('Échec de la mise à jour du profil');
    }
  }

  // Vérifier si l'utilisateur est connecté
  isAuthenticated(): boolean {
    return !!this.getCurrentUser();
  }

  // Obtenir le token d'authentification
  async getAuthToken(): Promise<string | null> {
    const user = auth.currentUser;
    if (user) {
      return await user.getIdToken();
    }
    return null;
  }
}

export const authService = new AuthService();
export default authService;
