import Booking from '../models/booking.js';
import Room from '../models/room.js';
import User from '../models/user.js';
import { sendEmail } from '../utils/emailService.js';

export const bookRoom = async (req, res) => {
  const { userId, roomId } = req.body;

  try {
    // Check if the room exists
    const room = await Room.findById(roomId)
      .populate('postBy'); // Populating the 'postBy' field with the corresponding User

    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create a new booking
    const newBooking = new Booking({ user: userId, room: roomId });
    await newBooking.save();

    // Send email notifications
    await sendEmail(
      user.email,
      'Booking Confirmation',
      `Hi ${user.name}, your booking for the room "${room.ownername}" has been confirmed.`
    );

    await sendEmail(
      room.postBy.email,
      'New Booking Received',
      `Hi ${room.postBy.name}, your room "${room.ownername}" has been booked by ${user.name}.`
    );

    res.status(201).json({ message: 'Room booked successfully, notifications sent', booking: newBooking });
  } catch (error) {
    console.error('Error booking room:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
