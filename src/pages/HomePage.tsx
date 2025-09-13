// Page d'accueil avec hero section et recettes populaires
import React, { useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  FitnessCenter,
  Restaurant,
  Favorite,
  Timer,
  People,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useRecipes } from '../contexts/RecipeContext';
import { useAuth } from '../contexts/AuthContext';
import RecipeCard from '../components/RecipeCard';
import { RECIPE_CATEGORIES } from '../constants';

const HomePage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { recipes, loading, fetchRecipes } = useRecipes();

  useEffect(() => {
    // Charger les recettes populaires
    fetchRecipes({ rating: 4 }, 1);
  }, [fetchRecipes]);

  const featuredCategories = RECIPE_CATEGORIES.slice(0, 4);
  const popularRecipes = recipes.slice(0, 6);

  const stats = [
    { label: 'Recettes', value: '150+', icon: <Restaurant /> },
    { label: 'Utilisateurs', value: '2.5k+', icon: <People /> },
    { label: 'Favoris', value: '10k+', icon: <Favorite /> },
    { label: 'Temps moyen', value: '25min', icon: <Timer /> },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          color: 'white',
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                variant={isMobile ? 'h3' : 'h2'}
                component="h1"
                sx={{
                  fontWeight: 'bold',
                  mb: 3,
                  lineHeight: 1.2,
                }}
              >
                Recettes Végétariennes
                <br />
                <Box component="span" sx={{ color: theme.palette.warning.light }}>
                  pour Coureurs
                </Box>
              </Typography>
              
              <Typography
                variant="h6"
                sx={{
                  mb: 4,
                  opacity: 0.9,
                  lineHeight: 1.6,
                }}
              >
                Découvrez des recettes nutritionnellement optimisées pour vos entraînements.
                De l'énergie pré-course à la récupération post-effort.
              </Typography>

              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    bgcolor: 'white',
                    color: theme.palette.primary.main,
                    fontWeight: 'bold',
                    px: 4,
                    py: 1.5,
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.9)',
                    },
                  }}
                  onClick={() => navigate('/recipes')}
                >
                  Explorer les recettes
                </Button>
                
                {!isAuthenticated && (
                  <Button
                    variant="outlined"
                    size="large"
                    sx={{
                      borderColor: 'white',
                      color: 'white',
                      fontWeight: 'bold',
                      px: 4,
                      py: 1.5,
                      '&:hover': {
                        borderColor: 'white',
                        bgcolor: 'rgba(255, 255, 255, 0.1)',
                      },
                    }}
                    onClick={() => navigate('/signup')}
                  >
                    Commencer gratuitement
                  </Button>
                )}
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: { xs: 300, md: 400 },
                }}
              >
                <FitnessCenter
                  sx={{
                    fontSize: { xs: 200, md: 300 },
                    opacity: 0.3,
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Statistiques */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          {stats.map((stat, index) => (
            <Grid size={{ xs: 6, md: 3 }} key={index}>
              <Card
                sx={{
                  textAlign: 'center',
                  p: 3,
                  height: '100%',
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      color: theme.palette.primary.main,
                      mb: 2,
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    {stat.icon}
                  </Box>
                  <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stat.label}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Catégories populaires */}
      <Box sx={{ bgcolor: 'grey.50', py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            component="h2"
            sx={{
              textAlign: 'center',
              fontWeight: 'bold',
              mb: 6,
            }}
          >
            Catégories Populaires
          </Typography>

          <Grid container spacing={3}>
            {featuredCategories.map((category) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={category.id}>
                <Card
                  sx={{
                    height: '100%',
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                    },
                  }}
                  onClick={() => navigate(`/recipes?category=${category.id}`)}
                >
                  <CardContent sx={{ textAlign: 'center', p: 4 }}>
                    <Typography
                      variant="h2"
                      sx={{
                        mb: 2,
                        fontSize: '3rem',
                      }}
                    >
                      {category.icon}
                    </Typography>
                    <Typography
                      variant="h6"
                      component="h3"
                      sx={{
                        fontWeight: 'bold',
                        mb: 1,
                        color: category.color,
                      }}
                    >
                      {category.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {category.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Recettes populaires */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography
            variant="h4"
            component="h2"
            sx={{ fontWeight: 'bold' }}
          >
            Recettes Populaires
          </Typography>
          <Button
            variant="outlined"
            onClick={() => navigate('/recipes')}
            sx={{ fontWeight: 'bold' }}
          >
            Voir toutes les recettes
          </Button>
        </Box>

        {loading ? (
          <Grid container spacing={3}>
            {[...Array(6)].map((_, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                <Card sx={{ height: 400 }}>
                  <Box sx={{ height: 200, bgcolor: 'grey.200' }} />
                  <CardContent>
                    <Box sx={{ height: 20, bgcolor: 'grey.200', mb: 2 }} />
                    <Box sx={{ height: 16, bgcolor: 'grey.200', mb: 1 }} />
                    <Box sx={{ height: 16, bgcolor: 'grey.200', width: '60%' }} />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Grid container spacing={3}>
            {popularRecipes.map((recipe) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={recipe.id}>
                <RecipeCard
                  recipe={recipe}
                  onCardClick={(id) => navigate(`/recipes/${id}`)}
                  onToggleFavorite={(id) => {
                    // TODO: Implémenter la logique de favoris
                    console.log('Toggle favorite:', id);
                  }}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          bgcolor: theme.palette.primary.main,
          color: 'white',
          py: 8,
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="h4"
              component="h2"
              sx={{
                fontWeight: 'bold',
                mb: 3,
              }}
            >
              Prêt à optimiser votre nutrition ?
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mb: 4,
                opacity: 0.9,
              }}
            >
              Rejoignez notre communauté de coureurs végétariens et découvrez
              des recettes adaptées à vos objectifs sportifs.
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{
                bgcolor: 'white',
                color: theme.palette.primary.main,
                fontWeight: 'bold',
                px: 6,
                py: 2,
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.9)',
                },
              }}
              onClick={() => navigate(isAuthenticated ? '/meal-planner' : '/signup')}
            >
              {isAuthenticated ? 'Créer mon plan de repas' : 'Commencer maintenant'}
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;
