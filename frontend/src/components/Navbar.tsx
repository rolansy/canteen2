// src/components/Navbar.tsx
import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Chip,
} from '@mui/material';
import { 
  AccountCircle, 
  Restaurant, 
  LocalDining,
  Analytics,
  Receipt 
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = async () => {
    await signOut();
    handleClose();
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Restaurant sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          St. Xavier's Canteen
        </Typography>

        {user && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Chip 
              label={`₹${user.credit_balance.toFixed(2)}`} 
              color="secondary" 
              variant="outlined"
              size="small"
            />
            
            <Button 
              color="inherit" 
              startIcon={<LocalDining />}
              onClick={() => navigate('/menu')}
            >
              Menu
            </Button>
            
            <Button 
              color="inherit" 
              startIcon={<Receipt />}
              onClick={() => navigate('/orders')}
            >
              Orders
            </Button>
            
            {user.role === 'admin' && (
              <Button 
                color="inherit" 
                startIcon={<Analytics />}
                onClick={() => navigate('/analytics')}
              >
                Analytics
              </Button>
            )}

            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem disabled>
                <Typography variant="body2" color="text.secondary">
                  {user.name} ({user.role})
                </Typography>
              </MenuItem>
              <MenuItem onClick={() => { handleClose(); navigate(user.role === 'admin' ? '/admin' : '/student'); }}>
                Dashboard
              </MenuItem>
              <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
