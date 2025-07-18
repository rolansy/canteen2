// src/context/OrderContext.tsx
import React, { createContext, useContext, useState } from 'react';

export interface OrderItem {
  id: number;
  menu_item_id: number;
  menu_item: {
    id: number;
    name: string;
    price: number;
  };
  quantity: number;
  unit_price: number;
  total_price: number;
}

export interface Order {
  id: number;
  user_id: number;
  user: {
    name: string;
  };
  total_amount: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  payment_method: string;
  order_time: string;
  pickup_time?: string;
  notes?: string;
  order_items: OrderItem[];
}

interface OrderContextType {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'order_time'>) => void;
  updateOrderStatus: (orderId: number, status: Order['status']) => void;
}

const OrderContext = createContext<OrderContextType | null>(null);

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  const addOrder = (orderData: Omit<Order, 'id' | 'order_time'>) => {
    const newOrder: Order = {
      ...orderData,
      id: Date.now(), // Simple ID generation for demo
      order_time: new Date().toISOString(),
    };
    setOrders(prev => [newOrder, ...prev]);
  };

  const updateOrderStatus = (orderId: number, status: Order['status']) => {
    setOrders(prev => 
      prev.map(order => 
        order.id === orderId 
          ? { 
              ...order, 
              status,
              pickup_time: status === 'ready' ? new Date().toISOString() : order.pickup_time
            }
          : order
      )
    );
  };

  const value = {
    orders,
    addOrder,
    updateOrderStatus,
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};
