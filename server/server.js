// importing required modules
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors')

// importing mongodb connection 
const ConnectDB = require('./config/db');

// importing routes
const riderRoutes = require('./routes/ridersRoutes');
const authRoutes = require('./routes/authRoutes');
const driverRoutes = require('./routes/driverRoutes');

// consts
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/api/riders', riderRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/drivers', driverRoutes);





// Log requests in development mode
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    console.log('We are in dev mode!');
    next();
  });
}


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || 'Server Error',
  });
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  // Close server & exit process
  process.exit(1);
});


// connect to db and start the server
ConnectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});

module.exports = app;