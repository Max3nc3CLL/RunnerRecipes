// Composant wrapper pour les animations
import React from 'react';
import { Box, BoxProps } from '@mui/material';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface AnimatedWrapperProps extends BoxProps {
  animation?: 'fadeInUp' | 'fadeIn' | 'scaleIn' | 'slideInRight' | 'slideInLeft' | 'bounceIn';
  delay?: number;
  duration?: number;
  triggerOnce?: boolean;
  threshold?: number;
  children: React.ReactNode;
}

const AnimatedWrapper: React.FC<AnimatedWrapperProps> = ({
  animation = 'fadeInUp',
  delay = 0,
  duration = 600,
  triggerOnce = true,
  threshold = 0.1,
  children,
  sx,
  ...props
}) => {
  const { elementRef, isVisible } = useScrollAnimation({
    threshold,
    triggerOnce,
  });

  const getAnimationClass = () => {
    if (!isVisible) return 'animate-on-scroll';
    return `animate-${animation}`;
  };

  const animationStyle = {
    animationDelay: `${delay}ms`,
    animationDuration: `${duration}ms`,
  };

  return (
    <Box
      ref={elementRef}
      className={getAnimationClass()}
      sx={{
        ...animationStyle,
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default AnimatedWrapper;
