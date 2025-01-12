// # Middleware for JWT authentication
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET; // Use a strong secret key or an environment variable

export const authenticateToken = (req, res, next) => {
  const token = req.cookies.authToken;

  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user; // Attach user info to the request object
    next();
  });
};
