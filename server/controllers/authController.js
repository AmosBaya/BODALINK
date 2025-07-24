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

exports.refreshToken = (req, res) => {
  // Simple stateless JWT refresh logic
  try {
    const { token } = req.body;
    const decoded = jwt.verify(token, JWT_SECRET);

    const newToken = generateToken({ _id: decoded.id, role: decoded.role });
    res.status(200).json({ token: newToken });
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

exports.verifyPhone = async (req, res) => {
  const { phone } = req.body;
  const user = await User.findOne({ phone });

  if (!user) return res.status(404).json({ message: 'User not found' });

  user.verification.phone = true;
  await user.save();
  res.status(200).json({ message: 'Phone verified' });
};

exports.resetPassword = async (req, res) => {
  try {
    const { phone, newPassword } = req.body;
    const user = await User.findOne({ phone });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (err) {
    res.status(500).json({ message: 'Reset failed', error: err.message });
  }
};
