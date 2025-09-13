// Composant de système de notation moderne
import React from 'react';
import { Box, Typography } from '@mui/material';
import { Star, StarBorder } from '@mui/icons-material';

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  size?: 'small' | 'medium' | 'large';
  showValue?: boolean;
  showCount?: boolean;
  reviewCount?: number;
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
  className?: string;
}

const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  maxRating = 5,
  size = 'medium',
  showValue = true,
  showCount = false,
  reviewCount = 0,
  interactive = false,
  onRatingChange,
  className = '',
}) => {
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          starSize: 16,
          fontSize: '12px',
          gap: 1,
        };
      case 'medium':
        return {
          starSize: 20,
          fontSize: '14px',
          gap: 1.5,
        };
      case 'large':
        return {
          starSize: 24,
          fontSize: '16px',
          gap: 2,
        };
      default:
        return {
          starSize: 20,
          fontSize: '14px',
          gap: 1.5,
        };
    }
  };

  const sizeStyles = getSizeStyles();
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = maxRating - filledStars - (hasHalfStar ? 1 : 0);

  const handleStarClick = (starIndex: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(starIndex + 1);
    }
  };

  return (
    <Box
      className={`rating-stars ${className}`}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: sizeStyles.gap,
      }}
    >
      {/* Étoiles */}
      <Box
        sx={{
          display: 'flex',
          gap: 0.5,
          alignItems: 'center',
        }}
      >
        {/* Étoiles pleines */}
        {Array.from({ length: filledStars }, (_, index) => (
          <Star
            key={`filled-${index}`}
            sx={{
              width: sizeStyles.starSize,
              height: sizeStyles.starSize,
              color: '#FFB231',
              filter: 'drop-shadow(0 1px 3px rgba(249, 136, 7, 0.3))',
              cursor: interactive ? 'pointer' : 'default',
              transition: 'all 0.2s ease',
              '&:hover': interactive ? {
                transform: 'scale(1.1)',
                filter: 'drop-shadow(0 2px 6px rgba(249, 136, 7, 0.5))',
              } : {},
            }}
            onClick={() => handleStarClick(index)}
          />
        ))}

        {/* Demi-étoile */}
        {hasHalfStar && (
          <Box
            sx={{
              position: 'relative',
              width: sizeStyles.starSize,
              height: sizeStyles.starSize,
              cursor: interactive ? 'pointer' : 'default',
            }}
            onClick={() => handleStarClick(filledStars)}
          >
            <StarBorder
              sx={{
                width: sizeStyles.starSize,
                height: sizeStyles.starSize,
                color: '#D7D9E0',
                position: 'absolute',
                top: 0,
                left: 0,
              }}
            />
            <Star
              sx={{
                width: sizeStyles.starSize,
                height: sizeStyles.starSize,
                color: '#FFB231',
                filter: 'drop-shadow(0 1px 3px rgba(249, 136, 7, 0.3))',
                position: 'absolute',
                top: 0,
                left: 0,
                clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)',
              }}
            />
          </Box>
        )}

        {/* Étoiles vides */}
        {Array.from({ length: emptyStars }, (_, index) => (
          <StarBorder
            key={`empty-${index}`}
            sx={{
              width: sizeStyles.starSize,
              height: sizeStyles.starSize,
              color: '#D7D9E0',
              cursor: interactive ? 'pointer' : 'default',
              transition: 'all 0.2s ease',
              '&:hover': interactive ? {
                transform: 'scale(1.1)',
                color: '#FFB231',
              } : {},
            }}
            onClick={() => handleStarClick(filledStars + (hasHalfStar ? 1 : 0) + index)}
          />
        ))}
      </Box>

      {/* Valeur numérique */}
      {showValue && (
        <Typography
          variant="body2"
          sx={{
            fontSize: sizeStyles.fontSize,
            fontWeight: 600,
            color: '#B74206',
            minWidth: 'fit-content',
          }}
        >
          {rating.toFixed(1)}
        </Typography>
      )}

      {/* Nombre d'avis */}
      {showCount && reviewCount > 0 && (
        <Typography
          variant="body2"
          sx={{
            fontSize: sizeStyles.fontSize,
            fontWeight: 500,
            color: '#6C738B',
            minWidth: 'fit-content',
          }}
        >
          ({reviewCount})
        </Typography>
      )}
    </Box>
  );
};

export default RatingStars;
