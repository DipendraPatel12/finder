import express from 'express';
import { getUserPosts } from '../controllers/roomController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Route to get posts created by a specific user
router.get('/user/:userId', getUserPosts);

export default router;
