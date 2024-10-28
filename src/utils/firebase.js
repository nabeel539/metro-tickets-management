import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  setDoc,
} from "firebase/firestore";

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

// Functions for Authentication
export const signupPassenger = async (email, password, role) => {
  try {
    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Save the user's role to Firestore
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      role: role, // Add role to Firestore
      // You can add other user info here as needed
    });

    console.log("User signed up and role added:", user.uid);
  } catch (error) {
    console.error("Error signing up:", error);
  }
};

export const loginPassenger = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const addTicketToFirebase = async (ticketData) => {
  try {
    const docRef = await addDoc(collection(db, "tickets"), ticketData);
    console.log("Ticket added with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding ticket: ", error);
    throw error; // Rethrow error to handle it in the component
  }
};

export { auth, db };
