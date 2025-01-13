import React, { createContext, useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import axios from "axios"; // Import axios for API requests

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

// Create the context
const AuthContext = createContext();

// AuthProvider component that wraps the application
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null); // Add token state

  // Function to verify token on initial load
  const verifyToken = async () => {
    const storedToken = Cookies.get("authToken");
    const storedUserId = Cookies.get("userId");

    console.log("Token from cookies:", storedToken);
    console.log("User from cookies:", storedUserId);

    if (storedToken && storedUserId) {
      try {
        // Send a request to verify the token
        const response = await axios.get(`${apiUrl}/api/verify-token`, {
          headers: { Authorization: `Bearer ${storedToken}` },
          withCredentials: true, // Include credentials in the request
        });

        if (response.status === 200) {
          setIsAuthenticated(true);
          setUserId(storedUserId);
          setToken(storedToken); // Set token state
        }
      } catch (error) {
        console.error("Token verification failed:", error);
        // Clear cookies and set authentication to false if verification fails
        Cookies.remove("authToken");
        Cookies.remove("userId");
        setIsAuthenticated(false);
        setUserId(null);
        setToken(null); // Clear token state
      }
    }
  };

  // Call the verifyToken function when the component mounts
  useEffect(() => {
    verifyToken();
  }, []);

  // Login function
  const login = (token, id) => {
    console.log("Login - Token:", token);
    Cookies.set("authToken", token, { expires: 7, path: "/", secure: true });
    Cookies.set("userId", id, { expires: 7, path: "/" });

    setIsAuthenticated(true);
    setUserId(id);
    setToken(token); // Set token state
  };

  // Logout function
  const logout = () => {
    Cookies.remove("authToken");
    Cookies.remove("userId");
    setIsAuthenticated(false);
    setUserId(null);
    setToken(null); // Clear token state
    window.location.reload();
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userId,
        token, // Provide token in context
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth state
export const useAuth = () => useContext(AuthContext);
