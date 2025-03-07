import express from 'express';
import { getAllRooms,  deleteRoom, updateRoom, createRoom, getRoomById, getUserPosts } from '../controllers/roomController.js';
import multer from 'multer';
import { authenticateToken } from '../middleware/auth.js';

// Multer setup for file uploads
import { upload } from '../upload.js';

const router = express.Router();

// Route to create a room with image upload
router.post('/room/create',authenticateToken, upload.array('images', 5), createRoom);
router.put('/room/update/:id', upload.array('images', 5), updateRoom);
router.delete('/remove/:roomId', deleteRoom); // Delete route
router.get('/user/:userId',authenticateToken, getUserPosts);
router.get('/room/all', getAllRooms);
router.get('/room/:id', getRoomById);
export default router;
