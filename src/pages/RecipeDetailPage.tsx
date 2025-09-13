// Page de détails d'une recette
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
  Avatar,
  Tab,
  Tabs,
  CircularProgress,
  Alert,
  Breadcrumbs,
  Link,
} from '@mui/material';
import {
  ArrowBack,
  Favorite,
  FavoriteBorder,
  Timer,
  People,
  LocalFireDepartment,
  Restaurant,
  FitnessCenter,
  Share,
  Print,
  Bookmark,
  BookmarkBorder,
  WaterDrop,
  Speed,
  ContentCopy,
  Check,
} from '@mui/icons-material';
import { useRecipes } from '../contexts/RecipeContext';
import { useAuth } from '../contexts/AuthContext';
import { Recipe } from '../types';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`recipe-tabpanel-${index}`}
      aria-labelledby={`recipe-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const RecipeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getRecipe } = useRecipes();
  const { isAuthenticated } = useAuth();
  
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [ingredientsCopied, setIngredientsCopied] = useState(false);

  useEffect(() => {
    const loadRecipe = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        const recipeData = await getRecipe(id);
        
        if (recipeData) {
          setRecipe(recipeData);
          // TODO: Charger les données utilisateur (favoris, bookmarks)
          setIsFavorite(false);
          setIsBookmarked(false);
        } else {
          setError('Recette non trouvée');
        }
      } catch (err) {
        setError('Erreur lors du chargement de la recette');
        console.error('Erreur:', err);
      } finally {
        setLoading(false);
      }
    };

    loadRecipe();
  }, [id, getRecipe]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleToggleFavorite = async () => {
    if (!isAuthenticated) {
      // TODO: Rediriger vers la page de connexion
      return;
    }
    
    try {
      // TODO: Implémenter la logique de favoris
      setIsFavorite(!isFavorite);
    } catch (err) {
      console.error('Erreur lors de la gestion des favoris:', err);
    }
  };

  const handleToggleBookmark = async () => {
    if (!isAuthenticated) {
      // TODO: Rediriger vers la page de connexion
      return;
    }
    
    try {
      // TODO: Implémenter la logique de bookmarks
      setIsBookmarked(!isBookmarked);
    } catch (err) {
      console.error('Erreur lors de la gestion des bookmarks:', err);
    }
  };


  const handleShare = async () => {
    if (navigator.share && recipe) {
      try {
        await navigator.share({
          title: recipe.title,
          text: recipe.description,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Erreur lors du partage:', err);
      }
    } else {
      // Fallback: copier l'URL dans le presse-papiers
      navigator.clipboard.writeText(window.location.href);
      // TODO: Afficher une notification de succès
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyIngredients = async () => {
    if (!recipe) return;
    
    const ingredientsText = recipe.ingredients
      .map(ingredient => {
        const amount = ingredient.amount ? `${ingredient.amount} ${ingredient.unit || ''}`.trim() : '';
        return amount ? `${ingredient.name} - ${amount}` : ingredient.name;
      })
      .join('\n');
    
    try {
      await navigator.clipboard.writeText(ingredientsText);
      setIngredientsCopied(true);
      setTimeout(() => setIngredientsCopied(false), 2000);
    } catch (err) {
      console.error('Erreur lors de la copie:', err);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error || !recipe) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error || 'Recette non trouvée'}
        </Alert>
        <Button
          variant="contained"
          startIcon={<ArrowBack />}
          onClick={() => navigate('/recipes')}
        >
          Retour aux recettes
        </Button>
      </Container>
    );
  }

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* Breadcrumbs */}
      <Container maxWidth="lg" sx={{ pt: 2 }}>
        <Breadcrumbs sx={{ mb: 2 }}>
          <Link
            component="button"
            variant="body2"
            onClick={() => navigate('/')}
            sx={{ textDecoration: 'none' }}
          >
            Accueil
          </Link>
          <Link
            component="button"
            variant="body2"
            onClick={() => navigate('/recipes')}
            sx={{ textDecoration: 'none' }}
          >
            Recettes
          </Link>
          <Typography variant="body2" color="text.primary">
            {recipe.title}
          </Typography>
        </Breadcrumbs>
      </Container>

      <Container maxWidth="lg" sx={{ py: 2 }}>
        <Grid container spacing={4}>
          {/* Image principale - Maintenant à gauche */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Card 
              className="animate-fade-in-up"
              sx={{ 
                height: '100%',
                background: 'white',
                borderRadius: '20px',
                boxShadow: '0 4px 40px rgba(38, 39, 48, 0.08)',
                border: '1px solid rgba(38, 39, 48, 0.06)',
                overflow: 'hidden',
              }}
            >
              <CardMedia
                component="img"
                height={500}
                image={recipe.imageUrl}
                alt={recipe.title}
                sx={{ 
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.02)',
                  },
                }}
              />
              
              {/* Actions rapides en bas de l'image */}
              <Box sx={{ 
                position: 'absolute', 
                bottom: 16, 
                left: 16, 
                right: 16,
                display: 'flex', 
                gap: 1,
                justifyContent: 'center',
              }}>
                <IconButton
                  sx={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '50%',
                    width: 48,
                    height: 48,
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 1)',
                      transform: 'scale(1.1)',
                    },
                  }}
                  onClick={handleToggleFavorite}
                  title={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                >
                  {isFavorite ? (
                    <Favorite sx={{ color: '#F98807', fontSize: '20px' }} />
                  ) : (
                    <FavoriteBorder sx={{ color: '#6C738B', fontSize: '20px' }} />
                  )}
                </IconButton>
                
                <IconButton
                  sx={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '50%',
                    width: 48,
                    height: 48,
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 1)',
                      transform: 'scale(1.1)',
                    },
                  }}
                  onClick={handleToggleBookmark}
                  title={isBookmarked ? 'Retirer des bookmarks' : 'Ajouter aux bookmarks'}
                >
                  {isBookmarked ? (
                    <Bookmark sx={{ color: '#F98807', fontSize: '20px' }} />
                  ) : (
                    <BookmarkBorder sx={{ color: '#6C738B', fontSize: '20px' }} />
                  )}
                </IconButton>
                
                <IconButton
                  sx={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '50%',
                    width: 48,
                    height: 48,
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 1)',
                      transform: 'scale(1.1)',
                    },
                  }}
                  onClick={handleShare}
                  title="Partager"
                >
                  <Share sx={{ color: '#6C738B', fontSize: '20px' }} />
                </IconButton>
                
                <IconButton
                  sx={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '50%',
                    width: 48,
                    height: 48,
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 1)',
                      transform: 'scale(1.1)',
                    },
                  }}
                  onClick={handlePrint}
                  title="Imprimer"
                >
                  <Print sx={{ color: '#6C738B', fontSize: '20px' }} />
                </IconButton>
              </Box>
            </Card>
          </Grid>

          {/* Informations principales - Maintenant à droite */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ mb: 3 }}>
              <Typography 
                variant="h2" 
                component="h1" 
                sx={{ 
                  mb: 2, 
                  fontWeight: 800,
                  color: '#262730',
                  fontSize: { xs: '32px', md: '40px' },
                  lineHeight: 1.1,
                }}
              >
                {recipe.title}
              </Typography>
              
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 4, 
                  color: '#565B73',
                  fontSize: '18px',
                  lineHeight: 1.5,
                }}
              >
                {recipe.description}
              </Typography>

              {/* Métadonnées avec design moderne */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 4 }}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1,
                  padding: '8px 16px',
                  borderRadius: '20px',
                  background: 'rgba(38, 39, 48, 0.06)',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    background: 'rgba(38, 39, 48, 0.08)',
                  },
                }}>
                  <Timer sx={{ color: '#6C738B', fontSize: '18px' }} />
                  <Typography variant="body2" sx={{ color: '#565B73', fontWeight: 500 }}>
                    {recipe.prepTime} min
                  </Typography>
                </Box>
                
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1,
                  padding: '8px 16px',
                  borderRadius: '20px',
                  background: 'rgba(38, 39, 48, 0.06)',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    background: 'rgba(38, 39, 48, 0.08)',
                  },
                }}>
                  <People sx={{ color: '#6C738B', fontSize: '18px' }} />
                  <Typography variant="body2" sx={{ color: '#565B73', fontWeight: 500 }}>
                    {recipe.servings} portions
                  </Typography>
                </Box>
                
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1,
                  padding: '8px 16px',
                  borderRadius: '20px',
                  background: 'rgba(38, 39, 48, 0.06)',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    background: 'rgba(38, 39, 48, 0.08)',
                  },
                }}>
                  <Restaurant sx={{ color: '#6C738B', fontSize: '18px' }} />
                  <Typography variant="body2" sx={{ color: '#565B73', fontWeight: 500 }}>
                    {recipe.category.name}
                  </Typography>
                </Box>
              </Box>


              {/* Auteur avec design moderne */}
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 2, 
                mb: 4,
                padding: '16px 20px',
                borderRadius: '16px',
                background: 'white',
                boxShadow: '0 2px 12px rgba(38, 39, 48, 0.08)',
                border: '1px solid rgba(38, 39, 48, 0.06)',
              }}>
                <Avatar sx={{ 
                  bgcolor: 'linear-gradient(135deg, #F98807 0%, #FFB231 100%)',
                  width: 48,
                  height: 48,
                  fontSize: '20px',
                  fontWeight: 700,
                }}>
                  {recipe.author?.name?.charAt(0) || 'A'}
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#262730', mb: 0.5 }}>
                    {recipe.author?.name || 'Auteur inconnu'}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#6C738B' }}>
                    Publié le {new Date(recipe.createdAt).toLocaleDateString('fr-FR')}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Informations nutritionnelles sous forme de labels */}
        <Box sx={{ mt: 4, mb: 4 }}>
          <Typography 
            variant="h4" 
            sx={{ 
              mb: 3, 
              fontWeight: 700,
              color: '#262730',
            }}
          >
            Informations Nutritionnelles
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Card
                className="animate-fade-in-up"
                sx={{
                  background: 'white',
                  borderRadius: '20px',
                  border: '1px solid rgba(38, 39, 48, 0.06)',
                  boxShadow: '0 4px 40px rgba(38, 39, 48, 0.08)',
                  p: 3,
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 60px rgba(38, 39, 48, 0.12)',
                  },
                }}
              >
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: '12px',
                    background: 'rgba(38, 39, 48, 0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                  }}
                >
                  <LocalFireDepartment sx={{ fontSize: 24, color: '#262730' }} />
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 600, color: '#262730', mb: 1 }}>
                  {recipe.nutrition.caloriesPerServing} cal
                </Typography>
                <Typography variant="body1" sx={{ color: '#565B73', fontWeight: 500 }}>
                  Calories
                </Typography>
              </Card>
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Card
                className="animate-fade-in-up"
                sx={{
                  background: 'white',
                  borderRadius: '20px',
                  border: '1px solid rgba(38, 39, 48, 0.06)',
                  boxShadow: '0 4px 40px rgba(38, 39, 48, 0.08)',
                  p: 3,
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 60px rgba(38, 39, 48, 0.12)',
                  },
                }}
              >
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: '12px',
                    background: 'rgba(38, 39, 48, 0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                  }}
                >
                  <WaterDrop sx={{ fontSize: 24, color: '#262730' }} />
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 600, color: '#262730', mb: 1 }}>
                  {recipe.nutrition.macronutrients.carbohydrates}g
                </Typography>
                <Typography variant="body1" sx={{ color: '#565B73', fontWeight: 500 }}>
                  Glucides
                </Typography>
              </Card>
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Card
                className="animate-fade-in-up"
                sx={{
                  background: 'white',
                  borderRadius: '20px',
                  border: '1px solid rgba(38, 39, 48, 0.06)',
                  boxShadow: '0 4px 40px rgba(38, 39, 48, 0.08)',
                  p: 3,
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 60px rgba(38, 39, 48, 0.12)',
                  },
                }}
              >
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: '12px',
                    background: 'rgba(38, 39, 48, 0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                  }}
                >
                  <FitnessCenter sx={{ fontSize: 24, color: '#262730' }} />
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 600, color: '#262730', mb: 1 }}>
                  {recipe.nutrition.macronutrients.proteins}g
                </Typography>
                <Typography variant="body1" sx={{ color: '#565B73', fontWeight: 500 }}>
                  Protéines
                </Typography>
              </Card>
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Card
                className="animate-fade-in-up"
                sx={{
                  background: 'white',
                  borderRadius: '20px',
                  border: '1px solid rgba(38, 39, 48, 0.06)',
                  boxShadow: '0 4px 40px rgba(38, 39, 48, 0.08)',
                  p: 3,
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 60px rgba(38, 39, 48, 0.12)',
                  },
                }}
              >
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: '12px',
                    background: 'rgba(38, 39, 48, 0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                  }}
                >
                  <Speed sx={{ fontSize: 24, color: '#262730' }} />
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 600, color: '#262730', mb: 1 }}>
                  {recipe.nutrition.macronutrients.fats}g
                </Typography>
                <Typography variant="body1" sx={{ color: '#565B73', fontWeight: 500 }}>
                  Lipides
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Tabs de contenu */}
        <Box sx={{ mt: 4 }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={activeTab} onChange={handleTabChange} aria-label="recipe tabs">
              <Tab label="Ingrédients" />
              <Tab label="Instructions" />
              <Tab label="Nutrition" />
              <Tab label="Conseils" />
            </Tabs>
          </Box>

          {/* Onglet Ingrédients */}
          <CustomTabPanel value={activeTab} index={0}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#262730' }}>
                Ingrédients ({recipe.ingredients.length})
              </Typography>
              <Button
                variant="outlined"
                startIcon={ingredientsCopied ? <Check /> : <ContentCopy />}
                onClick={handleCopyIngredients}
                sx={{
                  borderRadius: '12px',
                  textTransform: 'none',
                  fontWeight: 500,
                  borderColor: ingredientsCopied ? '#4ADE80' : '#E5E7EB',
                  color: ingredientsCopied ? '#4ADE80' : '#6C738B',
                  '&:hover': {
                    borderColor: ingredientsCopied ? '#22C55E' : '#D1D5DB',
                    backgroundColor: ingredientsCopied ? 'rgba(74, 222, 128, 0.1)' : 'rgba(107, 114, 128, 0.1)',
                  },
                }}
              >
                {ingredientsCopied ? 'Copié !' : 'Copier la liste'}
              </Button>
            </Box>
            
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 2,
                '& > *': {
                  flex: '0 0 auto',
                },
              }}
            >
              {recipe.ingredients.map((ingredient, index) => (
                <Card
                  key={index}
                  className="animate-fade-in-up"
                  sx={{
                    background: 'white',
                    borderRadius: '16px',
                    border: '1px solid rgba(38, 39, 48, 0.06)',
                    boxShadow: '0 2px 12px rgba(38, 39, 48, 0.08)',
                    p: 2,
                    minWidth: '200px',
                    maxWidth: '300px',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 20px rgba(38, 39, 48, 0.12)',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '10px',
                        background: 'rgba(249, 136, 7, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Restaurant sx={{ fontSize: 20, color: '#F98807' }} />
                    </Box>
                    <Box sx={{ minWidth: 0, flex: 1 }}>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          fontWeight: 600, 
                          color: '#262730',
                          mb: 0.5,
                          wordBreak: 'break-word',
                        }}
                      >
                        {ingredient.name}
                      </Typography>
                      {ingredient.amount && (
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: '#6C738B',
                            fontSize: '14px',
                          }}
                        >
                          {ingredient.amount} {ingredient.unit || ''}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </Card>
              ))}
            </Box>
          </CustomTabPanel>

          {/* Onglet Instructions */}
          <CustomTabPanel value={activeTab} index={1}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
              Instructions ({recipe.instructions.length} étapes)
            </Typography>
            <List>
              {recipe.instructions.map((step, index) => (
                <ListItem key={index} sx={{ px: 0, alignItems: 'flex-start' }}>
                  <ListItemIcon sx={{ mt: 1 }}>
                    <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32, fontSize: '0.875rem' }}>
                      {index + 1}
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
                        Étape {index + 1}
                      </Typography>
                    }
                    secondary={
                      <Box>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                          {step.description}
                        </Typography>
                        {step.tips && (
                          <Paper sx={{ p: 2, bgcolor: 'info.light', color: 'info.contrastText' }}>
                            <Typography variant="body2">
                              <strong>💡 Conseil :</strong> {step.tips}
                            </Typography>
                          </Paper>
                        )}
                        {step.imageUrl && (
                          <Box sx={{ mt: 2 }}>
                            <img
                              src={step.imageUrl}
                              alt={`Étape ${index + 1}`}
                              style={{ maxWidth: '100%', height: 'auto', borderRadius: 8 }}
                            />
                          </Box>
                        )}
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </CustomTabPanel>

          {/* Onglet Nutrition */}
          <CustomTabPanel value={activeTab} index={2}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
              Informations Nutritionnelles Détaillées
            </Typography>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Paper sx={{ p: 3, mb: 3 }}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                    Macronutriments
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography>Calories</Typography>
                    <Typography sx={{ fontWeight: 'bold' }}>{recipe.nutrition.calories} kcal</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography>Protéines</Typography>
                    <Typography sx={{ fontWeight: 'bold' }}>{recipe.nutrition.macronutrients.proteins}g</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography>Glucides</Typography>
                    <Typography sx={{ fontWeight: 'bold' }}>{recipe.nutrition.macronutrients.carbohydrates}g</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography>Lipides</Typography>
                    <Typography sx={{ fontWeight: 'bold' }}>{recipe.nutrition.macronutrients.fats}g</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography>Fibres</Typography>
                    <Typography sx={{ fontWeight: 'bold' }}>{recipe.nutrition.macronutrients.fiber}g</Typography>
                  </Box>
                </Paper>
              </Grid>
              
              <Grid size={{ xs: 12, md: 6 }}>
                <Paper sx={{ p: 3, mb: 3 }}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                    Micronutriments
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography>Vitamine C</Typography>
                    <Typography sx={{ fontWeight: 'bold' }}>{recipe.nutrition.micronutrients.vitaminC}mg</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography>Fer</Typography>
                    <Typography sx={{ fontWeight: 'bold' }}>{recipe.nutrition.micronutrients.iron}mg</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography>Calcium</Typography>
                    <Typography sx={{ fontWeight: 'bold' }}>{recipe.nutrition.micronutrients.calcium}mg</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography>Sodium</Typography>
                    <Typography sx={{ fontWeight: 'bold' }}>{recipe.nutrition.micronutrients.sodium}mg</Typography>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </CustomTabPanel>

          {/* Onglet Conseils */}
          <CustomTabPanel value={activeTab} index={3}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
              Conseils pour Coureurs
            </Typography>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Paper sx={{ p: 3, mb: 3, borderLeft: '4px solid', borderLeftColor: 'success.main' }}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: 'success.main' }}>
                    🏃‍♂️ Avant l'entraînement
                  </Typography>
                  <Typography variant="body1">
                    Cette recette est idéale {recipe.category.name === 'Pre-training' ? 'avant' : 'après'} votre séance. 
                    Les glucides complexes fourniront l'énergie nécessaire pour votre performance.
                  </Typography>
                </Paper>
              </Grid>
              
              <Grid size={{ xs: 12, md: 6 }}>
                <Paper sx={{ p: 3, mb: 3, borderLeft: '4px solid', borderLeftColor: 'info.main' }}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: 'info.main' }}>
                    💧 Hydratation
                  </Typography>
                  <Typography variant="body1">
                    N'oubliez pas de bien vous hydrater pendant et après votre entraînement. 
                    Cette recette contient {recipe.nutrition.micronutrients.sodium}mg de sodium pour compenser les pertes.
                  </Typography>
                </Paper>
              </Grid>
              
              <Grid size={{ xs: 12, md: 6 }}>
                <Paper sx={{ p: 3, mb: 3, borderLeft: '4px solid', borderLeftColor: 'warning.main' }}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: 'warning.main' }}>
                    ⏰ Timing
                  </Typography>
                  <Typography variant="body1">
                    Consommez cette recette {recipe.category.name === 'Pre-training' ? '1-2 heures avant' : 'dans les 30 minutes après'} 
                    votre entraînement pour optimiser la récupération.
                  </Typography>
                </Paper>
              </Grid>
              
              <Grid size={{ xs: 12, md: 6 }}>
                <Paper sx={{ p: 3, mb: 3, borderLeft: '4px solid', borderLeftColor: 'error.main' }}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: 'error.main' }}>
                    🚨 Attention
                  </Typography>
                  <Typography variant="body1">
                    Si vous avez des allergies alimentaires, vérifiez attentivement la liste des ingrédients. 
                    Cette recette contient des allergènes potentiels.
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </CustomTabPanel>
        </Box>

        {/* Actions en bas */}
        <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            onClick={() => navigate('/recipes')}
            size="large"
          >
            Retour aux recettes
          </Button>
          <Button
            variant="contained"
            startIcon={<FitnessCenter />}
            onClick={() => navigate('/nutrition')}
            size="large"
          >
            Calculateur nutritionnel
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default RecipeDetailPage;
