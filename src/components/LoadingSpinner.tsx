// Composant de chargement avec animation
import React from 'react';
import {
  Box,
  CircularProgress,
  Typography,
  Fade,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  message?: string;
  size?: number;
  fullScreen?: boolean;
  color?: 'primary' | 'secondary' | 'inherit';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = 'Chargement...',
  size = 40,
  fullScreen = false,
  color = 'primary',
}) => {
  const theme = useTheme();

  const containerStyle = fullScreen
    ? {
        position: 'fixed' as const,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        bgcolor: 'rgba(255, 255, 255, 0.9)',
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        justifyContent: 'center',
      }
    : {
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
      };

  return (
    <Fade in={true} timeout={300}>
      <Box sx={containerStyle}>
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <CircularProgress size={size} color={color} />
        </motion.div>
        
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                mt: 2,
                textAlign: 'center',
                fontWeight: 500,
              }}
            >
              {message}
            </Typography>
          </motion.div>
        )}
      </Box>
    </Fade>
  );
};

export default LoadingSpinner;
