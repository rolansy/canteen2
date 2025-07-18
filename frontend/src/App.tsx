import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { AuthProvider, useAuth } from './context/AuthContext';
import { OrderProvider } from './context/OrderContext';
import Navbar from './components/Navbar';
import Login from './components/Login';
import StudentDashboard from './components/StudentDashboard';
import AdminDashboard from './components/AdminDashboard';
import Menu from './components/Menu';
import Orders from './components/Orders';
import Analytics from './components/Analytics';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const AppRouter: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        Loading...
      </div>
    );
  }

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route 
          path="/" 
          element={
            !user ? <Login /> : 
            user.role === 'admin' ? <Navigate to="/admin" /> : 
            <Navigate to="/student" />
          } 
        />
        <Route 
          path="/student" 
          element={user?.role === 'student' ? <StudentDashboard /> : <Navigate to="/" />} 
        />
        <Route 
          path="/admin" 
          element={user?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/" />} 
        />
        <Route 
          path="/menu" 
          element={user ? <Menu /> : <Navigate to="/" />} 
        />
        <Route 
          path="/orders" 
          element={user ? <Orders /> : <Navigate to="/" />} 
        />
        <Route 
          path="/analytics" 
          element={user ? <Analytics /> : <Navigate to="/" />} 
        />
      </Routes>
    </Router>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <OrderProvider>
          <AppRouter />
        </OrderProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
