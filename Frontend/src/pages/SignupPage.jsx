import { useState } from "react";
import city from "../assets/city.webp";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/api/register`, {
        username,
        email,
        password,
      });

      toast.success("User Registered successfully");
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error(`${error.response.data.message}`);
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
            Sign Up
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-white"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="mt-1 w-full rounded border border-gray-300 px-4 py-2 text-gray-800 focus:outline-none focus:ring-1 focus:ring-orange-300"
                placeholder="Enter your username"
              />
            </div>

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
                minLength={6}
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
                minLength={6}
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
                Sign Up
              </button>
            </div>
          </form>

          {/* Footer Links */}
          <p className="mt-6 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="text-white hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
