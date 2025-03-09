const User = require('../models/User');
const { hashPassword, comparePassword } = require('../utils/passwordUtils');
const { generateToken } = require('../utils/tokenUtils');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await hashPassword(password);

        user = new User({
            username,
            email,
            password: hashedPassword,
        });

        await user.save();

        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            createdAt: user.createdAt,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(user);

        res.json({
            token,
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
            },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const resetToken = generateToken(user, '15m');

        // In a real app, send resetToken via email; here, we return it
        res.json({ resetToken });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const hashedPassword = await hashPassword(newPassword);
        user.password = hashedPassword;
        await user.save();

        res.json({ message: 'Password reset successful' });
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(400).json({ message: 'Token expired' });
        }
        res.status(500).json({ message: error.message });
    }
};

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    register,
    login,
    forgotPassword,
    resetPassword,
    getUser,
};