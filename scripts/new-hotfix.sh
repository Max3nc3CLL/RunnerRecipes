#!/bin/bash

# Script pour créer une nouvelle branche hotfix
# Usage: ./scripts/new-hotfix.sh "nom-hotfix"

if [ $# -eq 0 ]; then
    echo "❌ Usage: ./scripts/new-hotfix.sh \"nom-hotfix\""
    echo "   Exemple: ./scripts/new-hotfix.sh \"fix-login-bug\""
    exit 1
fi

HOTFIX_NAME=$1
BRANCH_NAME="hotfix/$HOTFIX_NAME"

echo "🔥 Création de la branche hotfix: $BRANCH_NAME"

# Vérifier qu'on est sur main
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
    echo "⚠️  Basculement vers main..."
    git checkout main
fi

# Synchroniser avec origin
echo "🔄 Synchronisation avec origin/main..."
git pull origin main

# Créer la nouvelle branche
echo "✨ Création de la branche $BRANCH_NAME..."
git checkout -b "$BRANCH_NAME"

# Pousser la branche
echo "📤 Poussée de la branche vers origin..."
git push -u origin "$BRANCH_NAME"

echo "✅ Branche $BRANCH_NAME créée et poussée avec succès!"
echo "🚨 Vous pouvez maintenant corriger le bug urgent"
echo "📝 N'oubliez pas de créer une Pull Request vers main"
