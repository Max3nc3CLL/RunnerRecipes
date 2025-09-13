// Page du calculateur nutritionnel
import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  useTheme,
} from '@mui/material';
import {
  Calculate,
  FitnessCenter,
  Restaurant,
  LocalFireDepartment,
  WaterDrop,
} from '@mui/icons-material';
import NutritionCalculatorComponent from '../components/NutritionCalculator';
import { useAuth } from '../contexts/AuthContext';

const NutritionPage: React.FC = () => {
  const theme = useTheme();
  const { user } = useAuth();

  const handleCalculate = (results: any) => {
    console.log('Résultats du calcul:', results);
    // Ici, on pourrait sauvegarder les résultats dans le profil utilisateur
  };

  const nutritionTips = [
    {
      icon: <FitnessCenter />,
      title: 'Pré-entraînement',
      description: 'Consommez des glucides complexes 2-3h avant l\'effort pour optimiser vos réserves énergétiques.',
      color: theme.palette.primary.main,
    },
    {
      icon: <Restaurant />,
      title: 'Post-entraînement',
      description: 'Récupérez avec un ratio 3:1 glucides/protéines dans les 30 minutes suivant l\'effort.',
      color: theme.palette.secondary.main,
    },
    {
      icon: <WaterDrop />,
      title: 'Hydratation',
      description: 'Buvez 500ml d\'eau 2h avant l\'effort et 150-250ml toutes les 15-20min pendant.',
      color: theme.palette.info.main,
    },
    {
      icon: <LocalFireDepartment />,
      title: 'Récupération',
      description: 'Les antioxydants et les électrolytes sont essentiels pour une récupération optimale.',
      color: theme.palette.warning.main,
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* En-tête */}
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: 'bold',
            mb: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
          }}
        >
          <Calculate color="primary" />
          Calculateur Nutritionnel
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ maxWidth: 600, mx: 'auto' }}
        >
          Calculez vos besoins nutritionnels personnalisés selon votre profil sportif
          et vos objectifs d'entraînement.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Calculateur principal */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <NutritionCalculatorComponent
            onCalculate={handleCalculate}
            initialData={user?.sportProfile ? {
              weight: user.sportProfile.weight,
              height: user.sportProfile.height,
              age: 30, // À récupérer du profil utilisateur
              gender: 'male', // À récupérer du profil utilisateur
              activityLevel: 'moderate',
              trainingIntensity: 'medium',
              trainingDuration: 300,
              goals: user.sportProfile.goals === 'endurance' ? 'performance' : 'maintenance',
            } : undefined}
          />
        </Grid>

        {/* Conseils et informations */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Box sx={{ position: 'sticky', top: 20 }}>
            {/* Conseils nutritionnels */}
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 'bold' }}>
                Conseils Nutritionnels
              </Typography>
              <Grid container spacing={2}>
                {nutritionTips.map((tip, index) => (
                  <Grid size={{ xs: 12 }} key={index}>
                    <Card
                      sx={{
                        p: 2,
                        borderLeft: `4px solid ${tip.color}`,
                        '&:hover': {
                          boxShadow: theme.shadows[4],
                        },
                      }}
                    >
                      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                          <Box sx={{ color: tip.color, mt: 0.5 }}>
                            {tip.icon}
                          </Box>
                          <Box>
                            <Typography
                              variant="subtitle1"
                              sx={{ fontWeight: 'bold', mb: 1 }}
                            >
                              {tip.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {tip.description}
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>

            {/* Informations sur les macronutriments */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 'bold' }}>
                Macronutriments
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1, color: 'primary.main' }}>
                  🥩 Protéines
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Essentielles pour la récupération musculaire. Sources végétales : légumineuses, quinoa, noix.
                </Typography>
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1, color: 'secondary.main' }}>
                  🍞 Glucides
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Carburant principal de l'effort. Privilégiez les glucides complexes : avoine, patate douce, quinoa.
                </Typography>
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1, color: 'info.main' }}>
                  🥑 Lipides
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Importants pour l'absorption des vitamines. Sources saines : avocat, noix, graines, huile d'olive.
                </Typography>
              </Box>
              
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1, color: 'success.main' }}>
                  💧 Hydratation
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Cruciale pour la performance. Eau, boissons électrolytes, fruits et légumes riches en eau.
                </Typography>
              </Box>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default NutritionPage;
