// Page de connexion moderne
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Alert,
  Divider,
} from '@mui/material';
import {
  Restaurant,
  FitnessCenter,
  LocalFireDepartment,
} from '@mui/icons-material';
import GoogleSignInButton from '../components/GoogleSignInButton';
import { useAuth } from '../contexts/AuthContext';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate('/');
    }
  }, [isAuthenticated, loading, navigate]);

  const handleSignInSuccess = () => {
    navigate('/');
  };

  const handleSignInError = (error: string) => {
    console.error('Erreur de connexion:', error);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #F6F7F9 0%, #E5E7EB 100%)',
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <Restaurant sx={{ fontSize: 60, color: '#F98807', mb: 2 }} />
          <Typography variant="h6" sx={{ color: '#6C738B' }}>
            Chargement...
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #F6F7F9 0%, #E5E7EB 100%)',
        display: 'flex',
        alignItems: 'center',
        py: 4,
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={4} alignItems="center">
          {/* Section gauche - Présentation */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ textAlign: { xs: 'center', md: 'left' }, mb: 4 }}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  color: '#262730',
                  mb: 2,
                  fontSize: { xs: '32px', md: '48px' },
                  lineHeight: 1.1,
                }}
              >
                Bienvenue sur
                <br />
                <Box
                  component="span"
                  sx={{
                    background: 'linear-gradient(135deg, #F98807 0%, #FFB231 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Runner Recipes
                </Box>
              </Typography>
              
              <Typography
                variant="h6"
                sx={{
                  color: '#565B73',
                  mb: 4,
                  fontSize: '18px',
                  lineHeight: 1.6,
                }}
              >
                Découvrez des recettes végétariennes spécialement conçues pour 
                les coureurs et traileurs. Optimisez votre nutrition et 
                améliorez vos performances.
              </Typography>

              {/* Fonctionnalités */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '12px',
                      background: 'rgba(249, 136, 7, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Restaurant sx={{ fontSize: 20, color: '#F98807' }} />
                  </Box>
                  <Typography variant="body1" sx={{ color: '#565B73', fontWeight: 500 }}>
                    Recettes adaptées à votre sport
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '12px',
                      background: 'rgba(74, 222, 128, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <FitnessCenter sx={{ fontSize: 20, color: '#4ADE80' }} />
                  </Box>
                  <Typography variant="body1" sx={{ color: '#565B73', fontWeight: 500 }}>
                    Calculs nutritionnels précis
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '12px',
                      background: 'rgba(249, 136, 7, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <LocalFireDepartment sx={{ fontSize: 20, color: '#F98807' }} />
                  </Box>
                  <Typography variant="body1" sx={{ color: '#565B73', fontWeight: 500 }}>
                    Suivi de vos performances
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Section droite - Formulaire de connexion */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Card
              className="animate-fade-in-up"
              sx={{
                background: 'white',
                borderRadius: '24px',
                boxShadow: '0 20px 60px rgba(38, 39, 48, 0.12)',
                border: '1px solid rgba(38, 39, 48, 0.06)',
                overflow: 'hidden',
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      color: '#262730',
                      mb: 2,
                    }}
                  >
                    Connexion
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: '#6C738B',
                      mb: 3,
                    }}
                  >
                    Connectez-vous pour accéder à toutes les fonctionnalités
                  </Typography>
                </Box>

                <Box sx={{ mb: 3 }}>
                  <GoogleSignInButton
                    fullWidth
                    size="large"
                    onSuccess={handleSignInSuccess}
                    onError={handleSignInError}
                  />
                </Box>

                <Divider sx={{ my: 3 }}>
                  <Typography variant="body2" sx={{ color: '#6C738B', px: 2 }}>
                    ou
                  </Typography>
                </Divider>

                <Alert 
                  severity="info" 
                  sx={{ 
                    borderRadius: '12px',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    border: '1px solid rgba(59, 130, 246, 0.2)',
                    '& .MuiAlert-icon': {
                      color: '#3B82F6',
                    },
                  }}
                >
                  <Typography variant="body2" sx={{ color: '#1E40AF' }}>
                    <strong>Pourquoi Google ?</strong><br />
                    Connexion rapide et sécurisée. Nous ne stockons que les informations 
                    nécessaires à votre profil sportif.
                  </Typography>
                </Alert>

                <Box sx={{ mt: 4, textAlign: 'center' }}>
                  <Typography variant="body2" sx={{ color: '#6C738B' }}>
                    En vous connectant, vous acceptez nos{' '}
                    <Box
                      component="span"
                      sx={{
                        color: '#F98807',
                        fontWeight: 600,
                        cursor: 'pointer',
                        '&:hover': {
                          textDecoration: 'underline',
                        },
                      }}
                    >
                      conditions d'utilisation
                    </Box>
                    {' '}et notre{' '}
                    <Box
                      component="span"
                      sx={{
                        color: '#F98807',
                        fontWeight: 600,
                        cursor: 'pointer',
                        '&:hover': {
                          textDecoration: 'underline',
                        },
                      }}
                    >
                      politique de confidentialité
                    </Box>
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default LoginPage;
