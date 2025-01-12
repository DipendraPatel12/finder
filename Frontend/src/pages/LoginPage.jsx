import { useState } from "react";
import city from "../assets/city.webp";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext"; // Import the AuthContext

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth(); // Access the login function from AuthContext
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/login", {
        email,
        password,
      });
      const { token, id } = response.data;

      // Call the login method from AuthContext
      login(token, id);

      toast.success("Login successful!");
      navigate("/");

      // Redirect to another page if needed (e.g., dashboard)
      // window.location.href = "/dashboard"; or use react-router <Navigate /> for programmatic redirect
    } catch (error) {
      toast.error("Login failed. Please try again.");
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="relative h-[650px] w-full">
      {/* Background Image */}
      <img
        src={city}
        alt="Background"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlay and Sign Up Form */}
      <div className="relative z-10 flex h-full items-center justify-center bg-black bg-opacity-60">
        <div className="w-full max-w-md rounded-lg p-8 shadow-lg">
          <h2 className="mb-6 text-center text-2xl font-bold text-white">
            Login
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 w-full rounded border border-gray-300 px-4 py-2 text-gray-800 focus:outline-none focus:ring-1 focus:ring-orange-300"
                placeholder="Enter your email"
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 w-full rounded border border-gray-300 px-4 py-2 text-gray-800 focus:outline-none focus:ring-1 focus:ring-orange-300"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="w-32 rounded bg-white px-3 py-1.5 text-black font-medium hover:bg-orange-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1"
              >
                Login
              </button>
            </div>
          </form>

          {/* Footer Links */}
          <p className="mt-6 text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <Link to="/signup" className="text-white hover:underline">
              SignupPage
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
