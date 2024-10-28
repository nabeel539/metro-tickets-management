import { useState } from "react";
import { useNavigate } from "react-router-dom"; // For routing
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

export const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { setCurrentUser, setRole } = useAuth();

  // Hardcoded admin credentials
  const adminCredentials = {
    email: "admin@metro.com",
    password: "admin123",
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (
      email === adminCredentials.email &&
      password === adminCredentials.password
    ) {
      // Successful login, redirect to admin dashboard
      setCurrentUser({ email });
      setRole("admin");
      navigate("/admin-dashboard");
    } else {
      // Invalid credentials
      toast.error("Invalid email or password");
      setError("Invalid email or password");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-4">Admin Login</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <input
            type="email"
            className="w-full p-2 border-2 border-gray-300 rounded-md"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            className="w-full p-2 border-2 border-gray-300 rounded-md"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white p-2 rounded-md"
        >
          Login
        </button>
      </form>
    </div>
  );
};
