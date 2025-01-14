import Room from '../models/room.js';
import cloudinary from '../config/cloudinary.js';
import streamifier from 'streamifier';

export const createRoom = async (req, res) => {
  try {
    const { ownername, title, description, location, rent, type, contact } = req.body;
    const postBy = req.user.user._id;
    console.log(req.user.user._id);

    // Check if required fields are provided
    if (!ownername || !title || !description || !location || !rent || !contact) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    // Check if images are uploaded
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "Please upload at least one image" });
    }

    // Upload images to Cloudinary
    const imageUploads = await Promise.all(
      req.files.map((file) => {
        return new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: 'RoomImages' },
            (error, result) => {
              if (error) reject(error);
              else resolve({ url: result.secure_url, public_id: result.public_id });
            }
          );
          streamifier.createReadStream(file.buffer).pipe(uploadStream);
        });
      })
    );

    // Create a new Room instance
    const newRoom = new Room({
      postBy,
      ownername,
      title,
      description,
      location,
      rent,
      type,
      contact,
      images: imageUploads, // Add the uploaded images
    });

    // Save the room to the database
    await newRoom.save();

    return res.status(201).json({ message: "Room created successfully", room: newRoom });
  } catch (error) {
    return res.status(500).json({ error: `Server error: ${error.message}` });
  }
};

export const updateRoom = async (req, res) => {
  try {
    const { id } = req.params; // Get room ID from request parameters
    const { ownername, location, rent, contact, title, description } = req.body;

    // Find the existing room by ID
    const existingRoom = await Room.findById(id);
    if (!existingRoom) {
      return res.status(404).json({ message: "Room not found" });
    }

    // Delete old images from Cloudinary if new images are provided
    if (req.files && req.files.length > 0) {
      await Promise.all(
        existingRoom.images.map((image) =>
          cloudinary.uploader.destroy(image.public_id)
        )
      );

      // Upload new images to Cloudinary
      const imageUploads = await Promise.all(
        req.files.map((file) => {
          return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
              { folder: 'RoomImages' },
              (error, result) => {
                if (error) reject(error);
                else resolve({ url: result.secure_url, public_id: result.public_id });
              }
            );
            streamifier.createReadStream(file.buffer).pipe(uploadStream);
          });
        })
      );

      // Update images in the existing room
      existingRoom.images = imageUploads;
    }

    // Update fields, including title and description
    existingRoom.ownername = ownername || existingRoom.ownername;
    existingRoom.location = location || existingRoom.location;
    existingRoom.rent = rent || existingRoom.rent;
    existingRoom.contact = contact || existingRoom.contact;
    existingRoom.title = title || existingRoom.title;
    existingRoom.description = description || existingRoom.description;
    existingRoom.updatedAt = Date.now();

    // Save the updated room to the database
    await existingRoom.save();

    return res.status(200).json({ message: "Room updated successfully", room: existingRoom });
  } catch (error) {
    console.error('Error updating room:', error);
    return res.status(500).json({ error: `Server error: ${error.message}` });
  }
};

export const deleteRoom = async (req, res) => {
  try {
    const { roomId } = req.params;

    // Find the room by ID
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    // Delete images from Cloudinary
    await Promise.all(
      room.images.map(async (image) => {
        await cloudinary.uploader.destroy(image.public_id);
      })
    );

    // Delete the room from the database
    await Room.findByIdAndDelete(roomId);

    return res.status(200).json({ message: 'Room deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: `Server error: ${error.message}` });
  }
};


export const getUserPosts = async (req, res) => {
  const { userId } = req.params;

  try {
    // Find rooms where postBy matches the user ID
    const posts = await Room.find({ postBy: userId }).populate('postBy', 'username email');

    if (!posts.length) {
      return res.status(404).json({ message: 'No posts found for this user.' });
    }

    res.status(200).json({ posts });
  } catch (error) {
    console.error('Error fetching user posts:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};


export const getAllRooms = async (req, res) => {
  try {
    // Fetch all rooms and populate owner information
    const rooms = await Room.find().populate('ownername', 'username email');

    if (rooms.length === 0) {
      return res.status(404).json({ message: 'No rooms found' });
    }

    return res.status(200).json({ message: 'Rooms retrieved successfully', rooms });
  } catch (error) {
    return res.status(500).json({ error: `Server error: ${error.message}` });
  }
};



export const getRoomById = async (req, res) => {
  try {
    const roomId = req.params.id; // Get room ID from request params
    const room = await Room.findById(roomId); // Find room by ID in the database

    if (!room) {
      return res.status(404).json({ message: "Room not found" }); // Room not found
    }

    res.json({ room }); // Return the room details
  } catch (error) {
    res.status(500).json({ message: "Error fetching room details", error });
  }
};