import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Add,
  Remove,
  LocalFireDepartment,
  Timer,
  Eco,
  Restaurant,
} from '@mui/icons-material';
import { MenuItem } from '../data/menuItems';

interface MenuCardProps {
  item: MenuItem;
  quantity: number;
  onAddToCart: () => void;
  onRemoveFromCart: () => void;
}

const MenuCard: React.FC<MenuCardProps> = ({
  item,
  quantity,
  onAddToCart,
  onRemoveFromCart,
}) => {
  const getSpiceIcon = (level?: string) => {
    const spiceCount = level === 'mild' ? 1 : level === 'medium' ? 2 : 3;
    return Array.from({ length: spiceCount }, (_, i) => (
      <LocalFireDepartment
        key={i}
        sx={{
          fontSize: 14,
          color: level === 'mild' ? '#4CAF50' : level === 'medium' ? '#FF9800' : '#F44336',
        }}
      />
    ));
  };

  return (
    <Card
      className="menu-card"
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 3,
        overflow: 'hidden',
        position: 'relative',
        background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
        border: '1px solid rgba(46, 125, 50, 0.1)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-8px) scale(1.02)',
          boxShadow: '0 20px 40px rgba(46, 125, 50, 0.15)',
          border: '1px solid rgba(46, 125, 50, 0.3)',
        },
      }}
    >
      {/* Availability Indicator */}
      {!item.is_available && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2,
            backdropFilter: 'blur(2px)',
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: 'white',
              fontWeight: 700,
              transform: 'rotate(-15deg)',
              padding: '8px 24px',
              background: 'rgba(244, 67, 54, 0.9)',
              borderRadius: 2,
            }}
          >
            OUT OF STOCK
          </Typography>
        </Box>
      )}

      {/* Image Section */}
      <Box
        sx={{
          height: 200,
          background: `linear-gradient(135deg, 
            ${item.category === 'Meals' ? '#2E7D32' : 
              item.category === 'Beverages' ? '#1976D2' :
              item.category === 'Snacks' ? '#FF6B35' : '#9C27B0'} 0%, 
            ${item.category === 'Meals' ? '#4CAF50' : 
              item.category === 'Beverages' ? '#42A5F5' :
              item.category === 'Snacks' ? '#FFB74D' : '#BA68C8'} 100%)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="7" cy="7" r="1"/%3E%3Ccircle cx="27" cy="7" r="1"/%3E%3Ccircle cx="47" cy="7" r="1"/%3E%3Ccircle cx="7" cy="27" r="1"/%3E%3Ccircle cx="27" cy="27" r="1"/%3E%3Ccircle cx="47" cy="27" r="1"/%3E%3Ccircle cx="7" cy="47" r="1"/%3E%3Ccircle cx="27" cy="47" r="1"/%3E%3Ccircle cx="47" cy="47" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          },
        }}
      >
        <Restaurant
          sx={{
            fontSize: 80,
            color: 'rgba(255, 255, 255, 0.9)',
            filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))',
          }}
        />
        
        {/* Category Badge */}
        <Chip
          label={item.category}
          size="small"
          sx={{
            position: 'absolute',
            top: 12,
            left: 12,
            background: 'rgba(255, 255, 255, 0.9)',
            color: 'primary.main',
            fontWeight: 600,
            fontSize: '0.75rem',
            '& .MuiChip-label': {
              px: 1.5,
            },
          }}
        />

        {/* Daily Limit Badge */}
        {item.daily_limit && (
          <Chip
            label={`Limited: ${item.daily_limit}`}
            size="small"
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              background: 'rgba(255, 107, 53, 0.9)',
              color: 'white',
              fontWeight: 600,
              fontSize: '0.75rem',
            }}
          />
        )}
      </Box>

      <CardContent
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          p: 3,
        }}
      >
        {/* Title and Price */}
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: 'text.primary',
              mb: 0.5,
              lineHeight: 1.3,
            }}
          >
            {item.name}
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              color: 'primary.main',
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
            }}
          >
            ₹{item.price.toFixed(0)}
            {item.preparation_time && (
              <Tooltip title={`Preparation time: ${item.preparation_time} minutes`}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    ml: 1,
                    color: 'text.secondary',
                    fontSize: '0.8rem',
                  }}
                >
                  <Timer sx={{ fontSize: 16 }} />
                  {item.preparation_time}m
                </Box>
              </Tooltip>
            )}
          </Typography>
        </Box>

        {/* Description */}
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            mb: 2,
            flexGrow: 1,
            lineHeight: 1.5,
          }}
        >
          {item.description}
        </Typography>

        {/* Features Row */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            mb: 3,
          }}
        >
          {/* Vegetarian Indicator */}
          {item.is_vegetarian && (
            <Tooltip title="Vegetarian">
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  color: '#4CAF50',
                }}
              >
                <Eco sx={{ fontSize: 18 }} />
                <Typography variant="caption" sx={{ fontWeight: 600 }}>
                  Veg
                </Typography>
              </Box>
            </Tooltip>
          )}

          {/* Spice Level */}
          {item.spice_level && (
            <Tooltip title={`Spice level: ${item.spice_level}`}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                {getSpiceIcon(item.spice_level)}
              </Box>
            </Tooltip>
          )}
        </Box>

        {/* Cart Controls */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mt: 'auto',
          }}
        >
          {quantity === 0 ? (
            <Button
              variant="contained"
              fullWidth
              startIcon={<Add />}
              onClick={onAddToCart}
              disabled={!item.is_available}
              sx={{
                py: 1.5,
                borderRadius: 2,
                fontWeight: 600,
                textTransform: 'none',
                background: 'linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(46, 125, 50, 0.3)',
                },
                '&:disabled': {
                  background: 'rgba(0, 0, 0, 0.12)',
                  color: 'rgba(0, 0, 0, 0.26)',
                },
              }}
            >
              Add to Cart
            </Button>
          ) : (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                gap: 2,
              }}
            >
              <IconButton
                onClick={onRemoveFromCart}
                sx={{
                  background: 'linear-gradient(135deg, #FF6B35 0%, #FF8A65 100%)',
                  color: 'white',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #E64A19 0%, #FF6B35 100%)',
                    transform: 'scale(1.1)',
                  },
                }}
              >
                <Remove />
              </IconButton>
              
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexGrow: 1,
                  py: 1,
                  background: 'rgba(46, 125, 50, 0.1)',
                  borderRadius: 2,
                  border: '2px solid rgba(46, 125, 50, 0.3)',
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, color: 'primary.main' }}
                >
                  {quantity}
                </Typography>
              </Box>

              <IconButton
                onClick={onAddToCart}
                sx={{
                  background: 'linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%)',
                  color: 'white',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)',
                    transform: 'scale(1.1)',
                  },
                }}
              >
                <Add />
              </IconButton>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default MenuCard;
