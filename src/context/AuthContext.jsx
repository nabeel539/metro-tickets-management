/* eslint-disable react/prop-types */
import { createContext, useState, useEffect, useContext } from "react";
import { auth } from "../utils/firebase.js"; // Firebase config file
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore"; // Firestore imports
import { db } from "../utils/firebase.js"; // Firestore instance

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [role, setRole] = useState(null); // State to store the user role
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        try {
          // Fetch the user's role from Firestore
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            setRole(userDoc.data().role); // Assuming "role" field is stored in Firestore
          } else {
            setRole(null); // Handle case where user doc does not exist
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
          setRole(null); // Set role to null in case of error
        }
      } else {
        setCurrentUser(null);
        setRole(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = { currentUser, setCurrentUser, role, setRole }; // Provide currentUser and role in context

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
