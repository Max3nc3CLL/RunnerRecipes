# Guide de Développement - Runner Recipes

## 🚀 Démarrage Rapide

### Prérequis
- Node.js 18+ 
- npm ou yarn
- Git

### Installation
```bash
git clone https://github.com/votre-username/runner-recipes.git
cd runner-recipes
npm install
npm start
```

## 🏗️ Architecture du Projet

```
src/
├── components/          # Composants réutilisables
│   ├── Header.tsx      # Navigation principale
│   ├── Footer.tsx      # Pied de page
│   ├── RecipeCard.tsx  # Carte de recette
│   └── ...
├── pages/              # Pages de l'application
│   ├── HomePage.tsx    # Page d'accueil
│   ├── RecipesPage.tsx # Liste des recettes
│   └── ...
├── contexts/           # Contextes React
│   ├── AuthContext.tsx # Gestion de l'authentification
│   └── RecipeContext.tsx # Gestion des recettes
├── services/           # Services API
│   ├── auth.ts         # Service d'authentification
│   └── api.ts          # Service API principal
├── types/              # Types TypeScript
│   └── index.ts        # Types principaux
├── constants/          # Constantes de l'application
│   └── index.ts        # Constantes et configurations
├── hooks/              # Hooks personnalisés
├── utils/              # Utilitaires
└── assets/             # Ressources statiques
```

## 🛠️ Scripts Disponibles

```bash
# Développement
npm start              # Démarrer le serveur de développement
npm run build          # Build de production
npm test               # Lancer les tests
npm run test:coverage  # Tests avec couverture
npm run lint           # Vérifier le code
npm run format         # Formater le code

# Déploiement
./scripts/deploy.sh vercel    # Déployer sur Vercel
./scripts/deploy.sh netlify   # Déployer sur Netlify
./scripts/deploy.sh github    # Déployer sur GitHub Pages
```

## 🎨 Conventions de Code

### TypeScript
- Utiliser des interfaces pour les types complexes
- Préférer `interface` à `type` pour l'extensibilité
- Typer tous les props de composants
- Utiliser des enums pour les valeurs constantes

### React
- Composants fonctionnels avec hooks
- Props interface définies
- Gestion d'état avec Context API
- Hooks personnalisés pour la logique réutilisable

### Styling
- Material-UI comme système de design
- Utiliser le thème pour les couleurs
- Responsive design mobile-first
- Utiliser `sx` prop pour le styling

### Structure des Composants
```tsx
// 1. Imports
import React from 'react';
import { Box, Typography } from '@mui/material';

// 2. Types/Interfaces
interface ComponentProps {
  title: string;
  onAction?: () => void;
}

// 3. Composant
const Component: React.FC<ComponentProps> = ({ title, onAction }) => {
  // 4. Hooks
  const [state, setState] = useState();
  
  // 5. Handlers
  const handleClick = () => {
    // logique
  };
  
  // 6. Render
  return (
    <Box>
      <Typography>{title}</Typography>
    </Box>
  );
};

// 7. Export
export default Component;
```

## 🧪 Tests

### Structure des Tests
```
src/
├── __tests__/
│   ├── components/
│   ├── pages/
│   └── utils/
└── components/
    └── Component.test.tsx
```

### Exemple de Test
```tsx
import { render, screen } from '@testing-library/react';
import RecipeCard from '../RecipeCard';

describe('RecipeCard', () => {
  it('affiche le titre de la recette', () => {
    const recipe = { title: 'Test Recipe', ... };
    render(<RecipeCard recipe={recipe} />);
    expect(screen.getByText('Test Recipe')).toBeInTheDocument();
  });
});
```

## 🔧 Configuration

### Variables d'Environnement
Copier `env.example` vers `.env.local` et configurer :

```env
REACT_APP_FIREBASE_API_KEY=your_key
REACT_APP_API_URL=http://localhost:3001/api
```

### Firebase
1. Créer un projet Firebase
2. Activer Authentication (Google)
3. Configurer Firestore
4. Ajouter les clés dans `.env.local`

## 📱 PWA

### Service Worker
- Cache des ressources statiques
- Mode hors-ligne basique
- Notifications push

### Manifest
- Application installable
- Icônes et thème
- Raccourcis

## 🚀 Déploiement

### Vercel (Recommandé)
```bash
npm i -g vercel
vercel --prod
```

### Netlify
```bash
npm i -g netlify-cli
netlify deploy --prod --dir=build
```

### GitHub Pages
```bash
npm install --save-dev gh-pages
npm run deploy
```

## 🐛 Débogage

### Outils
- React Developer Tools
- Redux DevTools (si utilisé)
- Network tab pour les requêtes API
- Console pour les logs

### Logs
```tsx
// Utiliser console.log pour le développement
console.log('Debug:', data);

// Utiliser des niveaux de log
console.warn('Warning:', message);
console.error('Error:', error);
```

## 📊 Performance

### Optimisations
- Lazy loading des composants
- Memoization avec React.memo
- Code splitting
- Image optimization
- Bundle analysis

### Mesures
```bash
npm run build
npx serve -s build
# Ouvrir Chrome DevTools > Lighthouse
```

## 🔒 Sécurité

### Bonnes Pratiques
- Validation des inputs
- Sanitization des données
- HTTPS en production
- Headers de sécurité
- Gestion des erreurs

### Headers de Sécurité
```json
{
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "X-XSS-Protection": "1; mode=block"
}
```

## 📈 Monitoring

### Analytics
- Google Analytics 4
- Hotjar pour l'UX
- Sentry pour les erreurs

### Métriques
- Core Web Vitals
- Temps de chargement
- Taux d'erreur
- Engagement utilisateur

## 🤝 Contribution

### Workflow
1. Fork du projet
2. Créer une branche feature
3. Développer et tester
4. Créer une Pull Request
5. Review et merge

### Standards
- Code review obligatoire
- Tests unitaires
- Documentation mise à jour
- Pas de console.log en production

## 📚 Ressources

### Documentation
- [React](https://reactjs.org/docs)
- [Material-UI](https://mui.com/)
- [TypeScript](https://www.typescriptlang.org/docs)
- [Firebase](https://firebase.google.com/docs)

### Outils
- [VS Code](https://code.visualstudio.com/)
- [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools)
- [Figma](https://figma.com/) pour le design

## ❓ FAQ

### Q: Comment ajouter une nouvelle page ?
A: Créer le composant dans `src/pages/`, ajouter la route dans `App.tsx`, et mettre à jour la navigation.

### Q: Comment ajouter un nouveau service API ?
A: Créer le service dans `src/services/`, définir les types dans `src/types/`, et l'utiliser dans les composants.

### Q: Comment gérer l'état global ?
A: Utiliser les Contextes React ou Redux Toolkit pour les états complexes.

### Q: Comment optimiser les performances ?
A: Utiliser React.memo, useMemo, useCallback, et le code splitting.

---

**Besoin d'aide ?** Contactez l'équipe de développement ou ouvrez une issue sur GitHub.
