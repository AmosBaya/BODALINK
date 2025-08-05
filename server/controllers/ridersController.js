const User = require('../models/User');
const Driver = require('../models/Driver');
const Ride = require('../models/Ride');


// @route   GET /api/riders/profile
const getRiderProfile = async (req, res) => {
  try {
    const rider = await User.findById(req.user._id);
    if (!rider || rider.role !== 'rider') {
      return res.status(403).json({ message: 'Access denied' });
    }
    res.status(200).json(rider);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// @route   PUT /api/riders/profile
const updateRiderProfile = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(
      req.user._id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// @route   POST /api/riders/request-ride
const requestRide = async (req, res) => {
  try {
    const {
      pickup,
      destination,
      distance, // in km
      duration, // in mins
      paymentMethod,
      specialInstructions,
    } = req.body;

    // Fare calculation (you can refine this)
    const baseFare = 50;
    const dynamicPricing = 1.2; // surge multiplier
    const perKm = 30;
    const perMin = 5;

    const totalFare =
      (baseFare + distance * perKm + duration * perMin) * dynamicPricing;

    const ride = new Ride({
      riderId: req.user._id,
      status: 'requested',
      pickup,
      destination,
      fare: {
        baseFare,
        distance,
        duration,
        dynamicPricing,
        total: totalFare,
      },
      timeline: {
        requestedAt: new Date(),
      },
      paymentMethod,
      specialInstructions,
    });

    await ride.save();
    res.status(201).json({ message: 'Ride requested successfully', ride });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// @route   GET /api/riders/ride-history
const getRideHistory = async (req, res) => {
  try {
    const rides = await Ride.find({ riderId: req.user._id })
      .sort({ 'timeline.requestedAt': -1 })
      .populate('driverId');
    res.status(200).json(rides);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// @route   POST /api/riders/rate-driver
const rateDriver = async (req, res) => {
  try {
    const { rideId, rating, comment } = req.body;

    const ride = await Ride.findById(rideId);
    if (!ride || ride.riderId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Ride not found or unauthorized' });
    }

    // Save rating in ride
    ride.rating.riderRating = rating;
    ride.rating.riderComment = comment;
    await ride.save();

    // Update driver's average rating
    const allRiderRatings = await Ride.find({
      driverId: ride.driverId,
      'rating.riderRating': { $ne: null },
    }).select('rating.riderRating');

    const totalRatings = allRiderRatings.length;
    const average =
      allRiderRatings.reduce((sum, r) => sum + r.rating.riderRating, 0) /
      totalRatings;

    await Driver.findByIdAndUpdate(ride.driverId, {
      'rating.average': average,
      'rating.totalRatings': totalRatings,
    });

    res.status(200).json({ message: 'Driver rated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// @route   GET /api/riders/available-drivers
const listAvailableDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find({
      status: 'approved',
      isOnline: true,
    }).populate('userId', 'profile.firstName profile.lastName phone');

    res.status(200).json(drivers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// @route   GET /api/riders/fare-estimate?distance=3&duration=10
const estimateFare = (req, res) => {
  try {
    const distance = parseFloat(req.query.distance); // km
    const duration = parseFloat(req.query.duration); // minutes

    const baseFare = 50;
    const dynamicPricing = 1.2;
    const perKm = 30;
    const perMin = 5;

    const total =
      (baseFare + distance * perKm + duration * perMin) * dynamicPricing;

    res.status(200).json({
      baseFare,
      distance,
      duration,
      dynamicPricing,
      estimatedFare: total,
    });
  } catch (err) {
    res.status(400).json({ error: 'Invalid query params' });
  }
};


// @route   POST /api/riders/cancel-ride
const cancelRide = async (req, res) => {
  try {
    const { rideId } = req.body;

    const ride = await Ride.findById(rideId);
    if (!ride || ride.riderId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Ride not found or unauthorized' });
    }

    if (ride.status === 'completed' || ride.status === 'cancelled') {
      return res.status(400).json({ message: 'Cannot cancel this ride' });
    }

    ride.status = 'cancelled';
    ride.timeline.cancelledAt = new Date();
    await ride.save();

    res.status(200).json({ message: 'Ride cancelled successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getRiderProfile,
  updateRiderProfile,
  requestRide,
  getRideHistory,
  rateDriver,
  listAvailableDrivers,
  estimateFare,
  cancelRide,
};
