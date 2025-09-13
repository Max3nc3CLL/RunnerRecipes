import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Contexts
import { AuthProvider } from './contexts/AuthContext';
import { RecipeProvider } from './contexts/RecipeContext';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';

// Pages
import HomePage from './pages/HomePage';
import RecipesPage from './pages/RecipesPage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import NutritionPage from './pages/NutritionPage';
import LoginPage from './pages/LoginPage';

// Theme moderne avec la nouvelle palette de couleurs
const theme = createTheme({
  palette: {
    primary: {
      main: '#F98807',
      light: '#FFB231',
      dark: '#E67E00',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#4ADE80',
      light: '#6EE7B7',
      dark: '#22C55E',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F6F7F9',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#262730',
      secondary: '#474A5D',
    },
    grey: {
      50: '#F6F7F9',
      100: '#EDEDF1',
      200: '#D7D9E0',
      300: '#B3B7C6',
      400: '#8A8FA6',
      500: '#6C738B',
      600: '#565B73',
      700: '#474A5D',
      800: '#3D404F',
      900: '#363844',
    },
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    h1: {
      fontSize: '48px',
      fontWeight: 800,
      lineHeight: 1.1,
      color: '#262730',
    },
    h2: {
      fontSize: '36px',
      fontWeight: 700,
      lineHeight: 1.2,
      color: '#262730',
    },
    h3: {
      fontSize: '24px',
      fontWeight: 600,
      lineHeight: 1.3,
      color: '#262730',
    },
    h4: {
      fontSize: '20px',
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#262730',
    },
    h5: {
      fontSize: '18px',
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#262730',
    },
    h6: {
      fontSize: '16px',
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#262730',
    },
    body1: {
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: 1.6,
      color: '#474A5D',
    },
    body2: {
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: 1.5,
      color: '#565B73',
    },
    caption: {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: 1.5,
      color: '#6C738B',
    },
  },
  shape: {
    borderRadius: 16,
  },
  shadows: [
    'none',
    '0 1px 3px rgba(38, 39, 48, 0.12), 0 1px 2px rgba(38, 39, 48, 0.24)',
    '0 4px 6px rgba(38, 39, 48, 0.07), 0 2px 4px rgba(38, 39, 48, 0.06)',
    '0 10px 15px rgba(38, 39, 48, 0.1), 0 4px 6px rgba(38, 39, 48, 0.05)',
    '0 20px 25px rgba(38, 39, 48, 0.1), 0 10px 10px rgba(38, 39, 48, 0.04)',
    '0 25px 50px rgba(38, 39, 48, 0.15)',
    '0 25px 50px rgba(38, 39, 48, 0.15)',
    '0 25px 50px rgba(38, 39, 48, 0.15)',
    '0 25px 50px rgba(38, 39, 48, 0.15)',
    '0 25px 50px rgba(38, 39, 48, 0.15)',
    '0 25px 50px rgba(38, 39, 48, 0.15)',
    '0 25px 50px rgba(38, 39, 48, 0.15)',
    '0 25px 50px rgba(38, 39, 48, 0.15)',
    '0 25px 50px rgba(38, 39, 48, 0.15)',
    '0 25px 50px rgba(38, 39, 48, 0.15)',
    '0 25px 50px rgba(38, 39, 48, 0.15)',
    '0 25px 50px rgba(38, 39, 48, 0.15)',
    '0 25px 50px rgba(38, 39, 48, 0.15)',
    '0 25px 50px rgba(38, 39, 48, 0.15)',
    '0 25px 50px rgba(38, 39, 48, 0.15)',
    '0 25px 50px rgba(38, 39, 48, 0.15)',
    '0 25px 50px rgba(38, 39, 48, 0.15)',
    '0 25px 50px rgba(38, 39, 48, 0.15)',
    '0 25px 50px rgba(38, 39, 48, 0.15)',
    '0 25px 50px rgba(38, 39, 48, 0.15)',
    '0 25px 50px rgba(38, 39, 48, 0.15)',
  ] as any,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: '16px',
          padding: '12px 24px',
          transition: 'all 0.2s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #F98807 0%, #FFB231 100%)',
          boxShadow: '0 4px 20px rgba(249, 136, 7, 0.3)',
          '&:hover': {
            background: 'linear-gradient(135deg, #E67E00 0%, #F98807 100%)',
            boxShadow: '0 8px 30px rgba(249, 136, 7, 0.4)',
          },
        },
        outlined: {
          borderColor: 'rgba(38, 39, 48, 0.12)',
          color: '#474A5D',
          '&:hover': {
            borderColor: 'rgba(38, 39, 48, 0.18)',
            backgroundColor: 'rgba(38, 39, 48, 0.04)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          boxShadow: '0 4px 40px rgba(38, 39, 48, 0.08)',
          border: '1px solid rgba(38, 39, 48, 0.06)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 20px 60px rgba(38, 39, 48, 0.15)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '50px',
          fontWeight: 600,
        },
        filled: {
          background: 'linear-gradient(135deg, #F98807 0%, #FFB231 100%)',
          color: '#FFFFFF',
          boxShadow: '0 2px 12px rgba(249, 136, 7, 0.25)',
        },
        outlined: {
          borderColor: 'rgba(38, 39, 48, 0.12)',
          color: '#474A5D',
          backgroundColor: 'rgba(38, 39, 48, 0.04)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(38, 39, 48, 0.08)',
          boxShadow: '0 1px 30px rgba(0, 0, 0, 0.04)',
        },
      },
    },
  },
});

// Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ErrorBoundary>
          <AuthProvider>
            <RecipeProvider>
              <Router>
                <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                  <Header />
                  <Box component="main" sx={{ flexGrow: 1 }}>
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/login" element={<LoginPage />} />
                      <Route path="/recipes" element={<RecipesPage />} />
                      <Route path="/recipes/:id" element={<RecipeDetailPage />} />
                      <Route path="/nutrition" element={<NutritionPage />} />
                      <Route path="/favorites" element={<div>Favorites Page</div>} />
                      <Route path="/meal-planner" element={<div>Meal Planner Page</div>} />
                      <Route path="/profile" element={<div>Profile Page</div>} />
                      <Route path="/settings" element={<div>Settings Page</div>} />
                      <Route path="/search" element={<div>Search Page</div>} />
                      <Route path="*" element={<div>404 - Page not found</div>} />
                    </Routes>
                  </Box>
                  <Footer />
                </Box>
              </Router>
            </RecipeProvider>
          </AuthProvider>
        </ErrorBoundary>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
