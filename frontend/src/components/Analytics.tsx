// src/components/Analytics.tsx
import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { useAuth } from '../context/AuthContext';
import api from '../config/api';

interface SalesAnalytics {
  daily_sales: Array<{date: string, total: number, orders: number}>;
  top_items: Array<{name: string, quantity: number, revenue: number}>;
  total_orders: number;
  total_revenue: number;
  pending_orders: number;
}

interface UserAnalytics {
  daily_spending: Array<{date: string, total: number}>;
  favorite_items: Array<{name: string, quantity: number}>;
  total_spent: number;
  credit_balance: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const Analytics: React.FC = () => {
  const { user } = useAuth();
  const [salesAnalytics, setSalesAnalytics] = useState<SalesAnalytics | null>(null);
  const [userAnalytics, setUserAnalytics] = useState<UserAnalytics | null>(null);

  const fetchSalesAnalytics = React.useCallback(async () => {
    if (user?.role !== 'admin') return;
    try {
      const response = await api.get('/analytics/sales');
      setSalesAnalytics(response.data);
    } catch (error) {
      console.error('Failed to fetch sales analytics:', error);
    }
  }, [user?.role]);

  const fetchUserAnalytics = React.useCallback(async () => {
    try {
      const response = await api.get('/analytics/user/' + user?.id);
      setUserAnalytics(response.data);
    } catch (error) {
      console.error('Failed to fetch user analytics:', error);
    }
  }, [user?.id]);

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchSalesAnalytics();
    } else {
      fetchUserAnalytics();
    }
  }, [user?.role, fetchSalesAnalytics, fetchUserAnalytics]);

  if (!user) return null;

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        {user.role === 'admin' ? 'Sales Analytics' : 'My Spending Analytics'}
      </Typography>

      {user.role === 'admin' && salesAnalytics ? (
        <Box>
          {/* Sales Overview */}
          <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={3} mb={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Total Revenue</Typography>
                <Typography variant="h3" color="primary">
                  ₹{salesAnalytics.total_revenue.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Total Orders</Typography>
                <Typography variant="h3" color="secondary">
                  {salesAnalytics.total_orders}
                </Typography>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Pending Orders</Typography>
                <Typography variant="h3" color="warning.main">
                  {salesAnalytics.pending_orders}
                </Typography>
              </CardContent>
            </Card>
          </Box>

          {/* Charts */}
          <Box display="grid" gridTemplateColumns="2fr 1fr" gap={3} mb={4}>
            {/* Daily Sales Chart */}
            {salesAnalytics.daily_sales.length > 0 && (
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>Daily Sales Trend</Typography>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={salesAnalytics.daily_sales}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`₹${value}`, 'Revenue']} />
                      <Line type="monotone" dataKey="total" stroke="#8884d8" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            )}

            {/* Top Items Pie Chart */}
            {salesAnalytics.top_items.length > 0 && (
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>Top Items Distribution</Typography>
                  <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                      <Pie
                        data={salesAnalytics.top_items.slice(0, 5)}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="quantity"
                      >
                        {salesAnalytics.top_items.slice(0, 5).map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            )}
          </Box>

          {/* Top Items Table */}
          {salesAnalytics.top_items.length > 0 && (
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Top Selling Items</Typography>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Item</TableCell>
                        <TableCell>Quantity Sold</TableCell>
                        <TableCell>Revenue</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {salesAnalytics.top_items.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell>₹{item.revenue.toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          )}
        </Box>
      ) : userAnalytics ? (
        <Box>
          {/* User Spending Overview */}
          <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={3} mb={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Total Spent</Typography>
                <Typography variant="h3" color="primary">
                  ₹{userAnalytics.total_spent.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Credit Balance</Typography>
                <Typography variant="h3" color="success.main">
                  ₹{userAnalytics.credit_balance.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Box>

          {/* User Charts */}
          <Box display="grid" gridTemplateColumns="2fr 1fr" gap={3} mb={4}>
            {/* Daily Spending Chart */}
            {userAnalytics.daily_spending.length > 0 && (
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>Daily Spending (Last 30 Days)</Typography>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={userAnalytics.daily_spending}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`₹${value}`, 'Spent']} />
                      <Bar dataKey="total" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            )}

            {/* Favorite Items */}
            {userAnalytics.favorite_items.length > 0 && (
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>Your Favorite Items</Typography>
                  <TableContainer>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Item</TableCell>
                          <TableCell>Orders</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {userAnalytics.favorite_items.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            )}
          </Box>
        </Box>
      ) : (
        <Typography>Loading analytics...</Typography>
      )}
    </Container>
  );
};

export default Analytics;
