import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4WIdQ0v08YA43JVK0xOJjayqh50WVf7c",
  authDomain: "metro-tickets-management.firebaseapp.com",
  projectId: "metro-tickets-management",
  storageBucket: "metro-tickets-management.appspot.com",
  messagingSenderId: "816163871291",
  appId: "1:816163871291:web:af6841dd6cf47602f55a1e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);
const db = getFirestore(app);

// // Functions for Authentication

export const loginPassenger = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const signupPassenger = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export { auth, db };
