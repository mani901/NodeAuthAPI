const express = require('express');
const { check, validationResult } = require('express-validator');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register user
// @access  Public
router.post(
    '/register',
    [
        check('username', 'Username is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        authController.register(req, res);
    }
);

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post(
    '/login',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists(),
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        authController.login(req, res);
    }
);

// @route   POST /api/auth/forgotpassword
// @desc    Request password reset
// @access  Public
router.post(
    '/forgotpassword',
    [check('email', 'Please include a valid email').isEmail()],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        authController.forgotPassword(req, res);
    }
);

// @route   PUT /api/auth/resetpassword
// @desc    Reset password
// @access  Public
router.put(
    '/resetpassword',
    [
        check('token', 'Token is required').exists(),
        check('newPassword', 'New password must be at least 6 characters').isLength({ min: 6 }),
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        authController.resetPassword(req, res);
    }
);

// @route   GET /api/auth/user
// @desc    Get user data
// @access  Private
router.get('/user', authMiddleware, authController.getUser);

module.exports = router;