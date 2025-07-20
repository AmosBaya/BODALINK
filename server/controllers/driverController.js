// controllers/driverController.js
const Driver = require('../models/Driver');
const Ride = require('../models/Ride');
const User = require('../models/User');

// GET /api/drivers/profile
exports.getDriverProfile = async (req, res) => {
  try {
    const driver = await Driver.findOne({ userId: req.user._id }).populate('userId');
    if (!driver) return res.status(404).json({ message: 'Driver not found' });
    res.json(driver);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT /api/drivers/profile
exports.updateDriverProfile = async (req, res) => {
  try {
    const updates = req.body;
    const driver = await Driver.findOneAndUpdate(
      { userId: req.user._id },
      updates,
      { new: true }
    );
    res.json(driver);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/drivers/upload-documents
exports.uploadDocuments = async (req, res) => {
  try {
    const { license, vehicle } = req.body;
    const driver = await Driver.findOne({ userId: req.user._id });
    driver.license = license;
    driver.vehicle = vehicle;
    await driver.save();
    res.json({ message: 'Documents uploaded successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT /api/drivers/toggle-online
exports.toggleOnline = async (req, res) => {
  try {
    const driver = await Driver.findOne({ userId: req.user._id });
    driver.isOnline = !driver.isOnline;
    await driver.save();
    res.json({ isOnline: driver.isOnline });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/drivers/ride-requests
exports.getRideRequests = async (req, res) => {
  try {
    const rides = await Ride.find({ driverId: req.user._id, status: 'requested' });
    res.json(rides);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/drivers/accept-ride
exports.acceptRide = async (req, res) => {
  try {
    const { rideId } = req.body;
    const ride = await Ride.findById(rideId);
    if (!ride) return res.status(404).json({ message: 'Ride not found' });
    ride.status = 'accepted';
    ride.timeline.acceptedAt = new Date();
    await ride.save();
    res.json({ message: 'Ride accepted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/drivers/reject-ride
exports.rejectRide = async (req, res) => {
  try {
    const { rideId } = req.body;
    const ride = await Ride.findById(rideId);
    if (!ride) return res.status(404).json({ message: 'Ride not found' });
    ride.status = 'cancelled';
    await ride.save();
    res.json({ message: 'Ride rejected' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT /api/drivers/update-location
exports.updateLocation = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;
    const driver = await Driver.findOne({ userId: req.user._id });
    driver.currentLocation = {
      latitude,
      longitude,
      lastUpdated: new Date(),
    };
    await driver.save();
    res.json({ message: 'Location updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/drivers/earnings
exports.getEarnings = async (req, res) => {
  try {
    const driver = await Driver.findOne({ userId: req.user._id });
    res.json(driver.earnings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/drivers/withdraw-earnings
exports.withdrawEarnings = async (req, res) => {
  try {
    const { amount } = req.body;
    const driver = await Driver.findOne({ userId: req.user._id });
    if (driver.earnings.total < amount) {
      return res.status(400).json({ message: 'Insufficient funds' });
    }
    driver.earnings.total -= amount;
    driver.earnings.daily -= amount;
    await driver.save();
    res.json({ message: 'Withdrawal successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/drivers/convert-to-airtime
exports.convertToAirtime = async (req, res) => {
  try {
    const { amount } = req.body;
    // Optional: integrate third-party airtime API
    res.json({ message: `KES ${amount} converted to airtime successfully` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/drivers/trip-history
exports.getTripHistory = async (req, res) => {
  try {
    const rides = await Ride.find({ driverId: req.user._id, status: 'completed' });
    res.json(rides);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
