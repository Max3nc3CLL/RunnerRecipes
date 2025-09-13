#!/bin/bash

# Script de déploiement pour Runner Recipes
# Usage: ./scripts/deploy.sh [vercel|netlify|github]

set -e

DEPLOY_TARGET=${1:-vercel}

echo "🚀 Déploiement de Runner Recipes sur $DEPLOY_TARGET"

# Vérifier que nous sommes dans le bon répertoire
if [ ! -f "package.json" ]; then
    echo "❌ Erreur: Ce script doit être exécuté depuis la racine du projet"
    exit 1
fi

# Installer les dépendances
echo "📦 Installation des dépendances..."
npm ci

# Lancer les tests
echo "🧪 Exécution des tests..."
npm test -- --coverage --watchAll=false

# Linter
echo "🔍 Vérification du code..."
npm run lint

# Build de production
echo "🏗️ Construction de l'application..."
npm run build

# Vérifier que le build a réussi
if [ ! -d "build" ]; then
    echo "❌ Erreur: Le build a échoué"
    exit 1
fi

echo "✅ Build réussi!"

# Déploiement selon la cible
case $DEPLOY_TARGET in
    vercel)
        echo "🚀 Déploiement sur Vercel..."
        if command -v vercel &> /dev/null; then
            vercel --prod
        else
            echo "❌ Vercel CLI non installé. Installez-le avec: npm i -g vercel"
            exit 1
        fi
        ;;
    netlify)
        echo "🚀 Déploiement sur Netlify..."
        if command -v netlify &> /dev/null; then
            netlify deploy --prod --dir=build
        else
            echo "❌ Netlify CLI non installé. Installez-le avec: npm i -g netlify-cli"
            exit 1
        fi
        ;;
    github)
        echo "🚀 Déploiement sur GitHub Pages..."
        if [ -z "$GITHUB_TOKEN" ]; then
            echo "❌ Variable d'environnement GITHUB_TOKEN requise"
            exit 1
        fi
        
        # Configurer Git
        git config --global user.name "Runner Recipes Bot"
        git config --global user.email "bot@runner-recipes.com"
        
        # Déployer sur gh-pages
        npm install --save-dev gh-pages
        npx gh-pages -d build
        ;;
    *)
        echo "❌ Cible de déploiement invalide: $DEPLOY_TARGET"
        echo "Usage: $0 [vercel|netlify|github]"
        exit 1
        ;;
esac

echo "🎉 Déploiement terminé avec succès!"
echo "🌐 Votre application est maintenant en ligne"
