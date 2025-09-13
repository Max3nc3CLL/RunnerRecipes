// Composant RecipeCard pour afficher une recette
import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Chip,
  Box,
  Tooltip,
} from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
  AccessTime,
  People,
  Timer,
} from '@mui/icons-material';
import RatingStars from './RatingStars';
import { Recipe } from '../types';
import { RECIPE_CATEGORIES, DIFFICULTY_LEVELS } from '../constants';

interface RecipeCardProps {
  recipe: Recipe;
  onToggleFavorite?: (recipeId: string) => void;
  onCardClick?: (recipeId: string) => void;
  showFavoriteButton?: boolean;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  onToggleFavorite,
  onCardClick,
  showFavoriteButton = true,
}) => {

  const category = RECIPE_CATEGORIES.find(cat => cat.id === recipe.category.id);
  const difficulty = DIFFICULTY_LEVELS.find(level => level.value === recipe.difficulty);

  const handleCardClick = () => {
    if (onCardClick) {
      onCardClick(recipe.id);
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(recipe.id);
    }
  };

  const formatTime = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes}min`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h${mins}min` : `${hours}h`;
  };


  return (
    <Card
      className="animate-fade-in-up"
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        background: 'white',
        borderRadius: '20px',
        boxShadow: '0 4px 40px rgba(38, 39, 48, 0.08)',
        border: '1px solid rgba(38, 39, 48, 0.06)',
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 20px 60px rgba(38, 39, 48, 0.15)',
        },
      }}
      onClick={handleCardClick}
    >
      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
        <CardMedia
          component="img"
          height="200"
          image={recipe.imageUrl}
          alt={recipe.title}
          sx={{
            objectFit: 'cover',
            transition: 'transform 0.3s ease-in-out',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
        />
        
        {/* Overlay gradient subtil */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.1) 100%)',
            pointerEvents: 'none',
          }}
        />
        
        {/* Badge de catégorie */}
        {category && (
          <Chip
            label={category.name}
            size="small"
            sx={{
              position: 'absolute',
              top: 12,
              left: 12,
              background: 'linear-gradient(135deg, #F98807 0%, #FFB231 100%)',
              color: 'white',
              fontWeight: 600,
              fontSize: '0.75rem',
              borderRadius: '50px',
              boxShadow: '0 2px 12px rgba(249, 136, 7, 0.25)',
              backdropFilter: 'blur(10px)',
            }}
          />
        )}

        {/* Badge de difficulté */}
        {difficulty && (
          <Chip
            label={difficulty.label}
            size="small"
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              background: 'rgba(38, 39, 48, 0.8)',
              color: 'white',
              fontWeight: 600,
              fontSize: '0.75rem',
              borderRadius: '50px',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          />
        )}

        {/* Bouton favori */}
        {showFavoriteButton && (
          <IconButton
            sx={{
              position: 'absolute',
              bottom: 12,
              right: 12,
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              borderRadius: '50%',
              width: 40,
              height: 40,
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              transition: 'all 0.2s ease',
              '&:hover': {
                background: 'rgba(255, 255, 255, 1)',
                transform: 'scale(1.1)',
                boxShadow: '0 6px 25px rgba(0, 0, 0, 0.15)',
              },
            }}
            onClick={handleFavoriteClick}
          >
            {recipe.isFavorite ? (
              <Favorite sx={{ color: '#F98807', fontSize: '20px' }} />
            ) : (
              <FavoriteBorder sx={{ color: '#6C738B', fontSize: '20px' }} />
            )}
          </IconButton>
        )}
      </Box>

      <CardContent sx={{ flexGrow: 1, pb: 1, px: 3, pt: 3 }}>
        <Typography
          variant="h6"
          component="h3"
          sx={{
            fontWeight: 700,
            mb: 1.5,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            lineHeight: 1.3,
            color: '#262730',
            fontSize: '18px',
          }}
        >
          {recipe.title}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            mb: 2.5,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            lineHeight: 1.5,
            color: '#565B73',
            fontSize: '14px',
          }}
        >
          {recipe.shortDescription}
        </Typography>

        {/* Informations nutritionnelles */}
        <Box sx={{ mb: 2.5 }}>
          <Chip
            label={`${recipe.nutrition.caloriesPerServing} cal`}
            size="small"
            sx={{
              background: 'linear-gradient(135deg, #F98807 0%, #FFB231 100%)',
              color: 'white',
              fontWeight: 600,
              mr: 1,
              mb: 1,
              borderRadius: '50px',
              boxShadow: '0 2px 12px rgba(249, 136, 7, 0.25)',
              fontSize: '12px',
            }}
          />
          <Chip
            label={`${recipe.nutrition.macronutrients.carbohydrates}g glucides`}
            size="small"
            variant="outlined"
            sx={{ 
              mr: 1, 
              mb: 1,
              borderRadius: '50px',
              borderColor: 'rgba(38, 39, 48, 0.12)',
              color: '#474A5D',
              backgroundColor: 'rgba(38, 39, 48, 0.04)',
              fontSize: '12px',
            }}
          />
          <Chip
            label={`${recipe.nutrition.macronutrients.proteins}g protéines`}
            size="small"
            variant="outlined"
            sx={{ 
              mb: 1,
              borderRadius: '50px',
              borderColor: 'rgba(38, 39, 48, 0.12)',
              color: '#474A5D',
              backgroundColor: 'rgba(38, 39, 48, 0.04)',
              fontSize: '12px',
            }}
          />
        </Box>

        {/* Tags */}
        {recipe.tags.length > 0 && (
          <Box sx={{ mb: 2 }}>
            {recipe.tags.slice(0, 3).map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                variant="outlined"
                sx={{ 
                  mr: 0.5, 
                  mb: 0.5, 
                  fontSize: '11px',
                  borderRadius: '50px',
                  borderColor: 'rgba(38, 39, 48, 0.12)',
                  color: '#6C738B',
                  backgroundColor: 'rgba(38, 39, 48, 0.04)',
                  height: '24px',
                }}
              />
            ))}
            {recipe.tags.length > 3 && (
              <Chip
                label={`+${recipe.tags.length - 3}`}
                size="small"
                variant="outlined"
                sx={{ 
                  fontSize: '11px',
                  borderRadius: '50px',
                  borderColor: 'rgba(38, 39, 48, 0.12)',
                  color: '#6C738B',
                  backgroundColor: 'rgba(38, 39, 48, 0.04)',
                  height: '24px',
                }}
              />
            )}
          </Box>
        )}
      </CardContent>

      <CardActions sx={{ px: 3, pb: 3, pt: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5, width: '100%' }}>
          {/* Temps de préparation */}
          <Tooltip title="Temps de préparation">
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 0.5,
              padding: '6px 12px',
              borderRadius: '20px',
              background: 'rgba(38, 39, 48, 0.06)',
              transition: 'all 0.2s ease',
              '&:hover': {
                background: 'rgba(38, 39, 48, 0.08)',
              },
            }}>
              <AccessTime fontSize="small" sx={{ color: '#6C738B' }} />
              <Typography variant="caption" sx={{ color: '#565B73', fontWeight: 500, fontSize: '12px' }}>
                {formatTime(recipe.prepTime)}
              </Typography>
            </Box>
          </Tooltip>

          {/* Temps de cuisson */}
          <Tooltip title="Temps de cuisson">
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 0.5,
              padding: '6px 12px',
              borderRadius: '20px',
              background: 'rgba(38, 39, 48, 0.06)',
              transition: 'all 0.2s ease',
              '&:hover': {
                background: 'rgba(38, 39, 48, 0.08)',
              },
            }}>
              <Timer fontSize="small" sx={{ color: '#6C738B' }} />
              <Typography variant="caption" sx={{ color: '#565B73', fontWeight: 500, fontSize: '12px' }}>
                {formatTime(recipe.cookTime)}
              </Typography>
            </Box>
          </Tooltip>

          {/* Nombre de portions */}
          <Tooltip title="Nombre de portions">
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 0.5,
              padding: '6px 12px',
              borderRadius: '20px',
              background: 'rgba(38, 39, 48, 0.06)',
              transition: 'all 0.2s ease',
              '&:hover': {
                background: 'rgba(38, 39, 48, 0.08)',
              },
            }}>
              <People fontSize="small" sx={{ color: '#6C738B' }} />
              <Typography variant="caption" sx={{ color: '#565B73', fontWeight: 500, fontSize: '12px' }}>
                {recipe.servings}
              </Typography>
            </Box>
          </Tooltip>

          {/* Note */}
          <Box sx={{ 
            ml: 'auto',
            padding: '6px 12px',
            borderRadius: '20px',
            background: 'rgba(249, 136, 7, 0.1)',
            transition: 'all 0.2s ease',
            '&:hover': {
              background: 'rgba(249, 136, 7, 0.15)',
            },
          }}>
            <RatingStars
              rating={recipe.rating}
              size="small"
              showValue={true}
              showCount={true}
              reviewCount={recipe.reviewCount}
            />
          </Box>
        </Box>
      </CardActions>
    </Card>
  );
};

export default RecipeCard;
