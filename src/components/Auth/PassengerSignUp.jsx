/* eslint-disable react/prop-types */
import { useState } from "react";
import { signupPassenger } from "../../utils/firebase.js";

export const PassengerSignup = ({ setIsSignup }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "passenger", // Default role
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match!");
      return;
    }

    try {
      // Perform signup with Firebase, including the role
      await signupPassenger(formData.email, formData.password, formData.role);
      alert("Signup successful!");
      setIsSignup(false); // Redirect to login after signup
    } catch (err) {
      setError("Failed to sign up. Please try again.");
      console.error("Signup Error:", err);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-4">Passenger Signup</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            name="name"
            className="w-full p-2 border-2 border-gray-300 rounded-md"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
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
        <div className="mb-4">
          <input
            type="password"
            name="confirmPassword"
            className="w-full p-2 border-2 border-gray-300 rounded-md"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <button className="w-full bg-cyan-500 text-white p-2 rounded-md">
          Sign Up
        </button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-sm">
          Already have an account?{" "}
          <span
            onClick={() => setIsSignup(false)}
            className="text-cyan-500 cursor-pointer hover:underline"
          >
            Login Here
          </span>
        </p>
      </div>
    </>
  );
};
