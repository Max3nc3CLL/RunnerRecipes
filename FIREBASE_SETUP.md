# 🔥 Configuration Firebase pour Runner Recipes

## 📋 Étapes de Configuration

### 1. Créer un Projet Firebase

1. Allez sur [Firebase Console](https://console.firebase.google.com/)
2. Cliquez sur "Créer un projet"
3. Nommez votre projet : `runner-recipes` (ou le nom de votre choix)
4. Activez Google Analytics (optionnel)

### 2. Configurer l'Authentification

1. Dans le menu de gauche, cliquez sur "Authentication"
2. Cliquez sur "Commencer"
3. Allez dans l'onglet "Sign-in method"
4. Activez "Google" comme fournisseur
5. Configurez l'écran de consentement OAuth si nécessaire

### 3. Obtenir les Clés de Configuration

1. Allez dans "Paramètres du projet" (icône d'engrenage)
2. Cliquez sur "Configuration du projet"
3. Dans la section "Vos applications", cliquez sur l'icône Web
4. Enregistrez votre application avec le nom "Runner Recipes Web"
5. Copiez les valeurs de configuration

### 4. Créer le Fichier .env.local

Créez un fichier `.env.local` à la racine du projet avec :

```env
# Configuration Firebase
REACT_APP_FIREBASE_API_KEY=votre_api_key_ici
REACT_APP_FIREBASE_AUTH_DOMAIN=votre_project_id.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=votre_project_id_ici
REACT_APP_FIREBASE_STORAGE_BUCKET=votre_project_id.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=votre_messaging_sender_id_ici
REACT_APP_FIREBASE_APP_ID=votre_app_id_ici
REACT_APP_FIREBASE_MEASUREMENT_ID=votre_measurement_id_ici

# Configuration Google OAuth (optionnel)
REACT_APP_GOOGLE_CLIENT_ID=votre_google_client_id_ici
```

### 5. Configurer les Domaines Autorisés

1. Dans Firebase Console > Authentication > Settings
2. Ajoutez vos domaines autorisés :
   - `localhost` (pour le développement)
   - Votre domaine de production

### 6. Tester la Connexion

1. Redémarrez votre serveur de développement : `npm start`
2. Allez sur `http://localhost:3000/login`
3. Cliquez sur "Continuer avec Google"
4. Testez la connexion/déconnexion

## 🛠️ Fonctionnalités Implémentées

- ✅ **Connexion Google** avec popup
- ✅ **Gestion des états** (chargement, erreurs)
- ✅ **Interface moderne** avec design system
- ✅ **Responsive** (desktop et mobile)
- ✅ **Gestion des profils** utilisateur
- ✅ **Déconnexion** sécurisée
- ✅ **Persistance** des sessions

## 🔧 Dépannage

### Erreur "Firebase: Error (auth/unauthorized-domain)"
- Vérifiez que `localhost` est dans les domaines autorisés
- Redémarrez le serveur après modification

### Erreur "Firebase: Error (auth/popup-closed-by-user)"
- L'utilisateur a fermé la popup, c'est normal
- Aucune action requise

### Erreur de configuration
- Vérifiez que toutes les variables d'environnement sont correctes
- Assurez-vous que le fichier `.env.local` est à la racine du projet

## 📱 Pages Disponibles

- `/login` - Page de connexion dédiée
- Header - Bouton de connexion intégré
- Menu mobile - Connexion responsive

## 🎨 Design

Le composant de connexion utilise le design system moderne :
- **Couleurs** : Palette orange énergétique
- **Animations** : Transitions fluides
- **Responsive** : Adapté mobile et desktop
- **Accessibilité** : Labels et états clairs
