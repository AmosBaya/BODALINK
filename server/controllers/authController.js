// controllers/authController.js
const User = require('../models/User');
const Driver = require('../models/Driver');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';
const JWT_EXPIRES_IN = '1d';

// Helpers
const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

exports.register = async (req, res) => {
  try {
    const { email, phone, password, role, profile } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      phone,
      password: hashedPassword,
      role,
      profile,
      verification: { email: false, phone: false, documents: false },
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const savedUser = await newUser.save();

    if (role === 'driver') {
      await new Driver({ userId: savedUser._id, status: 'pending', isOnline: false }).save();
    }

    const token = generateToken(savedUser);
    res.status(201).json({ token, user: savedUser });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      $or: [{ email: email }],
    });

    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = generateToken(user);
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};

exports.logout = (req, res) => {
  // On the client side: delete token
  res.status(200).json({ message: 'Logged out successfully' });
};


