/* eslint-disable react/prop-types */

import { useState } from "react";
import { loginPassenger } from "../../utils/firebase";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { doc, getDoc } from "firebase/firestore"; // Import Firestore methods
import { db } from "../../utils/firebase"; // Import Firestore instance

export const PassengerLogin = ({ setIsSignup }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Perform login with Firebase
      const userCredential = await loginPassenger(
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      // Fetch user role from Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid)); // Adjust "users" to your Firestore collection name
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const role = userData.role; // Assuming the role is stored under the 'role' field

        // Redirect based on user role
        if (role === "admin") {
          navigate("/admin-dashboard"); // Redirect to Admin Dashboard
        } else {
          navigate("/passenger-dashboard");
        }
      } else {
        setError("User role not found.");
      }
    } catch (err) {
      setError("Failed to login. Please check your credentials.");
      console.error("Login Error:", err);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-4">Passenger Login</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="email"
            name="email"
            className="w-full p-2 border-2 border-gray-300 rounded-md"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            name="password"
            className="w-full p-2 border-2 border-gray-300 rounded-md"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button className="w-full bg-cyan-500 text-white p-2 rounded-md">
          Login
        </button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-sm">
          New to Metro Tickets?{" "}
          <span
            onClick={() => setIsSignup(true)}
            className="text-cyan-500 cursor-pointer hover:underline"
          >
            Sign Up Here
          </span>
        </p>
      </div>
    </>
  );
};
