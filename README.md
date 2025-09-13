# 🏃‍♂️ Runner Recipes

> **Recettes végétariennes pour coureurs et traileurs** - Une application moderne pour optimiser votre nutrition sportive

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/your-username/runner-recipes)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-19.1.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-blue.svg)](https://www.typescriptlang.org/)
[![Material-UI](https://img.shields.io/badge/Material--UI-7.3.2-blue.svg)](https://mui.com/)

## ✨ Fonctionnalités

### 🎨 Design System Moderne
- **Palette de couleurs** optimisée pour l'énergie et la performance
- **Composants réutilisables** avec animations fluides
- **Design responsive** adapté à tous les écrans
- **Micro-interactions** sophistiquées

### 🔐 Authentification
- **Connexion Google** sécurisée avec Firebase
- **Gestion des profils** utilisateur personnalisés
- **Sessions persistantes** et déconnexion sécurisée

### 🍽️ Gestion des Recettes
- **Cartes de recettes** modernes avec images et overlays
- **Filtres de recherche** avancés
- **Système de favoris** et bookmarks
- **Copie facile** des listes d'ingrédients

### 📊 Nutrition
- **Calculateur nutritionnel** intelligent
- **Labels nutritionnels** avec design moderne
- **Macro-nutriments** détaillés
- **Recommandations** personnalisées

### 🎯 Fonctionnalités Avancées
- **Planificateur de repas** (en développement)
- **Profils sportifs** personnalisés
- **Historique des performances**
- **Export des données**

## 🚀 Installation

### Prérequis
- Node.js 16+ 
- npm ou yarn
- Compte Firebase (pour l'authentification)

### Installation
```bash
# Cloner le repository
git clone https://github.com/your-username/runner-recipes.git
cd runner-recipes

# Installer les dépendances
npm install

# Configuration Firebase
cp env.example .env.local
# Éditer .env.local avec vos clés Firebase

# Démarrer le serveur de développement
npm start
```

### Configuration Firebase
Suivez le guide détaillé dans [FIREBASE_SETUP.md](FIREBASE_SETUP.md)

## 🛠️ Développement

### Structure du Projet
```
src/
├── components/          # Composants réutilisables
│   ├── ModernButton.tsx
│   ├── MacroCard.tsx
│   ├── RatingStars.tsx
│   └── ...
├── pages/              # Pages de l'application
├── contexts/           # Contextes React
├── services/           # Services API et Firebase
├── styles/            # Système de design CSS
├── types/             # Types TypeScript
└── hooks/             # Hooks personnalisés
```

### Scripts Disponibles
```bash
# Développement
npm start              # Serveur de développement
npm run build          # Build de production
npm test               # Tests unitaires
npm run lint           # Linting ESLint

# Git Workflow
./scripts/new-feature.sh "nom-feature"    # Nouvelle fonctionnalité
./scripts/new-hotfix.sh "nom-hotfix"      # Correction urgente
./scripts/prepare-release.sh "v1.0.0"     # Préparation release
```

### Workflow Git
- **`main`** - Branche de production
- **`develop`** - Branche de développement
- **`feature/*`** - Nouvelles fonctionnalités
- **`hotfix/*`** - Corrections urgentes

Voir [GIT_SETUP.md](GIT_SETUP.md) pour la configuration complète.

## 🎨 Design System

### Palette de Couleurs
- **Primaire** : Orange énergétique (#F98807, #FFB231)
- **Secondaire** : Vert nature (#4ADE80)
- **Neutres** : Gris sophistiqués (#262730 → #F6F7F9)

### Typographie
- **Hiérarchie claire** : h1 (48px) → caption (12px)
- **Poids variés** : 400 → 800
- **Line-height optimisé** pour la lisibilité

### Composants
- **ModernButton** : 5 variantes, 3 tailles
- **MacroCard** : Cartes nutritionnelles
- **RatingStars** : Système de notation
- **AnimatedWrapper** : Animations au scroll

Voir [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) pour la documentation complète.

## 📱 Pages

- **`/`** - Page d'accueil
- **`/login`** - Connexion Google
- **`/recipes`** - Liste des recettes
- **`/recipes/:id`** - Détail d'une recette
- **`/nutrition`** - Calculateur nutritionnel

## 🧪 Tests

```bash
# Tests unitaires
npm test

# Tests avec couverture
npm run test:coverage

# Tests en mode watch
npm test -- --watch
```

## 🚀 Déploiement

### Vercel (Recommandé)
```bash
# Installation Vercel CLI
npm i -g vercel

# Déploiement
vercel --prod
```

### Netlify
```bash
# Build
npm run build

# Déploiement
npx netlify deploy --prod --dir=build
```

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commiter les changements (`git commit -m 'Add some AmazingFeature'`)
4. Pousser vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

Voir [CONTRIBUTING.md](CONTRIBUTING.md) pour les guidelines détaillées.

## 📄 Licence

Distribué sous la licence MIT. Voir [LICENSE](LICENSE) pour plus d'informations.

## 👥 Équipe

- **Développement** : [Votre nom]
- **Design** : [Designer]
- **Nutrition** : [Nutritionniste]

## 📞 Support

- **Issues** : [GitHub Issues](https://github.com/your-username/runner-recipes/issues)
- **Discussions** : [GitHub Discussions](https://github.com/your-username/runner-recipes/discussions)
- **Email** : support@runner-recipes.com

## 🗺️ Roadmap

### v1.1.0 (Q2 2024)
- [ ] Planificateur de repas
- [ ] Profils sportifs avancés
- [ ] Export PDF des recettes
- [ ] Mode hors-ligne

### v1.2.0 (Q3 2024)
- [ ] Application mobile
- [ ] Synchronisation cloud
- [ ] Communauté et partage
- [ ] IA pour recommandations

---

<div align="center">
  <strong>🏃‍♂️ Optimisez votre nutrition, améliorez vos performances ! 🏃‍♀️</strong>
</div>