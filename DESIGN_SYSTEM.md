# 🎨 Système de Design Moderne - Runner Recipes

## Vue d'ensemble

Ce système de design moderne a été créé pour Runner Recipes avec une approche cohérente, moderne et accessible. Il utilise une palette de couleurs énergétiques inspirée du sport et de la nutrition, avec des composants réutilisables et des animations fluides.

## 🎨 Palette de Couleurs

### Couleurs Primaires (Oranges Énergétiques)
- **Primary 500**: `#F98807` - Orange principal
- **Primary 400**: `#FFB231` - Orange clair
- **Primary 300**: `#FFC44A` - Orange très clair
- **Primary 600**: `#E67E00` - Orange foncé (hover)
- **Primary 700**: `#B74206` - Orange très foncé (textes)

### Couleurs Neutres (Grises Sophistiquées)
- **Neutral 950**: `#262730` - Textes principaux
- **Neutral 900**: `#363844` - Textes secondaires
- **Neutral 800**: `#3D404F` - Textes tertiaires
- **Neutral 700**: `#474A5D` - Textes de corps
- **Neutral 600**: `#565B73` - Textes secondaires
- **Neutral 500**: `#6C738B` - Textes de légende
- **Neutral 400**: `#8A8FA6` - Bordures
- **Neutral 300**: `#B3B7C6` - Bordures claires
- **Neutral 200**: `#D7D9E0` - Arrière-plans subtils
- **Neutral 100**: `#EDEDF1` - Arrière-plans
- **Neutral 50**: `#F6F7F9` - Arrière-plan principal
- **White**: `#FFFFFF` - Blanc pur

### Couleur Accent (Vert Nature)
- **Success**: `#4ADE80` - Vert succès
- **Success Dark**: `#22C55E` - Vert foncé

## 📝 Typography

### Hiérarchie
- **H1**: 48px, font-weight: 800, line-height: 1.1
- **H2**: 36px, font-weight: 700, line-height: 1.2
- **H3**: 24px, font-weight: 600, line-height: 1.3
- **H4**: 20px, font-weight: 600, line-height: 1.4
- **Body**: 16px, font-weight: 400, line-height: 1.6
- **Small**: 14px, font-weight: 400, line-height: 1.5
- **Caption**: 12px, font-weight: 400, line-height: 1.5

### Police
- **Font Family**: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif

## 🧩 Composants

### ModernButton
Bouton moderne avec plusieurs variantes et tailles.

```tsx
<ModernButton variant="primary" size="medium" icon={<Icon />}>
  Bouton
</ModernButton>
```

**Variantes disponibles :**
- `primary` - Bouton principal avec gradient orange
- `secondary` - Bouton secondaire gris
- `success` - Bouton succès vert
- `outline` - Bouton avec bordure
- `ghost` - Bouton transparent

**Tailles :**
- `small` - 36px de hauteur
- `medium` - 44px de hauteur (défaut)
- `large` - 52px de hauteur

### MacroCard
Carte pour afficher les macro-nutriments avec icône et gradient.

```tsx
<MacroCard
  icon={<LocalFireDepartment />}
  value={2500}
  label="Calories"
  unit="cal"
  color="primary"
/>
```

**Couleurs disponibles :**
- `primary` - Orange
- `success` - Vert
- `info` - Bleu
- `warning` - Jaune
- `purple` - Violet

### RatingStars
Système de notation avec étoiles interactives.

```tsx
<RatingStars
  rating={4.5}
  size="medium"
  showValue={true}
  showCount={true}
  reviewCount={24}
  interactive={false}
/>
```

### AnimatedWrapper
Wrapper pour les animations au scroll.

```tsx
<AnimatedWrapper animation="fadeInUp" delay={200}>
  <Component />
</AnimatedWrapper>
```

**Animations disponibles :**
- `fadeInUp` - Apparition depuis le bas
- `fadeIn` - Apparition simple
- `scaleIn` - Apparition avec zoom
- `slideInRight` - Glissement depuis la droite
- `slideInLeft` - Glissement depuis la gauche
- `bounceIn` - Apparition avec rebond

## 🎭 Animations

### Classes CSS d'animation
- `.animate-fade-in-up` - Apparition depuis le bas
- `.animate-fade-in` - Apparition simple
- `.animate-scale-in` - Apparition avec zoom
- `.animate-slide-in-right` - Glissement depuis la droite
- `.animate-slide-in-left` - Glissement depuis la gauche
- `.animate-bounce-in` - Apparition avec rebond
- `.animate-pulse` - Pulsation continue
- `.animate-float` - Flottement
- `.animate-glow` - Effet de lueur

### Effets hover
- `.hover-lift` - Élévation au survol
- `.hover-scale` - Agrandissement au survol
- `.hover-glow` - Lueur au survol

### Micro-interactions
- `.micro-bounce` - Rebond au clic
- `.micro-ripple` - Effet de vague au clic

## 📐 Espacement

Système d'espacement cohérent basé sur des multiples de 4px :
- `--spacing-1`: 4px
- `--spacing-2`: 8px
- `--spacing-3`: 12px
- `--spacing-4`: 16px
- `--spacing-6`: 24px
- `--spacing-8`: 32px
- `--spacing-12`: 48px
- `--spacing-16`: 64px
- `--spacing-20`: 80px
- `--spacing-24`: 96px

## 🔄 Transitions

- `--transition-fast`: 0.15s ease
- `--transition-normal`: 0.2s ease
- `--transition-slow`: 0.3s ease
- `--transition-bounce`: 0.3s cubic-bezier(0.4, 0, 0.2, 1)

## 📱 Responsive

Breakpoints définis :
- `--breakpoint-sm`: 640px
- `--breakpoint-md`: 768px
- `--breakpoint-lg`: 1024px
- `--breakpoint-xl`: 1280px
- `--breakpoint-2xl`: 1536px

## 🎯 Utilisation

### Import du système de design
```tsx
import './styles/design-system.css';
```

### Utilisation des variables CSS
```css
.my-component {
  color: var(--color-primary-500);
  padding: var(--spacing-4);
  border-radius: var(--radius-lg);
  transition: var(--transition-normal);
}
```

### Utilisation des classes d'animation
```tsx
<div className="animate-fade-in-up hover-lift">
  Contenu animé
</div>
```

## 🚀 Exemple complet

```tsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import ModernButton from './components/ModernButton';
import MacroCard from './components/MacroCard';
import AnimatedWrapper from './components/AnimatedWrapper';

const MyComponent = () => {
  return (
    <AnimatedWrapper animation="fadeInUp">
      <Box sx={{ p: 4 }}>
        <Typography variant="h2" sx={{ mb: 3, color: 'var(--color-neutral-950)' }}>
          Mon Titre
        </Typography>
        
        <MacroCard
          icon={<LocalFireDepartment />}
          value={2500}
          label="Calories"
          unit="cal"
          color="primary"
        />
        
        <ModernButton variant="primary" size="large">
          Mon Bouton
        </ModernButton>
      </Box>
    </AnimatedWrapper>
  );
};
```

## 📋 Checklist d'implémentation

- [x] Palette de couleurs définie
- [x] Typography moderne
- [x] Système d'espacement cohérent
- [x] Composants réutilisables
- [x] Animations fluides
- [x] Effets hover sophistiqués
- [x] Responsive design
- [x] Accessibilité
- [x] Documentation complète

Ce système de design garantit une expérience utilisateur cohérente et moderne sur l'ensemble de l'application Runner Recipes.
