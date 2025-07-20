// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// @route   POST /api/auth/register
router.post('/register', authController.register);

// @route   POST /api/auth/login
router.post('/login', authController.login);

// @route   POST /api/auth/logout
router.post('/logout', authController.logout);

// @route   POST /api/auth/refresh-token
router.post('/refresh-token', authController.refreshToken);

// @route   POST /api/auth/verify-phone
router.post('/verify-phone', authController.verifyPhone);

// @route   POST /api/auth/reset-password
router.post('/reset-password', authController.resetPassword);

module.exports = router;
