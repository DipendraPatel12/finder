import express from 'express';
import { getAllRooms,  deleteRoom, updateRoom, createRoom, getRoomById, getUserPosts } from '../controllers/roomController.js';
import multer from 'multer';
import { authenticateToken } from '../middleware/auth.js';

// Multer setup for file uploads
import { upload } from '../upload.js';

const router = express.Router();

// Route to create a room with image upload
router.post('/create',authenticateToken, upload.array('images', 5), createRoom);
router.put('/update/:id', upload.array('images', 5), updateRoom);
router.delete('/delete/:roomId', deleteRoom); // Delete route
router.get('/user/:userId',authenticateToken, getUserPosts);
router.get('/all', getAllRooms);
router.get('/:id', getRoomById);
export default router;
