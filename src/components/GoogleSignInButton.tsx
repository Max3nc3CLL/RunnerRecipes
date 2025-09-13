// Composant de connexion Google avec design moderne
import React, { useState } from 'react';
import { Button, Box, CircularProgress, Typography } from '@mui/material';
import { Google as GoogleIcon } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

interface GoogleSignInButtonProps {
  variant?: 'contained' | 'outlined' | 'text';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({
  variant = 'contained',
  size = 'medium',
  fullWidth = false,
  onSuccess,
  onError,
}) => {
  const { signIn, loading } = useAuth();
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      setIsSigningIn(true);
      await signIn();
      onSuccess?.();
    } catch (error) {
      console.error('Erreur de connexion Google:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erreur de connexion';
      onError?.(errorMessage);
    } finally {
      setIsSigningIn(false);
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
      case 'large':
        return {
          padding: '16px 32px',
          fontSize: '18px',
          minHeight: '56px',
        };
      default:
        return {
          padding: '12px 24px',
          fontSize: '16px',
          minHeight: '48px',
        };
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'outlined':
        return {
          background: 'white',
          border: '2px solid #E5E7EB',
          color: '#374151',
          '&:hover': {
            background: '#F9FAFB',
            borderColor: '#D1D5DB',
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          },
        };
      case 'text':
        return {
          background: 'transparent',
          border: 'none',
          color: '#6B7280',
          '&:hover': {
            background: 'rgba(107, 114, 128, 0.1)',
            color: '#374151',
          },
        };
      default:
        return {
          background: 'linear-gradient(135deg, #F98807 0%, #FFB231 100%)',
          border: 'none',
          color: 'white',
          boxShadow: '0 4px 20px rgba(249, 136, 7, 0.3)',
          '&:hover': {
            background: 'linear-gradient(135deg, #E67E00 0%, #F98807 100%)',
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 30px rgba(249, 136, 7, 0.4)',
          },
        };
    }
  };

  return (
    <Button
      variant={variant}
      fullWidth={fullWidth}
      onClick={handleGoogleSignIn}
      disabled={loading || isSigningIn}
      sx={{
        ...getSizeStyles(),
        ...getVariantStyles(),
        borderRadius: '16px',
        fontWeight: 600,
        textTransform: 'none',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        overflow: 'hidden',
        '&:disabled': {
          opacity: 0.6,
          transform: 'none',
        },
        '&:active': {
          transform: 'translateY(0)',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {loading || isSigningIn ? (
          <CircularProgress 
            size={20} 
            sx={{ 
              color: variant === 'contained' ? 'white' : '#F98807',
            }} 
          />
        ) : (
          <GoogleIcon sx={{ fontSize: 20 }} />
        )}
        
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: 'inherit',
          }}
        >
          {loading || isSigningIn ? 'Connexion...' : 'Continuer avec Google'}
        </Typography>
      </Box>
    </Button>
  );
};

export default GoogleSignInButton;
