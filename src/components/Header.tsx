// Composant Header avec navigation et authentification
import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Box,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search,
  Favorite,
  Person,
  Settings,
  Logout,
  Home,
  Restaurant,
  FitnessCenter,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import GoogleSignInButton from './GoogleSignInButton';

const Header: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { user, signOut, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };


  const handleSignOut = async () => {
    try {
      await signOut();
      handleMenuClose();
    } catch (error) {
      console.error('Erreur de déconnexion:', error);
    }
  };

  const navigationItems = [
    { label: 'Accueil', path: '/', icon: <Home /> },
    { label: 'Recettes', path: '/recipes', icon: <Restaurant /> },
    { label: 'Nutrition', path: '/nutrition', icon: <FitnessCenter /> },
    { label: 'Planificateur', path: '/meal-planner', icon: <FitnessCenter /> },
    { label: 'Favoris', path: '/favorites', icon: <Favorite /> },
  ];

  const renderDesktopMenu = () => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      {navigationItems.map((item) => (
        <Button
          key={item.path}
          onClick={() => navigate(item.path)}
          sx={{
            color: location.pathname === item.path ? '#F98807' : '#474A5D',
            fontWeight: location.pathname === item.path ? 600 : 500,
            padding: '12px 20px',
            borderRadius: '12px',
            transition: 'all 0.2s ease',
            textTransform: 'none',
            fontSize: '15px',
            '&:hover': {
              background: 'linear-gradient(135deg, #F98807 0%, #FFB231 100%)',
              color: 'white',
              transform: 'translateY(-1px)',
              boxShadow: '0 4px 20px rgba(249, 136, 7, 0.3)',
            },
          }}
        >
          {item.label}
        </Button>
      ))}
      
      <IconButton 
        onClick={() => navigate('/search')}
        sx={{ 
          color: '#474A5D',
          marginLeft: 1,
          padding: '10px',
          borderRadius: '12px',
          transition: 'all 0.2s ease',
          '&:hover': {
            background: 'rgba(249, 136, 7, 0.1)',
            color: '#F98807',
            transform: 'translateY(-1px)',
          },
        }}
      >
        <Search />
      </IconButton>

      {isAuthenticated ? (
        <>
          <IconButton
            onClick={handleMenuOpen}
            sx={{ 
              ml: 1,
              padding: '8px',
              borderRadius: '12px',
              transition: 'all 0.2s ease',
              '&:hover': {
                background: 'rgba(249, 136, 7, 0.1)',
                transform: 'translateY(-1px)',
              },
            }}
          >
            <Avatar
              src={user?.photoURL}
              alt={user?.name}
              sx={{ 
                width: 36, 
                height: 36,
                border: '2px solid rgba(249, 136, 7, 0.2)',
                boxShadow: '0 2px 8px rgba(249, 136, 7, 0.2)',
              }}
            />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{
              sx: {
                borderRadius: '16px',
                boxShadow: '0 20px 60px rgba(38, 39, 48, 0.15)',
                border: '1px solid rgba(38, 39, 48, 0.06)',
                mt: 1,
              },
            }}
          >
            <MenuItem 
              onClick={() => { navigate('/profile'); handleMenuClose(); }}
              sx={{
                padding: '12px 20px',
                borderRadius: '12px',
                margin: '4px 8px',
                transition: 'all 0.2s ease',
                '&:hover': {
                  background: 'rgba(249, 136, 7, 0.1)',
                },
              }}
            >
              <ListItemIcon>
                <Person fontSize="small" sx={{ color: '#F98807' }} />
              </ListItemIcon>
              <ListItemText 
                primary="Profil" 
                primaryTypographyProps={{ 
                  color: '#262730',
                  fontWeight: 500,
                }}
              />
            </MenuItem>
            <MenuItem 
              onClick={() => { navigate('/settings'); handleMenuClose(); }}
              sx={{
                padding: '12px 20px',
                borderRadius: '12px',
                margin: '4px 8px',
                transition: 'all 0.2s ease',
                '&:hover': {
                  background: 'rgba(249, 136, 7, 0.1)',
                },
              }}
            >
              <ListItemIcon>
                <Settings fontSize="small" sx={{ color: '#F98807' }} />
              </ListItemIcon>
              <ListItemText 
                primary="Paramètres" 
                primaryTypographyProps={{ 
                  color: '#262730',
                  fontWeight: 500,
                }}
              />
            </MenuItem>
            <MenuItem 
              onClick={handleSignOut}
              sx={{
                padding: '12px 20px',
                borderRadius: '12px',
                margin: '4px 8px',
                transition: 'all 0.2s ease',
                '&:hover': {
                  background: 'rgba(220, 38, 38, 0.1)',
                },
              }}
            >
              <ListItemIcon>
                <Logout fontSize="small" sx={{ color: '#DC2626' }} />
              </ListItemIcon>
              <ListItemText 
                primary="Déconnexion" 
                primaryTypographyProps={{ 
                  color: '#DC2626',
                  fontWeight: 500,
                }}
              />
            </MenuItem>
          </Menu>
        </>
      ) : (
        <Box sx={{ ml: 2 }}>
          <GoogleSignInButton
            variant="contained"
            size="medium"
            onSuccess={() => {
              // Optionnel: redirection ou action après connexion
            }}
            onError={(error) => {
              console.error('Erreur de connexion:', error);
            }}
          />
        </Box>
      )}
    </Box>
  );

  const renderMobileMenu = () => (
    <>
      <IconButton
        onClick={() => setMobileMenuOpen(true)}
        sx={{ 
          ml: 'auto',
          color: '#474A5D',
          padding: '10px',
          borderRadius: '12px',
          transition: 'all 0.2s ease',
          '&:hover': {
            background: 'rgba(249, 136, 7, 0.1)',
            color: '#F98807',
            transform: 'translateY(-1px)',
          },
        }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        PaperProps={{
          sx: {
            width: 280,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderLeft: '1px solid rgba(38, 39, 48, 0.08)',
          },
        }}
      >
        <Box sx={{ width: 280, pt: 3, px: 2 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: '#262730',
              mb: 3,
              px: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Box
              component="span"
              sx={{
                fontSize: '20px',
                filter: 'drop-shadow(0 2px 4px rgba(249, 136, 7, 0.3))',
              }}
            >
              🏃‍♂️
            </Box>
            Menu
          </Typography>
          
          <List sx={{ px: 1 }}>
            {navigationItems.map((item) => (
              <ListItem
                key={item.path}
                component="button"
                onClick={() => {
                  navigate(item.path);
                  setMobileMenuOpen(false);
                }}
                sx={{
                  backgroundColor: location.pathname === item.path 
                    ? 'rgba(249, 136, 7, 0.1)' 
                    : 'transparent',
                  borderRadius: '12px',
                  margin: '4px 0',
                  padding: '12px 16px',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(249, 136, 7, 0.1)',
                    transform: 'translateX(4px)',
                  },
                }}
              >
                <ListItemIcon sx={{ color: '#F98807', minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.label}
                  primaryTypographyProps={{
                    color: location.pathname === item.path ? '#F98807' : '#262730',
                    fontWeight: location.pathname === item.path ? 600 : 500,
                  }}
                />
              </ListItem>
            ))}
            
            <ListItem 
              component="button" 
              onClick={() => { navigate('/search'); setMobileMenuOpen(false); }}
              sx={{
                borderRadius: '12px',
                margin: '4px 0',
                padding: '12px 16px',
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: 'rgba(249, 136, 7, 0.1)',
                  transform: 'translateX(4px)',
                },
              }}
            >
              <ListItemIcon sx={{ color: '#F98807', minWidth: 40 }}>
                <Search />
              </ListItemIcon>
              <ListItemText 
                primary="Recherche"
                primaryTypographyProps={{
                  color: '#262730',
                  fontWeight: 500,
                }}
              />
            </ListItem>

            {isAuthenticated ? (
              <>
                <ListItem 
                  component="button" 
                  onClick={() => { navigate('/profile'); setMobileMenuOpen(false); }}
                  sx={{
                    borderRadius: '12px',
                    margin: '4px 0',
                    padding: '12px 16px',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(249, 136, 7, 0.1)',
                      transform: 'translateX(4px)',
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: '#F98807', minWidth: 40 }}>
                    <Person />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Profil"
                    primaryTypographyProps={{
                      color: '#262730',
                      fontWeight: 500,
                    }}
                  />
                </ListItem>
                <ListItem 
                  component="button" 
                  onClick={() => { navigate('/settings'); setMobileMenuOpen(false); }}
                  sx={{
                    borderRadius: '12px',
                    margin: '4px 0',
                    padding: '12px 16px',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(249, 136, 7, 0.1)',
                      transform: 'translateX(4px)',
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: '#F98807', minWidth: 40 }}>
                    <Settings />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Paramètres"
                    primaryTypographyProps={{
                      color: '#262730',
                      fontWeight: 500,
                    }}
                  />
                </ListItem>
                <ListItem 
                  component="button" 
                  onClick={handleSignOut}
                  sx={{
                    borderRadius: '12px',
                    margin: '4px 0',
                    padding: '12px 16px',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(220, 38, 38, 0.1)',
                      transform: 'translateX(4px)',
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: '#DC2626', minWidth: 40 }}>
                    <Logout />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Déconnexion"
                    primaryTypographyProps={{
                      color: '#DC2626',
                      fontWeight: 500,
                    }}
                  />
                </ListItem>
              </>
            ) : (
              <Box sx={{ p: 2 }}>
                <GoogleSignInButton
                  variant="contained"
                  size="medium"
                  fullWidth
                  onSuccess={() => {
                    setMobileMenuOpen(false);
                  }}
                  onError={(error) => {
                    console.error('Erreur de connexion:', error);
                  }}
                />
              </Box>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );

  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{ 
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(38, 39, 48, 0.08)',
        boxShadow: '0 1px 30px rgba(0, 0, 0, 0.04)',
      }}
    >
      <Toolbar sx={{ minHeight: '72px !important' }}>
        <Typography
          variant="h5"
          component="div"
          sx={{
            flexGrow: 1,
            fontWeight: 800,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            color: '#262730',
            fontSize: '24px',
            '&:hover': {
              color: '#F98807',
              transition: 'color 0.2s ease',
            },
          }}
          onClick={() => navigate('/')}
        >
          <Box
            component="span"
            sx={{
              fontSize: '28px',
              filter: 'drop-shadow(0 2px 4px rgba(249, 136, 7, 0.3))',
            }}
          >
            🏃‍♂️
          </Box>
          Runner Recipes
        </Typography>
        
        {isMobile ? renderMobileMenu() : renderDesktopMenu()}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
