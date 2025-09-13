// Composant de carte macro-nutriments moderne
import React from 'react';
import { Box, Typography } from '@mui/material';

interface MacroCardProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  unit?: string;
  color?: 'primary' | 'success' | 'info' | 'warning' | 'purple';
  className?: string;
}

const MacroCard: React.FC<MacroCardProps> = ({
  icon,
  value,
  label,
  unit = '',
  color = 'primary',
  className = '',
}) => {
  const getColorStyles = () => {
    switch (color) {
      case 'primary':
        return {
          background: 'linear-gradient(135deg, #F98807 0%, #FFB231 100%)',
          shadow: '0 4px 20px rgba(249, 136, 7, 0.3)',
        };
      case 'success':
        return {
          background: 'linear-gradient(135deg, #4ADE80 0%, #22C55E 100%)',
          shadow: '0 4px 20px rgba(74, 222, 128, 0.3)',
        };
      case 'info':
        return {
          background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
          shadow: '0 4px 20px rgba(59, 130, 246, 0.3)',
        };
      case 'warning':
        return {
          background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
          shadow: '0 4px 20px rgba(245, 158, 11, 0.3)',
        };
      case 'purple':
        return {
          background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
          shadow: '0 4px 20px rgba(139, 92, 246, 0.3)',
        };
      default:
        return {
          background: 'linear-gradient(135deg, #F98807 0%, #FFB231 100%)',
          shadow: '0 4px 20px rgba(249, 136, 7, 0.3)',
        };
    }
  };

  const colorStyles = getColorStyles();

  return (
    <Box
      className={`macro-card animate-scale-in ${className}`}
      sx={{
        background: colorStyles.background,
        borderRadius: '20px',
        padding: '24px',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: colorStyles.shadow,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: colorStyles.shadow.replace('0.3', '0.4'),
        },
      }}
    >
      {/* Effet de décoration */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 80,
          height: 80,
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
          transform: 'translate(30px, -30px)',
        }}
      />
      
      {/* Icône */}
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: '16px',
          background: 'rgba(255, 255, 255, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '16px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {icon}
      </Box>

      {/* Valeur */}
      <Typography
        variant="h3"
        sx={{
          fontWeight: 800,
          marginBottom: '8px',
          position: 'relative',
          zIndex: 1,
          fontSize: '32px',
          lineHeight: 1,
        }}
      >
        {value}
        {unit && (
          <Typography
            component="span"
            sx={{
              fontSize: '18px',
              fontWeight: 600,
              opacity: 0.8,
              marginLeft: '4px',
            }}
          >
            {unit}
          </Typography>
        )}
      </Typography>

      {/* Label */}
      <Typography
        variant="body1"
        sx={{
          fontWeight: 600,
          opacity: 0.9,
          position: 'relative',
          zIndex: 1,
          fontSize: '16px',
        }}
      >
        {label}
      </Typography>
    </Box>
  );
};

export default MacroCard;
