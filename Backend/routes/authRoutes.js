import express from 'express';
import { login, register } from '../controllers/authController.js';
import { authenticateToken } from '../middleware/auth.js';
const router = express.Router();

router.post('/login', login);
router.post('/register', register);
// Import the middleware


// Token verification route
router.get("/verify-token", authenticateToken, (req, res) => {
  res.status(200).json({ message: "Token is valid" });
});

export default router;
