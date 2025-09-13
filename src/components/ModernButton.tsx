// Composant de boutons modernes réutilisables
import React from 'react';
import { Button, ButtonProps, CircularProgress } from '@mui/material';

interface ModernButtonProps extends Omit<ButtonProps, 'variant'> {
  variant?: 'primary' | 'secondary' | 'success' | 'outline' | 'ghost';
  loading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const ModernButton: React.FC<ModernButtonProps> = ({
  variant = 'primary',
  loading = false,
  icon,
  children,
  fullWidth = false,
  size = 'medium',
  sx,
  disabled,
  ...props
}) => {
  const getVariantStyles = () => {
    const baseStyles = {
      borderRadius: '16px',
      fontWeight: 600,
      textTransform: 'none' as const,
      transition: 'all 0.2s ease',
      position: 'relative' as const,
      overflow: 'hidden' as const,
      '&:hover': {
        transform: 'translateY(-2px)',
      },
      '&:active': {
        transform: 'translateY(0)',
      },
      '&:disabled': {
        transform: 'none',
        opacity: 0.6,
      },
    };

    switch (variant) {
      case 'primary':
        return {
          ...baseStyles,
          background: 'linear-gradient(135deg, #F98807 0%, #FFB231 100%)',
          color: 'white',
          boxShadow: '0 4px 20px rgba(249, 136, 7, 0.3)',
          '&:hover': {
            ...baseStyles['&:hover'],
            background: 'linear-gradient(135deg, #E67E00 0%, #F98807 100%)',
            boxShadow: '0 8px 30px rgba(249, 136, 7, 0.4)',
          },
          '&:disabled': {
            ...baseStyles['&:disabled'],
            background: 'rgba(38, 39, 48, 0.12)',
            color: 'rgba(38, 39, 48, 0.38)',
            boxShadow: 'none',
          },
        };

      case 'secondary':
        return {
          ...baseStyles,
          background: 'rgba(38, 39, 48, 0.06)',
          color: '#474A5D',
          border: '1px solid rgba(38, 39, 48, 0.12)',
          '&:hover': {
            ...baseStyles['&:hover'],
            background: 'rgba(38, 39, 48, 0.08)',
            borderColor: 'rgba(38, 39, 48, 0.18)',
            color: '#262730',
          },
        };

      case 'success':
        return {
          ...baseStyles,
          background: 'linear-gradient(135deg, #4ADE80 0%, #22C55E 100%)',
          color: 'white',
          boxShadow: '0 4px 20px rgba(74, 222, 128, 0.3)',
          '&:hover': {
            ...baseStyles['&:hover'],
            background: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)',
            boxShadow: '0 8px 30px rgba(74, 222, 128, 0.4)',
          },
        };

      case 'outline':
        return {
          ...baseStyles,
          background: 'transparent',
          color: '#F98807',
          border: '2px solid #F98807',
          '&:hover': {
            ...baseStyles['&:hover'],
            background: 'rgba(249, 136, 7, 0.1)',
            borderColor: '#E67E00',
            color: '#E67E00',
          },
        };

      case 'ghost':
        return {
          ...baseStyles,
          background: 'transparent',
          color: '#6C738B',
          '&:hover': {
            ...baseStyles['&:hover'],
            background: 'rgba(38, 39, 48, 0.06)',
            color: '#262730',
          },
        };

      default:
        return baseStyles;
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          padding: '8px 16px',
          fontSize: '14px',
          minHeight: '36px',
        };
      case 'medium':
        return {
          padding: '12px 24px',
          fontSize: '16px',
          minHeight: '44px',
        };
      case 'large':
        return {
          padding: '16px 32px',
          fontSize: '18px',
          minHeight: '52px',
        };
      default:
        return {
          padding: '12px 24px',
          fontSize: '16px',
          minHeight: '44px',
        };
    }
  };

  return (
    <Button
      {...props}
      disabled={disabled || loading}
      fullWidth={fullWidth}
      sx={{
        ...getVariantStyles(),
        ...getSizeStyles(),
        ...sx,
      }}
      startIcon={
        loading ? (
          <CircularProgress size={20} sx={{ color: 'inherit' }} />
        ) : (
          icon
        )
      }
    >
      {children}
    </Button>
  );
};

export default ModernButton;
