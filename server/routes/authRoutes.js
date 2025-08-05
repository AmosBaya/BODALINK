// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController');

// @route   POST /api/auth/register
router.post('/register', auth.signup);

// @route   POST /api/auth/login
router.post('/login', auth.login);

// @route   POST /api/auth/logout
router.post('/logout', auth.logout);

module.exports = router;
