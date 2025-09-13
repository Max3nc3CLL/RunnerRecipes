# 🏃‍♂️ Runner Recipes

Un site web moderne et responsive spécialisé dans les recettes végétariennes adaptées aux besoins nutritionnels des coureurs et traileurs.

## 🎯 Objectif

Créer une plateforme complète qui combine les fonctionnalités classiques d'un site de recettes avec des spécificités liées à la performance sportive, optimisée pour les coureurs végétariens.

## ✨ Fonctionnalités Principales

### 🔐 Authentification
- Connexion via Google OAuth
- Profil utilisateur personnalisable avec informations sportives
- Préférences alimentaires et objectifs nutritionnels

### 🍽️ Gestion des Recettes
- **Catégories spécialisées** : Pré-course, Post-course, Récupération, Snacks trail, etc.
- **Informations nutritionnelles détaillées** : Calories, macronutriments, électrolytes, vitamines
- **Instructions complètes** avec photos et conseils techniques
- **Système de notation** et commentaires

### 👤 Fonctionnalités Utilisateur
- **Favoris** avec collections personnalisées
- **Planificateur de repas** hebdomadaire
- **Liste de courses** générée automatiquement
- **Historique** des recettes préparées

### 🧮 Outils Avancés
- **Calculateur nutritionnel** personnalisé
- **Recommandations** basées sur le type d'entraînement
- **Mode hors-ligne** pour les sorties
- **Timer intégré** pour la cuisson
- **Conversion automatique** des unités

## 🛠️ Technologies Utilisées

### Frontend
- **React 19** avec TypeScript
- **Material-UI (MUI)** pour l'interface utilisateur
- **React Router** pour la navigation
- **React Query** pour la gestion des données
- **Framer Motion** pour les animations
- **React Hook Form** pour les formulaires

### Backend (Prévu)
- **Node.js** avec Express
- **PostgreSQL** pour la base de données
- **Firebase** pour l'authentification
- **Cloudinary** pour l'hébergement d'images

### Déploiement
- **Vercel** ou **Netlify** pour le frontend
- **Heroku** ou **AWS** pour le backend

## 🚀 Installation et Démarrage

### Prérequis
- Node.js (version 18 ou supérieure)
- npm ou yarn

### Installation
```bash
# Cloner le repository
git clone https://github.com/votre-username/runner-recipes.git

# Aller dans le dossier
cd runner-recipes

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm start
```

L'application sera accessible sur `http://localhost:3000`

### Variables d'Environnement
Créez un fichier `.env.local` à la racine du projet :

```env
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_API_URL=http://localhost:3001/api
```

## 📱 Fonctionnalités Détaillées

### 🏠 Page d'Accueil
- Hero section avec présentation du concept
- Statistiques de la communauté
- Catégories populaires
- Recettes mises en avant
- Call-to-action pour l'inscription

### 🔍 Page des Recettes
- **Filtres avancés** : Catégorie, difficulté, temps, calories, note
- **Recherche intelligente** par ingrédients, tags, description
- **Affichage en grille** responsive
- **Pagination** pour de grandes listes
- **Tri** par popularité, note, date

### 📋 Fiche Recette
- **Informations complètes** : Ingrédients, instructions, nutrition
- **Photos étape par étape**
- **Timer intégré** pour la cuisson
- **Système de favoris**
- **Avis et commentaires**
- **Recettes similaires**

### 👤 Profil Utilisateur
- **Informations sportives** : Type d'activité, distance, fréquence
- **Préférences alimentaires** : Restrictions, ingrédients favoris
- **Objectifs nutritionnels** personnalisés
- **Statistiques** : Recettes préparées, favoris, etc.

### 📅 Planificateur de Repas
- **Planification hebdomadaire** avec calendrier
- **Recommandations** basées sur l'entraînement
- **Génération automatique** de liste de courses
- **Export** vers calendrier externe

## 🎨 Design et UX

### Palette de Couleurs
- **Primaire** : Vert (#2E7D32) - Nature, énergie
- **Secondaire** : Orange (#FF6B35) - Vitalité, performance
- **Accent** : Turquoise (#4ECDC4) - Fraîcheur, hydratation

### Responsive Design
- **Mobile-first** approach
- **Breakpoints** : xs, sm, md, lg, xl
- **Navigation adaptative** avec menu hamburger

### Accessibilité
- **WCAG 2.1** compliance
- **Contraste** optimisé
- **Navigation clavier**
- **Screen readers** support

## 📊 Données Nutritionnelles

### Macronutriments
- **Glucides** : Complexes pour l'endurance
- **Protéines** : Végétales pour la récupération
- **Lipides** : Essentiels et oméga-3

### Micronutriments
- **Électrolytes** : Sodium, potassium, magnésium
- **Vitamines** : B, C, D, E pour les coureurs
- **Minéraux** : Fer, calcium, zinc

### Indices Spécialisés
- **Index glycémique** pour l'énergie
- **Ratio glucides/protéines** pour la récupération
- **Score d'hydratation** pour l'effort

## 🔧 Scripts Disponibles

```bash
# Développement
npm start

# Build de production
npm run build

# Tests
npm test

# Linting
npm run lint

# Formatage du code
npm run format
```

## 📈 Métriques de Succès

- **Engagement** : Temps passé sur les recettes
- **Conversion** : Taux de création de compte
- **Rétention** : Utilisation du planificateur
- **Social** : Partages sur réseaux sociaux

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👥 Équipe

- **Développement Frontend** : React, TypeScript, Material-UI
- **Design UX/UI** : Interface moderne et intuitive
- **Nutrition** : Expertise en nutrition sportive végétarienne

## 📞 Contact

- **Email** : contact@runner-recipes.com
- **Site Web** : https://runner-recipes.com
- **Twitter** : @RunnerRecipes

---

**Fait avec ❤️ pour la communauté des coureurs végétariens**