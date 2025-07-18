// src/config/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyBtPrzo3RC5o0JG0Z_Rqq9XaAEfql_fjwY",
  authDomain: "canteen2-a05b6.firebaseapp.com",
  projectId: "canteen2-a05b6",
  storageBucket: "canteen2-a05b6.firebasestorage.app",
  messagingSenderId: "177973021438",
  appId: "1:177973021438:web:f230b85808b11a70d873af",
  measurementId: "G-YWZHS4N356"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export const analytics = getAnalytics(app);

export default app;
