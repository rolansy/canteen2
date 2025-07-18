// src/components/Login.tsx
import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Alert,
} from '@mui/material';
import { Google, Restaurant } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const { signInWithGoogle } = useAuth();
  const [role, setRole] = useState<'student' | 'admin'>('student');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    
    try {
      await signInWithGoogle(role);
    } catch (error) {
      setError('Failed to sign in with Google. Please try again.');
      console.error('Sign-in error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" className="fade-in">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, rgba(46, 125, 50, 0.1) 0%, rgba(255, 107, 53, 0.1) 100%)',
        }}
      >
        <Paper
          elevation={12}
          className="glass-card"
          sx={{
            p: 5,
            width: '100%',
            maxWidth: 480,
            borderRadius: 4,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            transform: 'translateY(0)',
            transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              transform: 'translateY(-8px)',
              boxShadow: '0 20px 40px rgba(46, 125, 50, 0.15)',
            },
          }}
        >
          <Box textAlign="center" mb={5} className="slide-in-down">
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #2E7D32 0%, #FF6B35 100%)',
                mb: 3,
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: -4,
                  left: -4,
                  right: -4,
                  bottom: -4,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #2E7D32, #FF6B35)',
                  zIndex: -1,
                  opacity: 0.3,
                  animation: 'pulse 2s infinite',
                },
              }}
            >
              <Restaurant sx={{ fontSize: 40, color: 'white' }} />
            </Box>
            <Typography 
              variant="h3" 
              gutterBottom
              sx={{
                fontWeight: 700,
                background: 'linear-gradient(135deg, #2E7D32 0%, #FF6B35 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1,
              }}
            >
              St. Xavier's Canteen
            </Typography>
            <Typography 
              variant="h5" 
              sx={{ 
                color: 'primary.main', 
                fontWeight: 500,
                mb: 1,
              }}
            >
              When the Bell Rings
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: 'text.secondary',
                fontSize: '1.1rem',
                fontWeight: 400,
              }}
            >
              Skip the queue, order ahead, and never miss a meal!
            </Typography>
          </Box>

          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                mb: 4,
                borderRadius: 2,
                '& .MuiAlert-icon': {
                  fontSize: '1.5rem',
                },
              }}
              className="shake"
            >
              {error}
            </Alert>
          )}

          <FormControl 
            component="fieldset" 
            sx={{ mb: 4, width: '100%' }}
            className="slide-in-left"
          >
            <FormLabel 
              component="legend"
              sx={{
                fontSize: '1.1rem',
                fontWeight: 600,
                color: 'primary.main',
                mb: 2,
              }}
            >
              I am a:
            </FormLabel>
            <RadioGroup
              row
              value={role}
              onChange={(e) => setRole(e.target.value as 'student' | 'admin')}
              sx={{ justifyContent: 'center', gap: 2 }}
            >
              <FormControlLabel 
                value="student" 
                control={
                  <Radio 
                    sx={{
                      '&.Mui-checked': {
                        color: 'primary.main',
                        transform: 'scale(1.1)',
                      },
                      transition: 'all 0.3s ease',
                    }} 
                  />
                } 
                label={
                  <Typography sx={{ fontWeight: 500, fontSize: '1rem' }}>
                    Student
                  </Typography>
                }
                sx={{
                  '& .MuiFormControlLabel-label': {
                    transition: 'all 0.3s ease',
                  },
                  '&:hover .MuiFormControlLabel-label': {
                    color: 'primary.main',
                  },
                }}
              />
              <FormControlLabel 
                value="admin" 
                control={
                  <Radio 
                    sx={{
                      '&.Mui-checked': {
                        color: 'secondary.main',
                        transform: 'scale(1.1)',
                      },
                      transition: 'all 0.3s ease',
                    }} 
                  />
                } 
                label={
                  <Typography sx={{ fontWeight: 500, fontSize: '1rem' }}>
                    Admin (Chandrettan)
                  </Typography>
                }
                sx={{
                  '& .MuiFormControlLabel-label': {
                    transition: 'all 0.3s ease',
                  },
                  '&:hover .MuiFormControlLabel-label': {
                    color: 'secondary.main',
                  },
                }}
              />
            </RadioGroup>
          </FormControl>

          <Button
            variant="contained"
            fullWidth
            size="large"
            startIcon={<Google />}
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="slide-in-right"
            sx={{
              py: 2,
              fontSize: '1.1rem',
              fontWeight: 600,
              borderRadius: 3,
              textTransform: 'none',
              background: loading 
                ? 'linear-gradient(135deg, rgba(46, 125, 50, 0.6) 0%, rgba(255, 107, 53, 0.6) 100%)'
                : 'linear-gradient(135deg, #2E7D32 0%, #FF6B35 100%)',
              boxShadow: '0 8px 25px rgba(46, 125, 50, 0.3)',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: '-100%',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                transition: 'left 0.6s',
              },
              '&:hover::before': {
                left: '100%',
              },
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 12px 35px rgba(46, 125, 50, 0.4)',
              },
              '&:active': {
                transform: 'translateY(0)',
              },
              '&:disabled': {
                background: 'linear-gradient(135deg, rgba(46, 125, 50, 0.6) 0%, rgba(255, 107, 53, 0.6) 100%)',
                color: 'rgba(255, 255, 255, 0.7)',
              },
            }}
          >
            {loading ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box
                  sx={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    borderTop: '2px solid white',
                    animation: 'spin 1s linear infinite',
                  }}
                />
                Signing in...
              </Box>
            ) : (
              'Continue with Google'
            )}
          </Button>

          <Box mt={4} textAlign="center" className="fade-in-up">
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'text.secondary',
                fontSize: '0.9rem',
                lineHeight: 1.6,
              }}
            >
              By signing in, you agree to our terms of service
              <br />
              <Box 
                component="span" 
                sx={{ 
                  color: 'primary.main', 
                  fontWeight: 500,
                  cursor: 'pointer',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                Learn more about our privacy policy
              </Box>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
