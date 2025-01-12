import React, { createContext, useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import axios from "axios"; // Import axios for API requests


// Create the context
const AuthContext = createContext();

// AuthProvider component that wraps the application
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);

  // Function to verify token on initial load
  const verifyToken = async () => {
    const token = Cookies.get("authToken");
    const user = Cookies.get("userId");

    if (token && user) {
      try {
        // Send a request to verify the token
        const response = await axios.get("http://localhost:3000/api/verify-token", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true, // Include credentials in the request
        });

        if (response.status === 200) {
          setIsAuthenticated(true);
          setUserId(user);
        }
      } catch (error) {
        console.error("Token verification failed:", error);
        // Clear cookies and set authentication to false if verification fails
        Cookies.remove("authToken");
        Cookies.remove("userId");
        setIsAuthenticated(false);
        setUserId(null);
      }
    }
  };

  useEffect(() => {
    verifyToken(); // Call the token verification function on initial load
  }, []);

  // Login function
  const login = (token, id) => {
    Cookies.set("authToken", token, { expires: 7, path: "/" });
    Cookies.set("userId", id, { expires: 7, path: "/" });
    setIsAuthenticated(true);
    setUserId(id);
  };

  // Logout function
  const logout = () => {
    Cookies.remove("authToken");
    Cookies.remove("userId");
    setIsAuthenticated(false);
    setUserId(null);
    window.location.reload();
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userId,
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
