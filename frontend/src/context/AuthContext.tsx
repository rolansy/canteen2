// src/context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { 
  type User as FirebaseUser, 
  signInWithPopup, 
  signOut as firebaseSignOut,
  onAuthStateChanged 
} from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';

interface User {
  id: string;
  firebase_uid: string;
  email: string;
  name: string;
  role: 'student' | 'admin';
  credit_balance: number;
}

interface AuthContextType {
  user: User | null;
  firebaseUser: FirebaseUser | null;
  loading: boolean;
  signInWithGoogle: (role: 'student' | 'admin') => Promise<void>;
  signOut: () => Promise<void>;
  updateUserCredit: (amount: number) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  const updateUserData = useCallback(async () => {
    if (!firebaseUser) return;
    
    try {
      // Use localStorage for demo purposes
      const userData = localStorage.getItem(`user_${firebaseUser.uid}`);
      if (userData) {
        const user = JSON.parse(userData) as User;
        setUser(user);
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  }, [firebaseUser]);

  const updateUserCredit = async (amount: number) => {
    if (!firebaseUser || !user) return;
    
    try {
      const newBalance = user.credit_balance + amount;
      const updatedUser = { ...user, credit_balance: newBalance };
      
      // Save to localStorage
      localStorage.setItem(`user_${firebaseUser.uid}`, JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error) {
      console.error('Failed to update credit:', error);
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setFirebaseUser(firebaseUser);
      
      if (firebaseUser) {
        await updateUserData();
      } else {
        setUser(null);
        localStorage.removeItem('authToken');
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, [updateUserData]);

  const signInWithGoogle = async (role: 'student' | 'admin' = 'student') => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;
      
      // Check if user exists in localStorage
      const existingUserData = localStorage.getItem(`user_${firebaseUser.uid}`);
      
      if (!existingUserData) {
        // Create new user
        const newUser: User = {
          id: firebaseUser.uid,
          firebase_uid: firebaseUser.uid,
          email: firebaseUser.email || '',
          name: firebaseUser.displayName || '',
          role: role,
          credit_balance: role === 'student' ? 100 : 0, // Give students starting credit
        };
        
        localStorage.setItem(`user_${firebaseUser.uid}`, JSON.stringify(newUser));
        setUser(newUser);
      } else {
        const userData = JSON.parse(existingUserData) as User;
        setUser(userData);
      }
    } catch (error) {
      console.error('Sign-in failed:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      setUser(null);
      setFirebaseUser(null);
    } catch (error) {
      console.error('Sign-out failed:', error);
      throw error;
    }
  };

  const value = {
    user,
    firebaseUser,
    loading,
    signInWithGoogle,
    signOut,
    updateUserCredit,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
