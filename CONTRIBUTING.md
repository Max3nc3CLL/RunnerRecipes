# Guide de Contribution - Runner Recipes

Merci de votre intérêt à contribuer à Runner Recipes ! Ce guide vous aidera à comprendre comment contribuer efficacement au projet.

## 🤝 Comment Contribuer

### 1. Fork et Clone
```bash
# Fork le repository sur GitHub
# Puis clonez votre fork
git clone https://github.com/votre-username/runner-recipes.git
cd runner-recipes
```

### 2. Configuration de l'Environnement
```bash
# Installer les dépendances
npm install

# Créer une branche pour votre feature
git checkout -b feature/nom-de-votre-feature

# Démarrer le serveur de développement
npm start
```

### 3. Workflow de Développement
```bash
# Vérifier le code
npm run lint
npm run format:check
npm run type-check

# Lancer les tests
npm test

# Build de production
npm run build
```

## 📋 Types de Contributions

### 🐛 Bug Reports
- Utilisez le template d'issue "Bug Report"
- Incluez des étapes pour reproduire le bug
- Ajoutez des captures d'écran si nécessaire
- Spécifiez votre environnement (OS, navigateur, version)

### ✨ Nouvelles Fonctionnalités
- Utilisez le template d'issue "Feature Request"
- Décrivez clairement la fonctionnalité souhaitée
- Expliquez pourquoi elle serait utile
- Proposez une implémentation si possible

### 📚 Amélioration de la Documentation
- Corrections de typos
- Amélioration des explications
- Ajout d'exemples
- Traduction

### 🎨 Amélioration de l'UI/UX
- Propositions de design
- Amélioration de l'accessibilité
- Optimisation mobile
- Animations et transitions

## 🛠️ Standards de Code

### TypeScript
```typescript
// ✅ Bon
interface UserProps {
  name: string;
  email: string;
  isActive?: boolean;
}

const User: React.FC<UserProps> = ({ name, email, isActive = false }) => {
  return <div>{name}</div>;
};

// ❌ Éviter
const User = (props: any) => {
  return <div>{props.name}</div>;
};
```

### React
```tsx
// ✅ Bon - Composant fonctionnel avec hooks
const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onFavorite }) => {
  const [isFavorite, setIsFavorite] = useState(recipe.isFavorite);
  
  const handleFavorite = useCallback(() => {
    setIsFavorite(!isFavorite);
    onFavorite?.(recipe.id);
  }, [isFavorite, onFavorite, recipe.id]);
  
  return (
    <Card onClick={handleFavorite}>
      <CardContent>
        <Typography variant="h6">{recipe.title}</Typography>
      </CardContent>
    </Card>
  );
};

// ❌ Éviter - Composant de classe
class RecipeCard extends React.Component {
  // ...
}
```

### Styling
```tsx
// ✅ Bon - Utiliser le thème Material-UI
const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  '&:hover': {
    boxShadow: theme.shadows[4],
  },
}));

// ✅ Bon - Utiliser sx prop
<Box
  sx={{
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    p: 2,
  }}
>
  Content
</Box>
```

### Tests
```tsx
// ✅ Bon - Test complet
describe('RecipeCard', () => {
  it('affiche le titre de la recette', () => {
    const recipe = { title: 'Test Recipe', ... };
    render(<RecipeCard recipe={recipe} />);
    expect(screen.getByText('Test Recipe')).toBeInTheDocument();
  });
  
  it('appelle onFavorite quand on clique', () => {
    const mockOnFavorite = jest.fn();
    render(<RecipeCard recipe={recipe} onFavorite={mockOnFavorite} />);
    fireEvent.click(screen.getByRole('button'));
    expect(mockOnFavorite).toHaveBeenCalledWith(recipe.id);
  });
});
```

## 📝 Processus de Pull Request

### 1. Préparation
- [ ] Votre code suit les standards du projet
- [ ] Tous les tests passent
- [ ] Le code est formaté avec Prettier
- [ ] Aucun warning ESLint
- [ ] TypeScript compile sans erreur

### 2. Description de la PR
```markdown
## Description
Brève description des changements

## Type de changement
- [ ] Bug fix
- [ ] Nouvelle fonctionnalité
- [ ] Breaking change
- [ ] Documentation

## Tests
- [ ] Tests unitaires ajoutés/mis à jour
- [ ] Tests d'intégration ajoutés/mis à jour
- [ ] Tests manuels effectués

## Checklist
- [ ] Code auto-documenté
- [ ] Pas de console.log en production
- [ ] Accessibilité vérifiée
- [ ] Responsive design testé
```

### 3. Review Process
1. **Automated Checks** : CI/CD pipeline
2. **Code Review** : Au moins 1 approbation requise
3. **Testing** : Tests manuels sur différents navigateurs
4. **Merge** : Squash and merge recommandé

## 🏷️ Labels et Milestones

### Labels
- `bug` : Problème à corriger
- `enhancement` : Amélioration
- `feature` : Nouvelle fonctionnalité
- `documentation` : Documentation
- `good first issue` : Bon pour débuter
- `help wanted` : Aide recherchée
- `priority: high` : Priorité élevée
- `priority: medium` : Priorité moyenne
- `priority: low` : Priorité faible

### Milestones
- `v1.0.0` : Version initiale
- `v1.1.0` : Améliorations mineures
- `v2.0.0` : Version majeure

## 🚀 Déploiement

### Branches
- `main` : Production
- `develop` : Développement
- `feature/*` : Nouvelles fonctionnalités
- `bugfix/*` : Corrections de bugs
- `hotfix/*` : Corrections urgentes

### Processus
1. **Feature** → `develop` → `main`
2. **Hotfix** → `main` (urgent)
3. **Release** : Tag de version sur `main`

## 📞 Communication

### Channels
- **GitHub Issues** : Bugs et features
- **GitHub Discussions** : Questions générales
- **Pull Requests** : Code review
- **Email** : contact@runner-recipes.com

### Code of Conduct
- Soyez respectueux et inclusif
- Constructif dans les critiques
- Ouvert aux différentes perspectives
- Professionnel dans les interactions

## 🎯 Roadmap

### Version 1.0 (MVP)
- [x] Interface de base
- [x] Système de recettes
- [x] Calculateur nutritionnel
- [x] Authentification
- [ ] Planificateur de repas
- [ ] Mode hors-ligne

### Version 1.1
- [ ] Notifications push
- [ ] Partage social
- [ ] API mobile
- [ ] Analytics avancées

### Version 2.0
- [ ] IA pour recommandations
- [ ] Intégration wearables
- [ ] Communauté
- [ ] Marketplace

## ❓ Questions Fréquentes

### Q: Comment tester localement ?
A: `npm start` puis ouvrir http://localhost:3000

### Q: Comment ajouter une nouvelle page ?
A: Créer le composant dans `src/pages/`, ajouter la route dans `App.tsx`

### Q: Comment gérer l'état global ?
A: Utiliser les Contextes React ou Redux Toolkit

### Q: Comment contribuer sans coder ?
A: Documentation, tests, design, traduction, feedback

---

**Merci de contribuer à Runner Recipes ! 🏃‍♂️🥗**
