// # Middleware for JWT authentication
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET; // Use a strong secret key or an environment variable



export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token not found" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token is not valid" });
    }
    req.user = user;
    next();
  });
};


