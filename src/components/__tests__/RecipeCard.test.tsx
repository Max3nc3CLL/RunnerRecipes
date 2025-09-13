// Tests pour le composant RecipeCard
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import RecipeCard from '../RecipeCard';
import { Recipe } from '../../types';
import { RECIPE_CATEGORIES } from '../../constants';

// Mock des données de test
const mockRecipe: Recipe = {
  id: '1',
  title: 'Porridge Énergétique',
  description: 'Un porridge riche en glucides complexes',
  shortDescription: 'Porridge énergétique aux fruits',
  imageUrl: 'https://example.com/image.jpg',
  images: ['https://example.com/image.jpg'],
  category: RECIPE_CATEGORIES[0],
  difficulty: 1,
  prepTime: 5,
  cookTime: 10,
  servings: 1,
  ingredients: [
    {
      id: '1',
      name: 'Flocons d\'avoine',
      amount: 50,
      unit: 'g',
      isOptional: false,
    },
  ],
  instructions: [
    {
      id: '1',
      step: 1,
      description: 'Mélanger les ingrédients',
      timeMinutes: 5,
    },
  ],
  nutrition: {
    calories: 350,
    caloriesPerServing: 350,
    macronutrients: {
      carbohydrates: 55,
      proteins: 12,
      fats: 8,
      fiber: 8,
      sugars: 20,
    },
    micronutrients: {
      sodium: 120,
      potassium: 450,
      magnesium: 80,
      calcium: 200,
      iron: 3,
      vitaminB12: 0,
      vitaminC: 15,
      vitaminD: 0,
      vitaminE: 5,
    },
    glycemicIndex: 55,
    carbToProteinRatio: 4.6,
    hydrationScore: 6,
  },
  tags: ['pré-course', 'énergie'],
  author: {
    id: '1',
    email: 'test@example.com',
    name: 'Test User',
    sportProfile: {
      activityType: 'running',
      averageDistance: 10,
      frequency: 'regular',
      goals: 'endurance',
      weight: 70,
      height: 175,
    },
    preferences: {
      dietaryRestrictions: [],
      favoriteIngredients: [],
      dislikedIngredients: [],
      cookingSkill: 3,
      preferredMealTimes: ['breakfast'],
      servingSize: 'medium',
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  createdAt: new Date(),
  updatedAt: new Date(),
  rating: 4.5,
  reviewCount: 23,
  isFavorite: false,
};

const theme = createTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('RecipeCard', () => {
  it('affiche le titre de la recette', () => {
    renderWithTheme(<RecipeCard recipe={mockRecipe} />);
    expect(screen.getByText('Porridge Énergétique')).toBeInTheDocument();
  });

  it('affiche la description courte', () => {
    renderWithTheme(<RecipeCard recipe={mockRecipe} />);
    expect(screen.getByText('Porridge énergétique aux fruits')).toBeInTheDocument();
  });

  it('affiche les informations nutritionnelles', () => {
    renderWithTheme(<RecipeCard recipe={mockRecipe} />);
    expect(screen.getByText('350 cal')).toBeInTheDocument();
    expect(screen.getByText('55g glucides')).toBeInTheDocument();
    expect(screen.getByText('12g protéines')).toBeInTheDocument();
  });

  it('affiche le temps de préparation et de cuisson', () => {
    renderWithTheme(<RecipeCard recipe={mockRecipe} />);
    expect(screen.getByText('5min')).toBeInTheDocument();
    expect(screen.getByText('10min')).toBeInTheDocument();
  });

  it('affiche le nombre de portions', () => {
    renderWithTheme(<RecipeCard recipe={mockRecipe} />);
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('affiche la note et le nombre d\'avis', () => {
    renderWithTheme(<RecipeCard recipe={mockRecipe} />);
    expect(screen.getByText('4.5')).toBeInTheDocument();
    expect(screen.getByText('(23)')).toBeInTheDocument();
  });

  it('affiche les tags', () => {
    renderWithTheme(<RecipeCard recipe={mockRecipe} />);
    expect(screen.getByText('pré-course')).toBeInTheDocument();
    expect(screen.getByText('énergie')).toBeInTheDocument();
  });

  it('affiche le bouton favori', () => {
    renderWithTheme(<RecipeCard recipe={mockRecipe} showFavoriteButton={true} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('appelle onCardClick quand on clique sur la carte', () => {
    const mockOnCardClick = jest.fn();
    renderWithTheme(
      <RecipeCard recipe={mockRecipe} onCardClick={mockOnCardClick} />
    );
    
    fireEvent.click(screen.getByText('Porridge Énergétique'));
    expect(mockOnCardClick).toHaveBeenCalledWith('1');
  });

  it('appelle onToggleFavorite quand on clique sur le bouton favori', () => {
    const mockOnToggleFavorite = jest.fn();
    renderWithTheme(
      <RecipeCard 
        recipe={mockRecipe} 
        onToggleFavorite={mockOnToggleFavorite}
        showFavoriteButton={true}
      />
    );
    
    const favoriteButton = screen.getByRole('button');
    fireEvent.click(favoriteButton);
    expect(mockOnToggleFavorite).toHaveBeenCalledWith('1');
  });

  it('affiche l\'icône de favori correcte', () => {
    const { rerender } = renderWithTheme(
      <RecipeCard recipe={mockRecipe} showFavoriteButton={true} />
    );
    
    // Par défaut, la recette n'est pas en favori
    expect(screen.getByTestId('FavoriteBorderIcon')).toBeInTheDocument();
    
    // Rerender avec la recette en favori
    const favoriteRecipe = { ...mockRecipe, isFavorite: true };
    rerender(
      <ThemeProvider theme={theme}>
        <RecipeCard recipe={favoriteRecipe} showFavoriteButton={true} />
      </ThemeProvider>
    );
    
    expect(screen.getByTestId('FavoriteIcon')).toBeInTheDocument();
  });

  it('formate correctement le temps', () => {
    const longPrepRecipe = { ...mockRecipe, prepTime: 90, cookTime: 120 };
    renderWithTheme(<RecipeCard recipe={longPrepRecipe} />);
    
    expect(screen.getByText('1h30min')).toBeInTheDocument();
    expect(screen.getByText('2h')).toBeInTheDocument();
  });

  it('affiche la catégorie avec la bonne couleur', () => {
    renderWithTheme(<RecipeCard recipe={mockRecipe} />);
    const categoryChip = screen.getByText('Pré-entraînement');
    expect(categoryChip).toBeInTheDocument();
  });

  it('affiche le niveau de difficulté', () => {
    renderWithTheme(<RecipeCard recipe={mockRecipe} />);
    expect(screen.getByText('Très facile')).toBeInTheDocument();
  });
});
