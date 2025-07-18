// src/components/Orders.tsx
import React, { useState } from 'react';
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
  Chip,
  Button,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';

interface Order {
  id: number;
  user: { name: string };
  total_amount: number;
  status: string;
  order_time: string;
  pickup_time?: string;
  notes?: string;
  order_items: Array<{
    id: number;
    menu_item: { name: string, price: number };
    quantity: number;
    total_price: number;
  }>;
}

const Orders: React.FC = () => {
  const { user } = useAuth();
  const { orders, updateOrderStatus: updateStatus } = useOrders();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // Filter orders based on user role
  const displayedOrders = user?.role === 'admin' 
    ? orders 
    : orders.filter(order => order.user_id === user?.id);

  const handleUpdateOrderStatus = async (orderId: number, status: string) => {
    setLoading(true);
    try {
                            updateStatus(orderId, status as 'pending' | 'confirmed' | 'preparing' | 'ready' | 'completed' | 'cancelled');
      setMessage({ type: 'success', text: `Order ${status} successfully!` });
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

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const canUpdateStatus = (currentStatus: string, newStatus: string) => {
    const statusFlow = ['pending', 'confirmed', 'preparing', 'ready', 'completed'];
    const currentIndex = statusFlow.indexOf(currentStatus);
    const newIndex = statusFlow.indexOf(newStatus);
    return newIndex > currentIndex || newStatus === 'cancelled';
  };

  if (!user) return null;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        {user.role === 'admin' ? 'All Orders' : 'My Orders'}
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

      <Card>
        <CardContent>
          {displayedOrders.length === 0 ? (
            <Typography color="text.secondary">No orders found</Typography>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Order ID</TableCell>
                    {user.role === 'admin' && <TableCell>Student</TableCell>}
                    <TableCell>Items</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Order Time</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {displayedOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>#{order.id}</TableCell>
                      {user.role === 'admin' && <TableCell>{order.user.name}</TableCell>}
                      <TableCell>
                        <Button
                          variant="text"
                          size="small"
                          onClick={() => setSelectedOrder(order)}
                        >
                          {order.order_items.length} item(s) - View Details
                        </Button>
                      </TableCell>
                      <TableCell>₹{order.total_amount}</TableCell>
                      <TableCell>
                        <Chip 
                          label={order.status} 
                          color={getStatusColor(order.status) as 'warning' | 'info' | 'primary' | 'success' | 'default' | 'error'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{formatDateTime(order.order_time)}</TableCell>
                      <TableCell>
                        {user.role === 'admin' ? (
                          <Box display="flex" gap={1} flexWrap="wrap">
                            {canUpdateStatus(order.status, 'confirmed') && (
                              <Button 
                                size="small" 
                                variant="outlined" 
                                color="primary"
                                onClick={() => handleUpdateOrderStatus(order.id, 'confirmed')}
                                disabled={loading}
                              >
                                Confirm
                              </Button>
                            )}
                            {canUpdateStatus(order.status, 'preparing') && (
                              <Button 
                                size="small" 
                                variant="outlined" 
                                color="primary"
                                onClick={() => handleUpdateOrderStatus(order.id, 'preparing')}
                                disabled={loading}
                              >
                                Preparing
                              </Button>
                            )}
                            {canUpdateStatus(order.status, 'ready') && (
                              <Button 
                                size="small" 
                                variant="outlined" 
                                color="success"
                                onClick={() => handleUpdateOrderStatus(order.id, 'ready')}
                                disabled={loading}
                              >
                                Ready
                              </Button>
                            )}
                            {canUpdateStatus(order.status, 'completed') && (
                              <Button 
                                size="small" 
                                variant="outlined" 
                                color="success"
                                onClick={() => handleUpdateOrderStatus(order.id, 'completed')}
                                disabled={loading}
                              >
                                Complete
                              </Button>
                            )}
                            {order.status !== 'completed' && order.status !== 'cancelled' && (
                              <Button 
                                size="small" 
                                variant="outlined" 
                                color="error"
                                onClick={() => handleUpdateOrderStatus(order.id, 'cancelled')}
                                disabled={loading}
                              >
                                Cancel
                              </Button>
                            )}
                          </Box>
                        ) : (
                          <Typography variant="body2" color="text.secondary">
                            {order.status === 'ready' ? 'Ready for pickup!' : 'In progress'}
                          </Typography>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>

      {/* Order Details Dialog */}
      <Dialog 
        open={Boolean(selectedOrder)} 
        onClose={() => setSelectedOrder(null)}
        maxWidth="md"
        fullWidth
      >
        {selectedOrder && (
          <>
            <DialogTitle>Order #{selectedOrder.id} Details</DialogTitle>
            <DialogContent>
              <Box mb={2}>
                <Typography variant="body2" color="text.secondary">
                  <strong>Status:</strong> {selectedOrder.status}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Order Time:</strong> {formatDateTime(selectedOrder.order_time)}
                </Typography>
                {selectedOrder.pickup_time && (
                  <Typography variant="body2" color="text.secondary">
                    <strong>Pickup Time:</strong> {formatDateTime(selectedOrder.pickup_time)}
                  </Typography>
                )}
                {selectedOrder.notes && (
                  <Typography variant="body2" color="text.secondary">
                    <strong>Notes:</strong> {selectedOrder.notes}
                  </Typography>
                )}
              </Box>
              
              <Typography variant="h6" gutterBottom>Items:</Typography>
              <TableContainer component={Paper}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Item</TableCell>
                      <TableCell>Unit Price</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell>Total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedOrder.order_items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.menu_item.name}</TableCell>
                        <TableCell>₹{item.menu_item.price}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>₹{item.total_price}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={3}><strong>Total</strong></TableCell>
                      <TableCell><strong>₹{selectedOrder.total_amount}</strong></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setSelectedOrder(null)}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default Orders;
