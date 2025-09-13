# 🌿 Configuration Git pour Runner Recipes

## 📋 Étapes de Configuration

### 1. Créer un Repository GitHub

1. Allez sur [GitHub](https://github.com)
2. Cliquez sur "New repository"
3. Nom : `runner-recipes`
4. Description : "Recettes végétariennes pour coureurs et traileurs"
5. Visibilité : Public ou Private
6. **Ne pas** initialiser avec README (déjà présent)
7. Cliquez sur "Create repository"

### 2. Configurer le Remote

```bash
# Ajouter le remote origin
git remote add origin https://github.com/VOTRE_USERNAME/runner-recipes.git

# Vérifier la configuration
git remote -v

# Pousser les branches principales
git push -u origin main
git push -u origin develop
```

### 3. Créer les Branches de Fonctionnalités

```bash
# Retourner sur develop
git checkout develop

# Créer les branches de fonctionnalités
git checkout -b feature/recipe-management
git checkout develop
git checkout -b feature/nutrition-calculator
git checkout develop
git checkout -b feature/user-profiles
git checkout develop
git checkout -b feature/meal-planner
git checkout develop
git checkout -b feature/search-filters
```

### 4. Configurer les Branches de Protection

Dans GitHub :
1. Allez dans Settings > Branches
2. Ajoutez une règle pour `main` :
   - Require pull request reviews before merging
   - Require status checks to pass before merging
   - Require branches to be up to date before merging
   - Restrict pushes that create files larger than 100MB

3. Ajoutez une règle pour `develop` :
   - Require pull request reviews before merging
   - Require status checks to pass before merging

### 5. Créer les Issues et Milestones

#### Issues Principales
- [ ] Configuration Firebase complète
- [ ] Tests unitaires et d'intégration
- [ ] Optimisation des performances
- [ ] Documentation API
- [ ] Déploiement en production

#### Milestones
- **v1.0.0** - Version initiale (MVP)
- **v1.1.0** - Fonctionnalités avancées
- **v1.2.0** - Optimisations et améliorations

### 6. Configuration des Hooks Git

```bash
# Créer le dossier hooks
mkdir -p .git/hooks

# Pre-commit hook pour linting
cat > .git/hooks/pre-commit << 'EOF'
#!/bin/bash
npm run lint
if [ $? -ne 0 ]; then
  echo "❌ Linting failed. Please fix errors before committing."
  exit 1
fi
echo "✅ Linting passed"
EOF

chmod +x .git/hooks/pre-commit
```

### 7. Scripts de Développement

```bash
# Créer une nouvelle feature
./scripts/new-feature.sh "nom-feature"

# Créer une hotfix
./scripts/new-hotfix.sh "nom-hotfix"

# Préparer une release
./scripts/prepare-release.sh "v1.0.0"
```

## 🔄 Workflow Quotidien

### Développement d'une Feature
```bash
# 1. Synchroniser avec develop
git checkout develop
git pull origin develop

# 2. Créer la branche feature
git checkout -b feature/nom-feature

# 3. Développer et commiter
git add .
git commit -m "feat: description"

# 4. Pousser la branche
git push -u origin feature/nom-feature

# 5. Créer Pull Request sur GitHub
```

### Review et Merge
1. Créer Pull Request
2. Assigner des reviewers
3. Attendre les approbations
4. Merge vers develop
5. Supprimer la branche feature

### Release
```bash
# 1. Créer branche release
git checkout -b release/v1.0.0

# 2. Mettre à jour version
npm version 1.0.0

# 3. Merge vers main
git checkout main
git merge release/v1.0.0

# 4. Créer tag
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0

# 5. Merge vers develop
git checkout develop
git merge release/v1.0.0
```

## 📊 Monitoring et Métriques

### Dashboard GitHub
- Pull Requests ouvertes/fermées
- Issues résolues
- Temps de review moyen
- Taux de bugs en production

### Métriques de Code
- Couverture de tests
- Complexité cyclomatique
- Duplication de code
- Dette technique

## 🛡️ Sécurité

### Secrets et Variables
- Configurer les secrets GitHub
- Variables d'environnement sécurisées
- Clés API protégées
- Tokens d'accès limités

### Audit de Sécurité
- Dependabot activé
- Scan de vulnérabilités
- Mise à jour des dépendances
- Review de sécurité

## 📚 Documentation

### README Principal
- Installation et configuration
- Guide de développement
- Contribution guidelines
- Changelog

### Documentation Technique
- Architecture du projet
- API documentation
- Design system
- Tests et déploiement
