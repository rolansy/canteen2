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
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box textAlign="center" mb={4}>
          <Restaurant sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
          <Typography variant="h4" gutterBottom>
            St. Xavier's Canteen
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            When the Bell Rings
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Skip the queue, order ahead, and never miss a meal!
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <FormControl component="fieldset" sx={{ mb: 3, width: '100%' }}>
          <FormLabel component="legend">I am a:</FormLabel>
          <RadioGroup
            row
            value={role}
            onChange={(e) => setRole(e.target.value as 'student' | 'admin')}
            sx={{ justifyContent: 'center', mt: 1 }}
          >
            <FormControlLabel value="student" control={<Radio />} label="Student" />
            <FormControlLabel value="admin" control={<Radio />} label="Admin (Chandrettan)" />
          </RadioGroup>
        </FormControl>

        <Button
          variant="contained"
          fullWidth
          size="large"
          startIcon={<Google />}
          onClick={handleGoogleSignIn}
          disabled={loading}
          sx={{ py: 1.5 }}
        >
          {loading ? 'Signing in...' : 'Continue with Google'}
        </Button>

        <Box mt={3} textAlign="center">
          <Typography variant="body2" color="text.secondary">
            By signing in, you agree to our terms of service
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
