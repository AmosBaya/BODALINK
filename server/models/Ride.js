const mongoose = require('mongoose');



const rideSchema = mongoose.Schema({
  riderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  driverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Driver',
      required: true,
    },
  status: ["requested", "accepted", "in_progress", "completed", "cancelled"],
  pickup: {
    address: String,
    coordinates: [Number] // [longitude, latitude]
  },
  destination: {
    address: String,
    coordinates: [Number]
  },
  fare: {
    baseFare: Number,
    distance: Number,
    duration: Number,
    dynamicPricing: Number,
    total: Number
  },
  timeline: {
    requestedAt: Date,
    acceptedAt: Date,
    pickedUpAt: Date,
    completedAt: Date
  },
  rating: {
    riderRating: Number,
    driverRating: Number,
    riderComment: String,
    driverComment: String
  },
  paymentMethod: ["cash", "mpesa", "card"],
  specialInstructions: String
});

module.exports = mongoose.model('Ride', rideSchema);
