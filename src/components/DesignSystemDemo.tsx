// Composant de démonstration du système de design moderne
import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import {
  LocalFireDepartment,
  WaterDrop,
  Speed,
  Restaurant,
  FitnessCenter,
  Favorite,
} from '@mui/icons-material';
import ModernButton from './ModernButton';
import MacroCard from './MacroCard';
import RatingStars from './RatingStars';
import AnimatedWrapper from './AnimatedWrapper';

const DesignSystemDemo: React.FC = () => {
  return (
    <Box sx={{ p: 4, maxWidth: 1200, mx: 'auto' }}>
      <AnimatedWrapper animation="fadeInUp">
        <Typography variant="h2" sx={{ mb: 4, textAlign: 'center', color: '#262730' }}>
          🎨 Système de Design Moderne
        </Typography>
      </AnimatedWrapper>

      {/* Palette de couleurs */}
      <AnimatedWrapper animation="fadeInUp" delay={200}>
        <Card sx={{ mb: 4, p: 3 }}>
          <Typography variant="h4" sx={{ mb: 3, color: '#262730' }}>
            Palette de Couleurs
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Box
                  sx={{
                    width: '100%',
                    height: 80,
                    background: 'linear-gradient(135deg, #F98807 0%, #FFB231 100%)',
                    borderRadius: '12px',
                    mb: 1,
                  }}
                />
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Primary Orange
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Box
                  sx={{
                    width: '100%',
                    height: 80,
                    background: 'linear-gradient(135deg, #4ADE80 0%, #22C55E 100%)',
                    borderRadius: '12px',
                    mb: 1,
                  }}
                />
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Success Green
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Box
                  sx={{
                    width: '100%',
                    height: 80,
                    background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
                    borderRadius: '12px',
                    mb: 1,
                  }}
                />
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Info Blue
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Box
                  sx={{
                    width: '100%',
                    height: 80,
                    background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
                    borderRadius: '12px',
                    mb: 1,
                  }}
                />
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Purple
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </AnimatedWrapper>

      {/* Boutons modernes */}
      <AnimatedWrapper animation="fadeInUp" delay={400}>
        <Card sx={{ mb: 4, p: 3 }}>
          <Typography variant="h4" sx={{ mb: 3, color: '#262730' }}>
            Boutons Modernes
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3 }}>
            <ModernButton variant="primary" icon={<Restaurant />}>
              Bouton Principal
            </ModernButton>
            <ModernButton variant="secondary">
              Bouton Secondaire
            </ModernButton>
            <ModernButton variant="success" icon={<FitnessCenter />}>
              Succès
            </ModernButton>
            <ModernButton variant="outline">
              Outline
            </ModernButton>
            <ModernButton variant="ghost">
              Ghost
            </ModernButton>
          </Box>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <ModernButton variant="primary" size="small">
              Petit
            </ModernButton>
            <ModernButton variant="primary" size="medium">
              Moyen
            </ModernButton>
            <ModernButton variant="primary" size="large">
              Grand
            </ModernButton>
            <ModernButton variant="primary" loading>
              Chargement
            </ModernButton>
          </Box>
        </Card>
      </AnimatedWrapper>

      {/* Cartes macro-nutriments */}
      <AnimatedWrapper animation="fadeInUp" delay={600}>
        <Card sx={{ mb: 4, p: 3 }}>
          <Typography variant="h4" sx={{ mb: 3, color: '#262730' }}>
            Cartes Macro-nutriments
          </Typography>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <MacroCard
                icon={<LocalFireDepartment sx={{ color: 'white', fontSize: '24px' }} />}
                value={2500}
                label="Calories"
                unit="cal"
                color="primary"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <MacroCard
                icon={<Restaurant sx={{ color: 'white', fontSize: '24px' }} />}
                value={150}
                label="Protéines"
                unit="g"
                color="success"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <MacroCard
                icon={<FitnessCenter sx={{ color: 'white', fontSize: '24px' }} />}
                value={300}
                label="Glucides"
                unit="g"
                color="info"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <MacroCard
                icon={<WaterDrop sx={{ color: 'white', fontSize: '24px' }} />}
                value={80}
                label="Lipides"
                unit="g"
                color="purple"
              />
            </Grid>
          </Grid>
        </Card>
      </AnimatedWrapper>

      {/* Système de notation */}
      <AnimatedWrapper animation="fadeInUp" delay={800}>
        <Card sx={{ mb: 4, p: 3 }}>
          <Typography variant="h4" sx={{ mb: 3, color: '#262730' }}>
            Système de Notation
          </Typography>
          <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap', alignItems: 'center' }}>
            <Box>
              <Typography variant="body1" sx={{ mb: 1, fontWeight: 600 }}>
                Petite taille
              </Typography>
              <RatingStars rating={4.5} size="small" showValue showCount reviewCount={24} />
            </Box>
            <Box>
              <Typography variant="body1" sx={{ mb: 1, fontWeight: 600 }}>
                Taille moyenne
              </Typography>
              <RatingStars rating={4.2} size="medium" showValue showCount reviewCount={156} />
            </Box>
            <Box>
              <Typography variant="body1" sx={{ mb: 1, fontWeight: 600 }}>
                Grande taille
              </Typography>
              <RatingStars rating={4.8} size="large" showValue showCount reviewCount={89} />
            </Box>
            <Box>
              <Typography variant="body1" sx={{ mb: 1, fontWeight: 600 }}>
                Interactif
              </Typography>
              <RatingStars rating={3.5} size="medium" showValue interactive />
            </Box>
          </Box>
        </Card>
      </AnimatedWrapper>

      {/* Animations */}
      <AnimatedWrapper animation="fadeInUp" delay={1000}>
        <Card sx={{ mb: 4, p: 3 }}>
          <Typography variant="h4" sx={{ mb: 3, color: '#262730' }}>
            Animations et Effets
          </Typography>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Box
                className="hover-lift"
                sx={{
                  p: 3,
                  background: 'white',
                  borderRadius: '16px',
                  border: '1px solid rgba(38, 39, 48, 0.06)',
                  textAlign: 'center',
                }}
              >
                <Typography variant="h6" sx={{ color: '#262730' }}>
                  Hover Lift
                </Typography>
                <Typography variant="body2" sx={{ color: '#6C738B' }}>
                  Survolez pour voir l'effet
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Box
                className="hover-scale"
                sx={{
                  p: 3,
                  background: 'linear-gradient(135deg, #F98807 0%, #FFB231 100%)',
                  borderRadius: '16px',
                  textAlign: 'center',
                  color: 'white',
                }}
              >
                <Typography variant="h6">
                  Hover Scale
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Survolez pour voir l'effet
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Box
                className="hover-glow animate-pulse"
                sx={{
                  p: 3,
                  background: 'linear-gradient(135deg, #4ADE80 0%, #22C55E 100%)',
                  borderRadius: '16px',
                  textAlign: 'center',
                  color: 'white',
                }}
              >
                <Typography variant="h6">
                  Hover Glow
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Survolez pour voir l'effet
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </AnimatedWrapper>

      {/* Typography */}
      <AnimatedWrapper animation="fadeInUp" delay={1200}>
        <Card sx={{ p: 3 }}>
          <Typography variant="h4" sx={{ mb: 3, color: '#262730' }}>
            Typography Moderne
          </Typography>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h1" sx={{ mb: 2 }}>
              Titre H1 - 48px
            </Typography>
            <Typography variant="h2" sx={{ mb: 2 }}>
              Titre H2 - 36px
            </Typography>
            <Typography variant="h3" sx={{ mb: 2 }}>
              Titre H3 - 24px
            </Typography>
            <Typography variant="h4" sx={{ mb: 2 }}>
              Titre H4 - 20px
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Texte de corps - 16px. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Texte secondaire - 14px. Sed do eiusmod tempor incididunt ut labore.
            </Typography>
            <Typography variant="caption">
              Texte de légende - 12px. Duis aute irure dolor in reprehenderit.
            </Typography>
          </Box>
        </Card>
      </AnimatedWrapper>
    </Box>
  );
};

export default DesignSystemDemo;
