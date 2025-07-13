const mongoose = require('mongoose');



const rideSchema = mongoose.Schema({
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
    },
    driverId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Driver',
      required: true,
    },
    pickup: String,
    dropoff: String,
    status: "pending" | "completed" | "cancelled",
    fare: Number,
    createdAt: Date
});