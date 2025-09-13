#!/bin/bash

# Script pour préparer une release
# Usage: ./scripts/prepare-release.sh "v1.0.0"

if [ $# -eq 0 ]; then
    echo "❌ Usage: ./scripts/prepare-release.sh \"v1.0.0\""
    echo "   Exemple: ./scripts/prepare-release.sh \"v1.2.0\""
    exit 1
fi

VERSION=$1
RELEASE_BRANCH="release/$VERSION"

echo "🚀 Préparation de la release: $VERSION"

# Vérifier qu'on est sur develop
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "develop" ]; then
    echo "⚠️  Basculement vers develop..."
    git checkout develop
fi

# Synchroniser avec origin
echo "🔄 Synchronisation avec origin/develop..."
git pull origin develop

# Créer la branche release
echo "✨ Création de la branche $RELEASE_BRANCH..."
git checkout -b "$RELEASE_BRANCH"

# Mettre à jour la version dans package.json
echo "📦 Mise à jour de la version dans package.json..."
npm version "$VERSION" --no-git-tag-version

# Commiter les changements de version
git add package.json package-lock.json
git commit -m "chore: bump version to $VERSION"

# Pousser la branche
echo "📤 Poussée de la branche vers origin..."
git push -u origin "$RELEASE_BRANCH"

echo "✅ Branche release $VERSION créée et poussée avec succès!"
echo "🧪 Vous pouvez maintenant tester la release"
echo "📝 Créez une Pull Request vers main quand les tests sont OK"
echo "🏷️  N'oubliez pas de créer le tag $VERSION après le merge"
