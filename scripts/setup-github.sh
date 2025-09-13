#!/bin/bash

# Script pour configurer le repository GitHub
# Usage: ./scripts/setup-github.sh "votre-username"

if [ $# -eq 0 ]; then
    echo "❌ Usage: ./scripts/setup-github.sh \"votre-username\""
    echo "   Exemple: ./scripts/setup-github.sh \"maxencecailleau\""
    exit 1
fi

USERNAME=$1
REPO_NAME="runner-recipes"
REPO_URL="https://github.com/$USERNAME/$REPO_NAME.git"

echo "🚀 Configuration du repository GitHub: $REPO_URL"

# Vérifier si le remote origin existe déjà
if git remote get-url origin >/dev/null 2>&1; then
    echo "⚠️  Le remote origin existe déjà. Suppression..."
    git remote remove origin
fi

# Ajouter le remote origin
echo "🔗 Ajout du remote origin..."
git remote add origin "$REPO_URL"

# Vérifier la connexion
echo "🔍 Vérification de la connexion..."
if ! git ls-remote origin >/dev/null 2>&1; then
    echo "❌ Erreur: Impossible de se connecter au repository GitHub"
    echo "   Vérifiez que le repository existe et que vous avez les droits d'accès"
    echo "   URL: $REPO_URL"
    exit 1
fi

echo "✅ Connexion au repository GitHub réussie!"

# Pousser la branche main
echo "📤 Poussée de la branche main..."
git push -u origin main

# Pousser la branche develop
echo "📤 Poussée de la branche develop..."
git push -u origin develop

# Pousser les branches de fonctionnalités
echo "📤 Poussée des branches de fonctionnalités..."
git push -u origin feature/user-profiles
git push -u origin feature/meal-planner
git push -u origin feature/search-filters

# Pousser le tag
echo "🏷️  Poussée du tag v1.0.0..."
git push origin v1.0.0

echo ""
echo "🎉 Configuration GitHub terminée avec succès!"
echo "🌐 Votre repository est maintenant disponible sur:"
echo "   $REPO_URL"
echo ""
echo "📋 Prochaines étapes:"
echo "   1. Allez sur GitHub et configurez les protections de branches"
echo "   2. Créez des Issues et Milestones"
echo "   3. Configurez les secrets pour Firebase"
echo "   4. Commencez le développement sur les features!"
