/* eslint-disable react/prop-types */
import { useState } from "react";
import { PassengerLogin } from "../components/Auth/PassengerLogin";
import { PassengerSignup } from "../components/Auth/PassengerSignUp";
import { AdminLogin } from "../components/Auth/AdminLogin";

const AuthPage = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSignup, setIsSignup] = useState(false); // Toggle between login and signup

  const handleRoleSwitch = (role) => {
    setIsAdmin(role === "admin");
    setIsSignup(false); // Reset signup state when switching roles
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md">
        {/* Role Selection Buttons */}
        <div className="flex justify-center mb-4">
          <button
            className={`px-4 py-2 border-b-2 transition-all duration-300 ${
              !isAdmin ? "border-cyan-500 text-cyan-500" : "border-transparent"
            } focus:outline-none`}
            onClick={() => handleRoleSwitch("passenger")}
            aria-label="Passenger Login/Signup"
          >
            Passenger
          </button>
          <button
            className={`px-4 py-2 border-b-2 transition-all duration-300 ${
              isAdmin
                ? "border-indigo-500 text-indigo-500"
                : "border-transparent"
            } focus:outline-none`}
            onClick={() => handleRoleSwitch("admin")}
            aria-label="Admin Login"
          >
            Admin
          </button>
        </div>

        {/* Authentication Forms */}
        <div className="bg-white shadow-lg rounded-lg p-8">
          {isAdmin ? (
            <AdminLogin />
          ) : isSignup ? (
            <PassengerSignup setIsSignup={setIsSignup} />
          ) : (
            <PassengerLogin setIsSignup={setIsSignup} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
