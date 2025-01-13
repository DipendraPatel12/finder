import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validate required fields
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Please fill all the fields' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create and save new user
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

        // Create a new user with the hashed password
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });
        await newUser.save();

        return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        return res.status(500).json({ error: `An error occurred: ${error.message}` });
    }
};




export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({ message: 'Please fill all the fields' });
        }

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare the provided password with the stored hash
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Remove password before sending the user data
        const { password: _, ...userData } = user.toObject();

        // Generate a JWT token (expires in 1 hour)
        const token = jwt.sign({ user: userData }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Set the token in a cookie (HTTP-only, expires in 7 days)
        res.cookie('authToken', token, {
            httpOnly: true,   // Prevents JavaScript access to the cookie
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
            secure: process.env.NODE_ENV === 'production', // Send cookie only over HTTPS in production
            sameSite: 'Strict', // Helps prevent CSRF attacks
        });

        // Send success response with user info
        return res.status(200).json({ message: 'Login successful', id: user.id });
    } catch (error) {
        return res.status(500).json({ error: `An error occurred: ${error.message}` });
    }
};
