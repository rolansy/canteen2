import React from 'react';
import { Box, CircularProgress, Typography, useTheme } from '@mui/material';
import { keyframes } from '@emotion/react';

const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const LoadingSpinner: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.grey[50]} 100%)`,
        animation: `${fadeIn} 0.5s ease-out`,
      }}
    >
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          animation: `${pulse} 2s ease-in-out infinite`,
        }}
      >
        <CircularProgress
          size={60}
          thickness={4}
          sx={{
            color: theme.palette.primary.main,
            '& .MuiCircularProgress-circle': {
              strokeLinecap: 'round',
            },
          }}
        />
        <Typography
          variant="h6"
          sx={{
            mt: 3,
            color: theme.palette.text.secondary,
            fontWeight: 500,
            letterSpacing: '0.5px',
          }}
        >
          St. Xavier's Canteen
        </Typography>
        <Typography
          variant="body2"
          sx={{
            mt: 1,
            color: theme.palette.text.secondary,
            opacity: 0.7,
          }}
        >
          Loading your experience...
        </Typography>
      </Box>
    </Box>
  );
};

export default LoadingSpinner;
