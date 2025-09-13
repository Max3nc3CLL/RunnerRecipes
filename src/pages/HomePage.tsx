// Page d'accueil moderne inspirée du design Untitled UI
import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Avatar,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  ArrowForward,
  Timer,
  People,
  Favorite,
  TrendingUp,
  Restaurant,
  FitnessCenter,
  Star,
  BookmarkBorder,
  Share,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useRecipes } from '../contexts/RecipeContext';
import { useAuth } from '../contexts/AuthContext';
import { Recipe } from '../types';

const HomePage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { recipes, loading, fetchRecipes } = useRecipes();
  const [featuredRecipe, setFeaturedRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  useEffect(() => {
    if (recipes.length > 0) {
      setFeaturedRecipe(recipes[0]);
    }
  }, [recipes]);

  const recentRecipes = recipes.slice(0, 9);

  const categories = [
    { name: 'Italien', count: 24, color: '#F98807' },
    { name: 'Salade', count: 18, color: '#4ADE80' },
    { name: 'Asiatique', count: 15, color: '#F59E0B' },
    { name: 'Méditerranéen', count: 12, color: '#EF4444' },
    { name: 'Végétarien', count: 32, color: '#8B5CF6' },
    { name: 'Protéines', count: 20, color: '#06B6D4' },
  ];

  const stats = [
    { label: 'Recettes', value: '150+', icon: <Restaurant /> },
    { label: 'Utilisateurs', value: '2.5k+', icon: <People /> },
    { label: 'Favoris', value: '10k+', icon: <Favorite /> },
    { label: 'Temps moyen', value: '25min', icon: <Timer /> },
  ];

  return (
    <Box sx={{ bgcolor: '#FAFAFA', minHeight: '100vh' }}>
      {/* Header moderne */}
      <Box
        sx={{
          bgcolor: 'white',
          borderBottom: '1px solid rgba(38, 39, 48, 0.08)',
          py: 2,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #F98807 0%, #F59E0B 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Restaurant sx={{ color: 'white', fontSize: 20 }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#262730' }}>
                Runner Recipes
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Typography variant="body2" sx={{ color: '#6C738B', cursor: 'pointer' }}>
                Accueil
              </Typography>
              <Typography variant="body2" sx={{ color: '#6C738B', cursor: 'pointer' }}>
                Recettes
              </Typography>
              <Typography variant="body2" sx={{ color: '#6C738B', cursor: 'pointer' }}>
                Nutrition
              </Typography>
              <Typography variant="body2" sx={{ color: '#6C738B', cursor: 'pointer' }}>
                À propos
              </Typography>
              
              {isAuthenticated ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar
                    src={user?.photoURL}
                    sx={{ width: 32, height: 32 }}
                  />
                  <Typography variant="body2" sx={{ color: '#262730', fontWeight: 500 }}>
                    {user?.name}
                  </Typography>
                </Box>
              ) : (
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    variant="text"
                    sx={{ color: '#6C738B', textTransform: 'none', fontWeight: 500 }}
                    onClick={() => navigate('/login')}
                  >
                    Se connecter
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: '#262730',
                      color: 'white',
                      textTransform: 'none',
                      fontWeight: 500,
                      px: 3,
                      '&:hover': { bgcolor: '#1F2937' },
                    }}
                    onClick={() => navigate('/login')}
                  >
                    S'inscrire
                  </Button>
                </Box>
              )}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Hero Section avec recette mise en avant */}
      {featuredRecipe && (
        <Box
          sx={{
            position: 'relative',
            height: { xs: '60vh', md: '70vh' },
            overflow: 'hidden',
            mb: 8,
          }}
        >
          <CardMedia
            component="img"
            image={featuredRecipe.imageUrl || '/api/placeholder/800/600'}
            alt={featuredRecipe.title}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          
          {/* Overlay avec informations de la recette */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
              p: 4,
            }}
          >
            <Container maxWidth="lg">
              <Box sx={{ maxWidth: '600px' }}>
                <Chip
                  label="Recette du jour"
                  sx={{
                    bgcolor: 'rgba(249, 136, 7, 0.9)',
                    color: 'white',
                    fontWeight: 500,
                    mb: 2,
                  }}
                />
                
                <Typography
                  variant={isMobile ? 'h4' : 'h3'}
                  sx={{
                    color: 'white',
                    fontWeight: 700,
                    mb: 2,
                    lineHeight: 1.2,
                  }}
                >
                  {featuredRecipe.title}
                </Typography>
                
                <Typography
                  variant="body1"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    mb: 3,
                    lineHeight: 1.6,
                  }}
                >
                  {featuredRecipe.description}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Timer sx={{ color: 'white', fontSize: 20 }} />
                    <Typography variant="body2" sx={{ color: 'white' }}>
                      {featuredRecipe.prepTime + featuredRecipe.cookTime} min
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <People sx={{ color: 'white', fontSize: 20 }} />
                    <Typography variant="body2" sx={{ color: 'white' }}>
                      {featuredRecipe.servings} portions
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Star sx={{ color: '#FBBF24', fontSize: 20 }} />
                    <Typography variant="body2" sx={{ color: 'white' }}>
                      {featuredRecipe.rating.toFixed(1)}
                    </Typography>
                  </Box>
                </Box>

                <Button
                  variant="contained"
                  endIcon={<ArrowForward />}
                  sx={{
                    bgcolor: 'white',
                    color: '#262730',
                    fontWeight: 600,
                    px: 4,
                    py: 1.5,
                    '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.9)' },
                  }}
                  onClick={() => navigate(`/recipes/${featuredRecipe.id}`)}
                >
                  Voir la recette
                </Button>
              </Box>
            </Container>
          </Box>

          {/* Flèche de navigation */}
          <IconButton
            sx={{
              position: 'absolute',
              right: 24,
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: 'rgba(255, 255, 255, 0.9)',
              color: '#262730',
              '&:hover': { bgcolor: 'white' },
            }}
          >
            <ArrowForward />
          </IconButton>
        </Box>
      )}

      {/* Section Recettes récentes */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: '#262730',
            mb: 4,
          }}
        >
          Recettes récentes
        </Typography>

        {loading ? (
          <Grid container spacing={3}>
            {[...Array(9)].map((_, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ borderRadius: '16px', overflow: 'hidden' }}>
                  <Box sx={{ height: 200, bgcolor: '#F3F4F6' }} />
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ height: 24, bgcolor: '#F3F4F6', borderRadius: '4px', mb: 2 }} />
                    <Box sx={{ height: 16, bgcolor: '#F3F4F6', borderRadius: '4px', mb: 1 }} />
                    <Box sx={{ height: 16, bgcolor: '#F3F4F6', borderRadius: '4px', width: '60%' }} />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Grid container spacing={3}>
            {recentRecipes.map((recipe) => (
              <Grid item xs={12} sm={6} md={4} key={recipe.id}>
                <Card
                  sx={{
                    borderRadius: '16px',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 20px 40px rgba(38, 39, 48, 0.12)',
                    },
                  }}
                  onClick={() => navigate(`/recipes/${recipe.id}`)}
                >
                  <Box sx={{ position: 'relative' }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={recipe.imageUrl || '/api/placeholder/400/300'}
                      alt={recipe.title}
                    />
                    
                    {/* Actions rapides */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        display: 'flex',
                        gap: 1,
                      }}
                    >
                      <IconButton
                        size="small"
                        sx={{
                          bgcolor: 'rgba(255, 255, 255, 0.9)',
                          color: '#6C738B',
                          '&:hover': { bgcolor: 'white' },
                        }}
                      >
                        <BookmarkBorder />
                      </IconButton>
                      <IconButton
                        size="small"
                        sx={{
                          bgcolor: 'rgba(255, 255, 255, 0.9)',
                          color: '#6C738B',
                          '&:hover': { bgcolor: 'white' },
                        }}
                      >
                        <Share />
                      </IconButton>
                    </Box>

                    {/* Badge catégorie */}
                    <Chip
                      label={recipe.category}
                      size="small"
                      sx={{
                        position: 'absolute',
                        bottom: 12,
                        left: 12,
                        bgcolor: 'rgba(249, 136, 7, 0.9)',
                        color: 'white',
                        fontWeight: 500,
                      }}
                    />
                  </Box>

                  <CardContent sx={{ p: 3 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: '#262730',
                        mb: 1,
                        lineHeight: 1.3,
                      }}
                    >
                      {recipe.title}
                    </Typography>
                    
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#6C738B',
                        mb: 2,
                        lineHeight: 1.5,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {recipe.description}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Timer sx={{ fontSize: 16, color: '#6C738B' }} />
                          <Typography variant="caption" sx={{ color: '#6C738B' }}>
                            {recipe.prepTime + recipe.cookTime}min
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Star sx={{ fontSize: 16, color: '#FBBF24' }} />
                          <Typography variant="caption" sx={{ color: '#6C738B' }}>
                            {recipe.rating.toFixed(1)}
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar
                          src={recipe.author?.photoURL}
                          sx={{ width: 24, height: 24 }}
                        />
                        <Typography variant="caption" sx={{ color: '#6C738B' }}>
                          {recipe.author?.name}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Bouton Charger plus */}
        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Button
            variant="outlined"
            sx={{
              borderColor: '#E5E7EB',
              color: '#6C738B',
              fontWeight: 500,
              px: 4,
              py: 1.5,
              borderRadius: '12px',
              '&:hover': {
                borderColor: '#D1D5DB',
                bgcolor: 'rgba(107, 114, 128, 0.05)',
              },
            }}
            onClick={() => navigate('/recipes')}
          >
            Charger plus...
          </Button>
        </Box>
      </Container>

      {/* Section Statistiques */}
      <Box sx={{ bgcolor: 'white', py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {stats.map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Box sx={{ textAlign: 'center' }}>
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: '16px',
                      bgcolor: 'rgba(249, 136, 7, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 16px',
                    }}
                  >
                    {React.cloneElement(stat.icon, {
                      sx: { fontSize: 32, color: '#F98807' },
                    })}
                  </Box>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      color: '#262730',
                      mb: 1,
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#6C738B',
                      fontWeight: 500,
                    }}
                  >
                    {stat.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Footer moderne */}
      <Box
        sx={{
          bgcolor: '#262730',
          color: 'white',
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                mb: 3,
              }}
            >
              Commençons quelque chose de grand
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'rgba(255, 255, 255, 0.8)',
                mb: 4,
              }}
            >
              Rejoignez plus de 2 500+ coureurs qui optimisent déjà leur nutrition avec Runner Recipes.
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="outlined"
                sx={{
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                  color: 'white',
                  fontWeight: 500,
                  px: 4,
                  py: 1.5,
                  borderRadius: '12px',
                  '&:hover': {
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
                onClick={() => navigate('/contact')}
              >
                Nous contacter
              </Button>
              <Button
                variant="contained"
                sx={{
                  bgcolor: 'white',
                  color: '#262730',
                  fontWeight: 600,
                  px: 4,
                  py: 1.5,
                  borderRadius: '12px',
                  '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.9)' },
                }}
                onClick={() => navigate(isAuthenticated ? '/meal-planner' : '/login')}
              >
                Commencer
              </Button>
            </Box>
          </Box>

          {/* Liens du footer */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: 4, borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #F98807 0%, #F59E0B 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Restaurant sx={{ color: 'white', fontSize: 20 }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Runner Recipes
              </Typography>
            </Box>
            
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              © 2025 Runner Recipes. Tous droits réservés.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;