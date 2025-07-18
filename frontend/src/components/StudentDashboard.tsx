// src/components/StudentDashboard.tsx
import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  Chip,
} from '@mui/material';
import { 
  AccountBalanceWallet, 
  Restaurant, 
  Receipt,
  TrendingUp 
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface UserAnalytics {
  daily_spending: Array<{date: string, total: number}>;
  favorite_items: Array<{name: string, quantity: number}>;
  total_spent: number;
  credit_balance: number;
}

const StudentDashboard: React.FC = () => {
  const { user, updateUserCredit } = useAuth();
  const navigate = useNavigate();
  const [creditDialogOpen, setCreditDialogOpen] = useState(false);
  const [creditAmount, setCreditAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [analytics, setAnalytics] = useState<UserAnalytics | null>(null);

  const fetchAnalytics = React.useCallback(async () => {
    try {
      // Mock analytics data for demo
      setAnalytics({
        daily_spending: [
          { date: '2025-07-15', total: 80 },
          { date: '2025-07-16', total: 45 },
          { date: '2025-07-17', total: 120 },
        ],
        favorite_items: [
          { name: 'Kerala Meals', quantity: 5 },
          { name: 'Chai', quantity: 8 },
          { name: 'Pazhampori', quantity: 3 },
        ],
        total_spent: 245,
        credit_balance: user?.credit_balance || 0
      });
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    }
  }, [user?.credit_balance]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  const addCredit = async () => {
    const amount = parseFloat(creditAmount);
    if (!amount || amount <= 0) {
      setMessage({ type: 'error', text: 'Please enter a valid amount' });
      return;
    }

    setLoading(true);
    try {
      await updateUserCredit(amount);
      setCreditDialogOpen(false);
      setCreditAmount('');
      setMessage({ type: 'success', text: `Successfully added ₹${amount} to your account!` });
    } catch {
      setMessage({ type: 'error', text: 'Failed to add credit. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Welcome back, {user.name}!
      </Typography>

      {message && (
        <Alert 
          severity={message.type} 
          onClose={() => setMessage(null)}
          sx={{ mb: 3 }}
        >
          {message.text}
        </Alert>
      )}

      <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={3} mb={4}>
        {/* Credit Balance Card */}
        <Card>
          <CardContent>
            <Box display="flex" alignItems="center" mb={2}>
              <AccountBalanceWallet color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">Credit Balance</Typography>
            </Box>
            <Typography variant="h3" color="primary" gutterBottom>
              ₹{user.credit_balance.toFixed(2)}
            </Typography>
            <Button 
              variant="contained" 
              onClick={() => setCreditDialogOpen(true)}
              fullWidth
            >
              Add Credit
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>Quick Actions</Typography>
            <Box display="flex" flexDirection="column" gap={2}>
              <Button 
                variant="outlined" 
                startIcon={<Restaurant />}
                onClick={() => navigate('/menu')}
                fullWidth
              >
                Browse Menu
              </Button>
              <Button 
                variant="outlined" 
                startIcon={<Receipt />}
                onClick={() => navigate('/orders')}
                fullWidth
              >
                My Orders
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* Analytics Summary */}
        {analytics && (
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <TrendingUp color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Your Stats</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Total Spent: ₹{analytics.total_spent.toFixed(2)}
              </Typography>
              {analytics.favorite_items.length > 0 && (
                <Box>
                  <Typography variant="body2" gutterBottom>
                    Top Item:
                  </Typography>
                  <Chip 
                    label={`${analytics.favorite_items[0].name} (${analytics.favorite_items[0].quantity}x)`}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                </Box>
              )}
            </CardContent>
          </Card>
        )}
      </Box>

      {/* Recent Activity or other sections can be added here */}

      {/* Add Credit Dialog */}
      <Dialog open={creditDialogOpen} onClose={() => setCreditDialogOpen(false)}>
        <DialogTitle>Add Credit</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Amount (₹)"
            type="number"
            fullWidth
            variant="outlined"
            value={creditAmount}
            onChange={(e) => setCreditAmount(e.target.value)}
            inputProps={{ min: 1, step: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreditDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={addCredit} 
            variant="contained" 
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Credit'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default StudentDashboard;
