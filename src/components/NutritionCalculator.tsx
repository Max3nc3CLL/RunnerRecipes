// Composant calculateur nutritionnel personnalisé
import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Calculate,
  LocalFireDepartment,
  WaterDrop,
  Speed,
} from '@mui/icons-material';
import { NutritionCalculator } from '../types';
import { ACTIVITY_LEVELS, NUTRITION_GOALS } from '../constants';

interface NutritionCalculatorProps {
  onCalculate?: (results: any) => void;
  initialData?: Partial<NutritionCalculator>;
}

const NutritionCalculatorComponent: React.FC<NutritionCalculatorProps> = ({
  onCalculate,
  initialData,
}) => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [formData, setFormData] = useState<NutritionCalculator>({
    weight: initialData?.weight || 70,
    height: initialData?.height || 175,
    age: initialData?.age || 30,
    gender: initialData?.gender || 'male',
    activityLevel: initialData?.activityLevel || 'moderate',
    trainingIntensity: initialData?.trainingIntensity || 'medium',
    trainingDuration: initialData?.trainingDuration || 300, // 5h par semaine
    goals: initialData?.goals || 'maintenance',
  });

  const calculateNutrition = async () => {
    setLoading(true);
    try {
      // Simulation d'un calcul (en production, ceci appellerait l'API)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const { weight, height, age, gender, activityLevel, trainingIntensity, trainingDuration, goals } = formData;
      
      // Calcul du métabolisme de base (formule de Mifflin-St Jeor)
      let bmr;
      if (gender === 'male') {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
      } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
      }
      
      // Facteur d'activité
      const activityMultiplier = ACTIVITY_LEVELS.find(level => level.value === activityLevel)?.multiplier || 1.55;
      
      // Ajustement pour l'entraînement
      const trainingMultiplier = trainingIntensity === 'low' ? 1.1 : trainingIntensity === 'medium' ? 1.2 : 1.3;
      const trainingHours = trainingDuration / 60;
      const trainingAdjustment = trainingHours * 200; // 200 cal par heure d'entraînement
      
      // Besoins caloriques totaux
      let totalCalories = bmr * activityMultiplier * trainingMultiplier + trainingAdjustment;
      
      // Ajustement selon les objectifs
      if (goals === 'weight_loss') {
        totalCalories *= 0.85; // Déficit de 15%
      } else if (goals === 'muscle_gain') {
        totalCalories *= 1.15; // Surplus de 15%
      } else if (goals === 'performance') {
        totalCalories *= 1.1; // Surplus de 10% pour la performance
      }
      
      // Répartition des macronutriments
      const proteinRatio = goals === 'muscle_gain' ? 0.25 : 0.2;
      const carbRatio = trainingIntensity === 'high' ? 0.6 : 0.55;
      const fatRatio = 1 - proteinRatio - carbRatio;
      
      const proteinGrams = Math.round((totalCalories * proteinRatio) / 4);
      const carbGrams = Math.round((totalCalories * carbRatio) / 4);
      const fatGrams = Math.round((totalCalories * fatRatio) / 9);
      
      // Besoins en eau (ml par kg de poids corporel)
      const waterNeeds = Math.round(weight * 35 + (trainingDuration / 60) * 500);
      
      // Électrolytes estimés
      const sodiumNeeds = Math.round(1500 + (trainingDuration / 60) * 500);
      const potassiumNeeds = Math.round(3500 + (trainingDuration / 60) * 200);
      const magnesiumNeeds = Math.round(400 + (trainingDuration / 60) * 50);
      
      const calculatedResults = {
        bmr: Math.round(bmr),
        totalCalories: Math.round(totalCalories),
        macronutrients: {
          proteins: proteinGrams,
          carbohydrates: carbGrams,
          fats: fatGrams,
        },
        hydration: {
          water: waterNeeds,
          sodium: sodiumNeeds,
          potassium: potassiumNeeds,
          magnesium: magnesiumNeeds,
        },
        recommendations: generateRecommendations(goals, trainingIntensity, trainingDuration),
      };
      
      setResults(calculatedResults);
      if (onCalculate) {
        onCalculate(calculatedResults);
      }
    } catch (error) {
      console.error('Erreur lors du calcul:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateRecommendations = (goals: string, intensity: string, duration: number) => {
    const recommendations = [];
    
    if (goals === 'weight_loss') {
      recommendations.push('Déficit calorique modéré pour une perte de poids saine');
      recommendations.push('Privilégiez les protéines pour préserver la masse musculaire');
    } else if (goals === 'muscle_gain') {
      recommendations.push('Surplus calorique pour favoriser la prise de muscle');
      recommendations.push('Consommez des protéines à chaque repas');
    } else if (goals === 'performance') {
      recommendations.push('Optimisez vos réserves de glycogène');
      recommendations.push('Hydratation et électrolytes essentiels');
    }
    
    if (intensity === 'high') {
      recommendations.push('Récupération active avec glucides et protéines');
      recommendations.push('Antioxydants pour réduire l\'inflammation');
    }
    
    if (duration > 300) { // Plus de 5h par semaine
      recommendations.push('Alimentation riche en fer et B12');
      recommendations.push('Planification des repas pour l\'endurance');
    }
    
    return recommendations;
  };

  const handleInputChange = (field: keyof NutritionCalculator, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({ ...prev, ...initialData }));
    }
  }, [initialData]);

  return (
    <Box>
      <Card 
        className="animate-fade-in-up"
        sx={{ 
          mb: 3,
          background: 'white',
          borderRadius: '20px',
          boxShadow: '0 4px 40px rgba(38, 39, 48, 0.08)',
          border: '1px solid rgba(38, 39, 48, 0.06)',
          overflow: 'hidden',
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography 
            variant="h4" 
            component="h2" 
            sx={{ 
              mb: 4, 
              display: 'flex', 
              alignItems: 'center', 
              gap: 2,
              fontWeight: 700,
              color: '#262730',
              fontSize: '28px',
            }}
          >
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #F98807 0%, #FFB231 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 20px rgba(249, 136, 7, 0.3)',
              }}
            >
              <Calculate sx={{ color: 'white', fontSize: '24px' }} />
            </Box>
            Calculateur Nutritionnel
          </Typography>
          
          <Grid container spacing={3}>
            {/* Informations personnelles */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Poids (kg)"
                type="number"
                value={formData.weight}
                onChange={(e) => handleInputChange('weight', Number(e.target.value))}
                inputProps={{ min: 30, max: 200 }}
              />
            </Grid>
            
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Taille (cm)"
                type="number"
                value={formData.height}
                onChange={(e) => handleInputChange('height', Number(e.target.value))}
                inputProps={{ min: 100, max: 250 }}
              />
            </Grid>
            
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Âge (années)"
                type="number"
                value={formData.age}
                onChange={(e) => handleInputChange('age', Number(e.target.value))}
                inputProps={{ min: 16, max: 100 }}
              />
            </Grid>
            
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Sexe</InputLabel>
                <Select
                  value={formData.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                >
                  <MenuItem value="male">Homme</MenuItem>
                  <MenuItem value="female">Femme</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            {/* Activité physique */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Niveau d'activité</InputLabel>
                <Select
                  value={formData.activityLevel}
                  onChange={(e) => handleInputChange('activityLevel', e.target.value)}
                >
                  {ACTIVITY_LEVELS.map((level) => (
                    <MenuItem key={level.value} value={level.value}>
                      {level.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Intensité d'entraînement</InputLabel>
                <Select
                  value={formData.trainingIntensity}
                  onChange={(e) => handleInputChange('trainingIntensity', e.target.value)}
                >
                  <MenuItem value="low">Faible</MenuItem>
                  <MenuItem value="medium">Modérée</MenuItem>
                  <MenuItem value="high">Élevée</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Durée d'entraînement (min/semaine)"
                type="number"
                value={formData.trainingDuration}
                onChange={(e) => handleInputChange('trainingDuration', Number(e.target.value))}
                inputProps={{ min: 0, max: 1680 }}
              />
            </Grid>
            
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Objectifs</InputLabel>
                <Select
                  value={formData.goals}
                  onChange={(e) => handleInputChange('goals', e.target.value)}
                >
                  {NUTRITION_GOALS.map((goal) => (
                    <MenuItem key={goal.value} value={goal.value}>
                      {goal.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Button
              variant="contained"
              size="large"
              onClick={calculateNutrition}
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} sx={{ color: 'white' }} /> : <Calculate />}
              sx={{ 
                px: 6, 
                py: 2,
                fontSize: '16px',
                fontWeight: 600,
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #F98807 0%, #FFB231 100%)',
                boxShadow: '0 4px 20px rgba(249, 136, 7, 0.3)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #E67E00 0%, #F98807 100%)',
                  boxShadow: '0 8px 30px rgba(249, 136, 7, 0.4)',
                  transform: 'translateY(-2px)',
                },
                '&:disabled': {
                  background: 'rgba(38, 39, 48, 0.12)',
                  color: 'rgba(38, 39, 48, 0.38)',
                  boxShadow: 'none',
                },
              }}
            >
              {loading ? 'Calcul en cours...' : 'Calculer mes besoins'}
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Résultats */}
      {results && (
        <Card 
          className="animate-fade-in-up"
          sx={{
            background: 'white',
            borderRadius: '20px',
            boxShadow: '0 4px 40px rgba(38, 39, 48, 0.08)',
            border: '1px solid rgba(38, 39, 48, 0.06)',
            overflow: 'hidden',
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Typography 
              variant="h4" 
              component="h3" 
              sx={{ 
                mb: 4, 
                display: 'flex', 
                alignItems: 'center', 
                gap: 2,
                fontWeight: 700,
                color: '#262730',
                fontSize: '28px',
              }}
            >
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #4ADE80 0%, #22C55E 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 20px rgba(74, 222, 128, 0.3)',
                }}
              >
                <LocalFireDepartment sx={{ color: 'white', fontSize: '24px' }} />
              </Box>
              Vos Besoins Nutritionnels
            </Typography>
            
            <Grid container spacing={4}>
              {/* Calories */}
              <Grid size={{ xs: 12, md: 4 }}>
                <Box 
                  sx={{ 
                    textAlign: 'center', 
                    p: 4, 
                    background: 'linear-gradient(135deg, #F98807 0%, #FFB231 100%)',
                    borderRadius: '20px', 
                    color: 'white',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: '0 8px 30px rgba(249, 136, 7, 0.3)',
                  }}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      width: 100,
                      height: 100,
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '50%',
                      transform: 'translate(30px, -30px)',
                    }}
                  />
                  <Typography variant="h3" sx={{ fontWeight: 800, mb: 1, position: 'relative', zIndex: 1 }}>
                    {results.totalCalories}
                  </Typography>
                  <Typography variant="h6" sx={{ mb: 2, position: 'relative', zIndex: 1, opacity: 0.95 }}>
                    Calories/jour
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8, position: 'relative', zIndex: 1 }}>
                    Métabolisme de base: {results.bmr} cal
                  </Typography>
                </Box>
              </Grid>
              
              {/* Macronutriments */}
              <Grid size={{ xs: 12, md: 8 }}>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    mb: 3, 
                    fontWeight: 600,
                    color: '#262730',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  Macronutriments
                </Typography>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 4 }}>
                    <Box 
                      sx={{ 
                        textAlign: 'center',
                        p: 3,
                        background: 'linear-gradient(135deg, #4ADE80 0%, #22C55E 100%)',
                        borderRadius: '16px',
                        color: 'white',
                        position: 'relative',
                        overflow: 'hidden',
                        boxShadow: '0 4px 20px rgba(74, 222, 128, 0.3)',
                      }}
                    >
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          width: 60,
                          height: 60,
                          background: 'rgba(255, 255, 255, 0.1)',
                          borderRadius: '50%',
                          transform: 'translate(20px, -20px)',
                        }}
                      />
                      <Typography 
                        variant="h4" 
                        sx={{ 
                          fontWeight: 800, 
                          mb: 1, 
                          position: 'relative', 
                          zIndex: 1,
                        }}
                      >
                        {results.macronutrients.proteins}g
                      </Typography>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          fontWeight: 600,
                          position: 'relative', 
                          zIndex: 1,
                          opacity: 0.9,
                        }}
                      >
                        Protéines
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 4 }}>
                    <Box 
                      sx={{ 
                        textAlign: 'center',
                        p: 3,
                        background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
                        borderRadius: '16px',
                        color: 'white',
                        position: 'relative',
                        overflow: 'hidden',
                        boxShadow: '0 4px 20px rgba(59, 130, 246, 0.3)',
                      }}
                    >
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          width: 60,
                          height: 60,
                          background: 'rgba(255, 255, 255, 0.1)',
                          borderRadius: '50%',
                          transform: 'translate(20px, -20px)',
                        }}
                      />
                      <Typography 
                        variant="h4" 
                        sx={{ 
                          fontWeight: 800, 
                          mb: 1, 
                          position: 'relative', 
                          zIndex: 1,
                        }}
                      >
                        {results.macronutrients.carbohydrates}g
                      </Typography>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          fontWeight: 600,
                          position: 'relative', 
                          zIndex: 1,
                          opacity: 0.9,
                        }}
                      >
                        Glucides
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 4 }}>
                    <Box 
                      sx={{ 
                        textAlign: 'center',
                        p: 3,
                        background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
                        borderRadius: '16px',
                        color: 'white',
                        position: 'relative',
                        overflow: 'hidden',
                        boxShadow: '0 4px 20px rgba(139, 92, 246, 0.3)',
                      }}
                    >
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          width: 60,
                          height: 60,
                          background: 'rgba(255, 255, 255, 0.1)',
                          borderRadius: '50%',
                          transform: 'translate(20px, -20px)',
                        }}
                      />
                      <Typography 
                        variant="h4" 
                        sx={{ 
                          fontWeight: 800, 
                          mb: 1, 
                          position: 'relative', 
                          zIndex: 1,
                        }}
                      >
                        {results.macronutrients.fats}g
                      </Typography>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          fontWeight: 600,
                          position: 'relative', 
                          zIndex: 1,
                          opacity: 0.9,
                        }}
                      >
                        Lipides
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
              
              {/* Hydratation */}
              <Grid size={{ xs: 12 }}>
                <Box sx={{ my: 4 }}>
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      mb: 3, 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 2,
                      fontWeight: 600,
                      color: '#262730',
                    }}
                  >
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 20px rgba(59, 130, 246, 0.3)',
                      }}
                    >
                      <WaterDrop sx={{ color: 'white', fontSize: '20px' }} />
                    </Box>
                    Hydratation
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid size={{ xs: 6, sm: 3 }}>
                      <Box 
                        sx={{ 
                          textAlign: 'center',
                          p: 3,
                          background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
                          borderRadius: '16px',
                          color: 'white',
                          boxShadow: '0 4px 20px rgba(59, 130, 246, 0.3)',
                        }}
                      >
                        <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
                          {results.hydration.water}ml
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600, opacity: 0.9 }}>
                          Eau/jour
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid size={{ xs: 6, sm: 3 }}>
                      <Box 
                        sx={{ 
                          textAlign: 'center',
                          p: 3,
                          background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                          borderRadius: '16px',
                          color: 'white',
                          boxShadow: '0 4px 20px rgba(245, 158, 11, 0.3)',
                        }}
                      >
                        <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
                          {results.hydration.sodium}mg
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600, opacity: 0.9 }}>
                          Sodium
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid size={{ xs: 6, sm: 3 }}>
                      <Box 
                        sx={{ 
                          textAlign: 'center',
                          p: 3,
                          background: 'linear-gradient(135deg, #4ADE80 0%, #22C55E 100%)',
                          borderRadius: '16px',
                          color: 'white',
                          boxShadow: '0 4px 20px rgba(74, 222, 128, 0.3)',
                        }}
                      >
                        <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
                          {results.hydration.potassium}mg
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600, opacity: 0.9 }}>
                          Potassium
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid size={{ xs: 6, sm: 3 }}>
                      <Box 
                        sx={{ 
                          textAlign: 'center',
                          p: 3,
                          background: 'linear-gradient(135deg, #F98807 0%, #FFB231 100%)',
                          borderRadius: '16px',
                          color: 'white',
                          boxShadow: '0 4px 20px rgba(249, 136, 7, 0.3)',
                        }}
                      >
                        <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
                          {results.hydration.magnesium}mg
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600, opacity: 0.9 }}>
                          Magnésium
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              
              {/* Recommandations */}
              <Grid size={{ xs: 12 }}>
                <Box sx={{ my: 4 }}>
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      mb: 3, 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 2,
                      fontWeight: 600,
                      color: '#262730',
                    }}
                  >
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, #4ADE80 0%, #22C55E 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 20px rgba(74, 222, 128, 0.3)',
                      }}
                    >
                      <Speed sx={{ color: 'white', fontSize: '20px' }} />
                    </Box>
                    Recommandations
                  </Typography>
                  {results.recommendations.map((recommendation: string, index: number) => (
                    <Alert 
                      key={index} 
                      severity="info" 
                      sx={{ 
                        mb: 2,
                        borderRadius: '12px',
                        background: 'rgba(59, 130, 246, 0.05)',
                        border: '1px solid rgba(59, 130, 246, 0.1)',
                        '& .MuiAlert-icon': {
                          color: '#3B82F6',
                        },
                        '& .MuiAlert-message': {
                          color: '#262730',
                          fontWeight: 500,
                        },
                      }}
                    >
                      {recommendation}
                    </Alert>
                  ))}
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default NutritionCalculatorComponent;
