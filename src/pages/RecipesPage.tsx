// Page des recettes avec filtres et recherche
import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Button,
  Slider,
  // useTheme, // Plus nécessaire
  // useMediaQuery, // Plus nécessaire
  Pagination,
  CircularProgress,
} from '@mui/material';
import {
  Search,
  FilterList,
  Clear,
  Star,
} from '@mui/icons-material';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useRecipes } from '../contexts/RecipeContext';
// import { useAuth } from '../contexts/AuthContext'; // TODO: Utiliser l'authentification
import RecipeCard from '../components/RecipeCard';
import { RECIPE_CATEGORIES, DIFFICULTY_LEVELS } from '../constants';
import { SearchFilters } from '../types';

const RecipesPage: React.FC = () => {
  // const theme = useTheme(); // Plus nécessaire
  // const isMobile = useMediaQuery(theme.breakpoints.down('md')); // Plus nécessaire
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  // const { } = useAuth(); // TODO: Utiliser l'authentification
  const {
    recipes,
    loading,
    error,
    currentPage,
    totalPages,
    totalRecipes,
    fetchRecipes,
    searchRecipes,
    updateFilters,
    clearFilters,
  } = useRecipes();

  const [searchQuery, setSearchQuery] = useState('');
  const [localFilters, setLocalFilters] = useState<SearchFilters>({
    categories: [],
    difficulty: [],
    prepTime: undefined,
    calories: undefined,
    rating: undefined,
  });

  // const [showFilters, setShowFilters] = useState(!isMobile); // Plus nécessaire car filtres toujours visibles

  // Initialiser les filtres depuis l'URL (une seule fois)
  useEffect(() => {
    const category = searchParams.get('category');
    const query = searchParams.get('q');
    
    if (category) {
      setLocalFilters(prev => ({ ...prev, categories: [category] }));
    }
    
    if (query) {
      setSearchQuery(query);
    }
  }, [searchParams]);

  // Charger les recettes quand les filtres changent
  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      searchRecipes(query, localFilters);
    } else {
      fetchRecipes(localFilters);
    }
  }, [localFilters, searchParams, fetchRecipes, searchRecipes]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      searchRecipes(searchQuery, localFilters);
      setSearchParams({ q: searchQuery });
    } else {
      fetchRecipes(localFilters);
      setSearchParams({});
    }
  };

  const handleFilterChange = (filterType: keyof SearchFilters, value: any) => {
    const newFilters = { ...localFilters, [filterType]: value };
    setLocalFilters(newFilters);
    updateFilters(newFilters);
  };

  const handleClearFilters = () => {
    setLocalFilters({});
    clearFilters();
    setSearchQuery('');
    setSearchParams({});
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    fetchRecipes(localFilters, page);
  };

  const renderFilters = () => (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
          <FilterList />
          Filtres
        </Typography>
        <Button
          variant="outlined"
          size="small"
          onClick={handleClearFilters}
          startIcon={<Clear />}
        >
          Effacer
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Recherche */}
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="Rechercher une recette"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            InputProps={{
              endAdornment: (
                <Button
                  variant="contained"
                  onClick={handleSearch}
                  sx={{ ml: 1 }}
                >
                  <Search />
                </Button>
              ),
            }}
          />
        </Grid>

        {/* Catégories */}
        <Grid size={{ xs: 12, md: 6 }}>
          <FormControl fullWidth>
            <InputLabel>Catégories</InputLabel>
            <Select
              multiple
              value={localFilters.categories || []}
              onChange={(e) => handleFilterChange('categories', e.target.value)}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => {
                    const category = RECIPE_CATEGORIES.find(cat => cat.id === value);
                    return (
                      <Chip
                        key={value}
                        label={category?.name || value}
                        size="small"
                        sx={{ bgcolor: category?.color, color: 'white' }}
                      />
                    );
                  })}
                </Box>
              )}
            >
              {RECIPE_CATEGORIES.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <span>{category.icon}</span>
                    {category.name}
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Difficulté */}
        <Grid size={{ xs: 12, md: 6 }}>
          <FormControl fullWidth>
            <InputLabel>Difficulté</InputLabel>
            <Select
              multiple
              value={localFilters.difficulty || []}
              onChange={(e) => handleFilterChange('difficulty', e.target.value)}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => {
                    const level = DIFFICULTY_LEVELS.find(lev => lev.value === value);
                    return (
                      <Chip
                        key={value}
                        label={level?.label || value}
                        size="small"
                        sx={{ bgcolor: level?.color, color: 'white' }}
                      />
                    );
                  })}
                </Box>
              )}
            >
              {DIFFICULTY_LEVELS.map((level) => (
                <MenuItem key={level.value} value={level.value}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        bgcolor: level.color,
                      }}
                    />
                    {level.label}
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Temps de préparation */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography gutterBottom>Temps de préparation (max)</Typography>
          <Slider
            value={localFilters.prepTime || 60}
            onChange={(_, value) => handleFilterChange('prepTime', value)}
            min={15}
            max={180}
            step={15}
            marks={[
              { value: 15, label: '15min' },
              { value: 60, label: '1h' },
              { value: 120, label: '2h' },
              { value: 180, label: '3h' },
            ]}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `${value}min`}
          />
        </Grid>

        {/* Calories */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography gutterBottom>Calories par portion</Typography>
          <Slider
            value={[
              localFilters.calories?.min || 0,
              localFilters.calories?.max || 1000,
            ]}
            onChange={(_, value) => {
              const [min, max] = value as number[];
              handleFilterChange('calories', { min, max });
            }}
            min={0}
            max={1000}
            step={50}
            marks={[
              { value: 0, label: '0' },
              { value: 250, label: '250' },
              { value: 500, label: '500' },
              { value: 750, label: '750' },
              { value: 1000, label: '1000' },
            ]}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `${value} cal`}
          />
        </Grid>

        {/* Note minimale */}
        <Grid size={{ xs: 12 }}>
          <Typography gutterBottom>Note minimale</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Star color="warning" />
            <Slider
              value={localFilters.rating || 0}
              onChange={(_, value) => handleFilterChange('rating', value)}
              min={0}
              max={5}
              step={0.5}
              marks={[
                { value: 0, label: 'Toutes' },
                { value: 3, label: '3★' },
                { value: 4, label: '4★' },
                { value: 5, label: '5★' },
              ]}
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => `${value}★`}
            />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* En-tête */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 'bold',
            mb: 2,
          }}
        >
          Recettes pour Coureurs
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {totalRecipes} recettes trouvées
        </Typography>
      </Box>

      {/* Filtres au-dessus de la liste */}
      {renderFilters()}

      {/* Liste des recettes */}
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress size={60} />
            </Box>
          ) : error ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" color="error" gutterBottom>
                Erreur lors du chargement
              </Typography>
              <Typography color="text.secondary">
                {error}
              </Typography>
              <Button
                variant="contained"
                onClick={() => fetchRecipes()}
                sx={{ mt: 2 }}
              >
                Réessayer
              </Button>
            </Box>
          ) : recipes.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" gutterBottom>
                Aucune recette trouvée
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 3 }}>
                Essayez de modifier vos critères de recherche
              </Typography>
              <Button
                variant="outlined"
                onClick={handleClearFilters}
              >
                Effacer les filtres
              </Button>
            </Box>
          ) : (
            <>
              <Grid container spacing={3}>
                {recipes.map((recipe) => (
                  <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={recipe.id}>
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

              {/* Pagination */}
              {totalPages > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                    size="large"
                  />
                </Box>
              )}
            </>
          )}
    </Container>
  );
};

export default RecipesPage;
