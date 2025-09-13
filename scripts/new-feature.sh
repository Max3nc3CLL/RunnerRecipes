#!/bin/bash

# Script pour créer une nouvelle branche feature
# Usage: ./scripts/new-feature.sh "nom-feature"

if [ $# -eq 0 ]; then
    echo "❌ Usage: ./scripts/new-feature.sh \"nom-feature\""
    echo "   Exemple: ./scripts/new-feature.sh \"user-profiles\""
    exit 1
fi

FEATURE_NAME=$1
BRANCH_NAME="feature/$FEATURE_NAME"

echo "🌿 Création de la branche feature: $BRANCH_NAME"

# Vérifier qu'on est sur develop
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "develop" ]; then
    echo "⚠️  Basculement vers develop..."
    git checkout develop
fi

# Synchroniser avec origin
echo "🔄 Synchronisation avec origin/develop..."
git pull origin develop

# Créer la nouvelle branche
echo "✨ Création de la branche $BRANCH_NAME..."
git checkout -b "$BRANCH_NAME"

# Pousser la branche
echo "📤 Poussée de la branche vers origin..."
git push -u origin "$BRANCH_NAME"

echo "✅ Branche $BRANCH_NAME créée et poussée avec succès!"
echo "🚀 Vous pouvez maintenant développer votre fonctionnalité"
echo "📝 N'oubliez pas de créer une Pull Request quand vous êtes prêt"
