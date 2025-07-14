const mongoose = require('mongoose');


const driverSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',// Reference to User
    required: true,
 }, 
  license: {
    number: String,
    expiryDate: Date,
    imageUrl: String
  },
  vehicle: {
    make: String,
    model: String,
    year: Number,
    licensePlate: String,
    color: String,
    imageUrl: String
  },
  bankDetails: {
    accountNumber: String,
    bankName: String,
    mpesaNumber: String // For Kenya
  },
  status: ["pending", "approved", "suspended"],
  isOnline: Boolean,
  currentLocation: {
    latitude: Number,
    longitude: Number,
    lastUpdated: Date
  },
  rating: {
    average: Number,
    totalRatings: Number
  },
  earnings: {
    daily: Number,
    weekly: Number,
    monthly: Number,
    total: Number
  }
})

module.exports = mongoose.model('Driver', driverSchema);
