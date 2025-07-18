// src/components/Menu.tsx
import React, { useState } from 'react';
import {
  Container,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Tab,
  Tabs,
} from '@mui/material';
import { Add, Remove, ShoppingCart } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import { menuItems, type MenuItem, getMenuItemById } from '../data/menuData';

interface CartItem {
  menu_item: MenuItem;
  quantity: number;
}

const Menu: React.FC = () => {
  const { user, updateUserCredit } = useAuth();
  const { addOrder } = useOrders();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Meals', 'Beverages', 'Snacks', 'Specials'];

  const addToCart = (menuItem: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(item => item.menu_item.id === menuItem.id);
      if (existing) {
        return prev.map(item =>
          item.menu_item.id === menuItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { menu_item: menuItem, quantity: 1 }];
    });
  };

  const removeFromCart = (menuItemId: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.menu_item.id === menuItemId);
      if (existing && existing.quantity > 1) {
        return prev.map(item =>
          item.menu_item.id === menuItemId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
      return prev.filter(item => item.menu_item.id !== menuItemId);
    });
  };

  const getCartItemQuantity = (menuItemId: number) => {
    const item = cart.find(item => item.menu_item.id === menuItemId);
    return item ? item.quantity : 0;
  };

  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + (item.menu_item.price * item.quantity), 0);
  };

  const placeOrder = async () => {
    if (cart.length === 0) return;

    const totalAmount = getTotalAmount();
    if (user && user.credit_balance < totalAmount) {
      setMessage({ type: 'error', text: 'Insufficient credit balance! Please add credit to your account.' });
      return;
    }

    setLoading(true);
    try {
      // Create order items with menu item details
      const orderItems = cart.map(item => ({
        id: Date.now() + Math.random(), // Simple ID for demo
        menu_item_id: item.menu_item.id,
        menu_item: {
          id: item.menu_item.id,
          name: item.menu_item.name,
          price: item.menu_item.price
        },
        quantity: item.quantity,
        unit_price: item.menu_item.price,
        total_price: item.menu_item.price * item.quantity
      }));

      // Create the order
      addOrder({
        user_id: user!.id,
        user: { name: user!.name },
        total_amount: totalAmount,
        status: 'pending',
        payment_method: 'credit',
        order_items: orderItems
      });

      // Deduct credit from user account
      await updateUserCredit(-totalAmount);

      setCart([]);
      setCartOpen(false);
      setMessage({ type: 'success', text: 'Order placed successfully!' });
    } catch {
      setMessage({ 
        type: 'error', 
        text: 'Failed to place order. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = selectedCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Kerala Canteen Menu</Typography>
        <Button
          variant="contained"
          startIcon={<ShoppingCart />}
          onClick={() => setCartOpen(true)}
          disabled={cart.length === 0}
        >
          Cart ({cart.length})
        </Button>
      </Box>

      {message && (
        <Alert 
          severity={message.type} 
          onClose={() => setMessage(null)}
          sx={{ mb: 3 }}
        >
          {message.text}
        </Alert>
      )}

      <Tabs 
        value={selectedCategory} 
        onChange={(_, newValue) => setSelectedCategory(newValue)}
        sx={{ mb: 3 }}
      >
        {categories.map(category => (
          <Tab key={category} label={category} value={category} />
        ))}
      </Tabs>

      <Box 
        display="grid" 
        gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))" 
        gap={3}
      >
        {filteredItems.map((item) => (
          <Card key={item.id} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {item.description}
                </Typography>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="h6" color="primary">
                    ₹{item.price}
                  </Typography>
                  <Chip 
                    label={item.category} 
                    size="small" 
                    variant="outlined"
                  />
                </Box>
                {!item.is_available && (
                  <Chip label="Not Available" color="error" size="small" />
                )}
              </CardContent>
              <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                {getCartItemQuantity(item.id) > 0 ? (
                  <Box display="flex" alignItems="center" gap={1}>
                    <IconButton 
                      onClick={() => removeFromCart(item.id)}
                      size="small"
                    >
                      <Remove />
                    </IconButton>
                    <Typography>{getCartItemQuantity(item.id)}</Typography>
                    <IconButton 
                      onClick={() => addToCart(item)}
                      size="small"
                      disabled={!item.is_available}
                    >
                      <Add />
                    </IconButton>
                  </Box>
                ) : (
                  <Button
                    variant="outlined"
                    onClick={() => addToCart(item)}
                    disabled={!item.is_available}
                    fullWidth
                  >
                    Add to Cart
                  </Button>
                )}
              </CardActions>
            </Card>
          ))}
        </Box>

      {/* Cart Dialog */}
      <Dialog open={cartOpen} onClose={() => setCartOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Your Order</DialogTitle>
        <DialogContent>
          {cart.length === 0 ? (
            <Typography>Your cart is empty</Typography>
          ) : (
            <>
              {cart.map((item) => (
                <Box key={item.menu_item.id} display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Box>
                    <Typography variant="body1">{item.menu_item.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      ₹{item.menu_item.price} × {item.quantity}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1}>
                    <IconButton 
                      onClick={() => removeFromCart(item.menu_item.id)}
                      size="small"
                    >
                      <Remove />
                    </IconButton>
                    <Typography>{item.quantity}</Typography>
                    <IconButton 
                      onClick={() => addToCart(item.menu_item)}
                      size="small"
                    >
                      <Add />
                    </IconButton>
                  </Box>
                </Box>
              ))}
              <Box borderTop={1} borderColor="divider" pt={2} mt={2}>
                <Typography variant="h6">
                  Total: ₹{getTotalAmount()}
                </Typography>
                {user && (
                  <Typography variant="body2" color="text.secondary">
                    Credit Balance: ₹{user.credit_balance.toFixed(2)}
                  </Typography>
                )}
              </Box>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCartOpen(false)}>Cancel</Button>
          <Button 
            onClick={placeOrder} 
            variant="contained" 
            disabled={cart.length === 0 || loading}
          >
            {loading ? 'Placing Order...' : 'Place Order'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Menu;
