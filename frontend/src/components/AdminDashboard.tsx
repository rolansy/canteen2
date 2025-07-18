// src/components/AdminDashboard.tsx
import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Alert,
} from '@mui/material';
import { 
  TrendingUp, 
  Receipt, 
  Restaurant,
  Analytics as AnalyticsIcon,
  People 
} from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../config/api';

interface SalesAnalytics {
  daily_sales: Array<{date: string, total: number, orders: number}>;
  top_items: Array<{name: string, quantity: number, revenue: number}>;
  total_orders: number;
  total_revenue: number;
  pending_orders: number;
}

interface Order {
  id: number;
  user: { name: string };
  total_amount: number;
  status: string;
  order_time: string;
  order_items: Array<{
    menu_item: { name: string };
    quantity: number;
  }>;
}

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [analytics, setAnalytics] = useState<SalesAnalytics | null>(null);
  const [pendingOrders, setPendingOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const fetchAnalytics = React.useCallback(async () => {
    try {
      const response = await api.get('/analytics/sales');
      setAnalytics(response.data);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    }
  }, []);

  const fetchPendingOrders = React.useCallback(async () => {
    try {
      const response = await api.get('/orders');
      const pending = response.data.filter((order: Order) => order.status === 'pending');
      setPendingOrders(pending);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
  }, []);

  useEffect(() => {
    fetchAnalytics();
    fetchPendingOrders();
  }, [fetchAnalytics, fetchPendingOrders]);

  const updateOrderStatus = async (orderId: number, status: string) => {
    setLoading(true);
    try {
      await api.put(`/orders/${orderId}/status`, { status });
      setMessage({ type: 'success', text: `Order ${status} successfully!` });
      fetchPendingOrders(); // Refresh orders
    } catch {
      setMessage({ type: 'error', text: 'Failed to update order status.' });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'confirmed': return 'info';
      case 'preparing': return 'primary';
      case 'ready': return 'success';
      case 'completed': return 'default';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  if (!user || user.role !== 'admin') return null;

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard - St. Xavier's Canteen
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

      {/* Stats Cards */}
      {analytics && (
        <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap={3} mb={4}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <TrendingUp color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Total Revenue</Typography>
              </Box>
              <Typography variant="h3" color="primary">
                ₹{analytics.total_revenue.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <Receipt color="secondary" sx={{ mr: 1 }} />
                <Typography variant="h6">Total Orders</Typography>
              </Box>
              <Typography variant="h3" color="secondary">
                {analytics.total_orders}
              </Typography>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <People color="warning.main" sx={{ mr: 1 }} />
                <Typography variant="h6">Pending Orders</Typography>
              </Box>
              <Typography variant="h3" color="warning.main">
                {analytics.pending_orders}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      )}

      <Box display="grid" gridTemplateColumns="2fr 1fr" gap={3} mb={4}>
        {/* Sales Chart */}
        {analytics && analytics.daily_sales.length > 0 && (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Daily Sales (Last 7 Days)</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analytics.daily_sales}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`₹${value}`, 'Revenue']} />
                  <Line type="monotone" dataKey="total" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        {/* Top Items */}
        {analytics && analytics.top_items.length > 0 && (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Top Selling Items</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analytics.top_items.slice(0, 5)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [value, 'Quantity']} />
                  <Bar dataKey="quantity" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}
      </Box>

      {/* Quick Actions */}
      <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={2} mb={4}>
        <Button 
          variant="outlined" 
          startIcon={<Restaurant />}
          onClick={() => navigate('/menu')}
          fullWidth
        >
          Manage Menu
        </Button>
        <Button 
          variant="outlined" 
          startIcon={<Receipt />}
          onClick={() => navigate('/orders')}
          fullWidth
        >
          All Orders
        </Button>
        <Button 
          variant="outlined" 
          startIcon={<AnalyticsIcon />}
          onClick={() => navigate('/analytics')}
          fullWidth
        >
          Detailed Analytics
        </Button>
      </Box>

      {/* Pending Orders */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>Pending Orders</Typography>
          {pendingOrders.length === 0 ? (
            <Typography color="text.secondary">No pending orders</Typography>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Order ID</TableCell>
                    <TableCell>Student</TableCell>
                    <TableCell>Items</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pendingOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>#{order.id}</TableCell>
                      <TableCell>{order.user.name}</TableCell>
                      <TableCell>
                        {order.order_items.map(item => 
                          `${item.menu_item.name} x${item.quantity}`
                        ).join(', ')}
                      </TableCell>
                      <TableCell>₹{order.total_amount}</TableCell>
                      <TableCell>
                        <Chip 
                          label={order.status} 
                          color={getStatusColor(order.status) as 'warning' | 'info' | 'primary' | 'success' | 'default' | 'error'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Box display="flex" gap={1}>
                          <Button 
                            size="small" 
                            variant="outlined" 
                            color="primary"
                            onClick={() => updateOrderStatus(order.id, 'confirmed')}
                            disabled={loading}
                          >
                            Confirm
                          </Button>
                          <Button 
                            size="small" 
                            variant="outlined" 
                            color="error"
                            onClick={() => updateOrderStatus(order.id, 'cancelled')}
                            disabled={loading}
                          >
                            Cancel
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default AdminDashboard;
