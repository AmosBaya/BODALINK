const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
  email: String,
  phone: String,
  password: String, 
  role: ["rider", "driver", "admin"],
  profile: {
    firstName: String,
    lastName: String,
    avatar: String,
    dateOfBirth: Date,
    gender: String
  },
  verification: {
    email: Boolean,
    phone: Boolean,
    documents: Boolean // for drivers
  },
  createdAt: Date,
  updatedAt: Date
});

module.exports = mongoose.model('User', userSchema);