const mongoose = require('mongoose');

/**
 * Establishes a connection to the MongoDB database using Mongoose.
 * Utilizes environment variables for the database URI.
 * Implements error handling and logs the connection status.
 */
const dbConnect = async () => {
  try {
    const dbURI = process.env.MONGO_URL;
    if (!dbURI) {
      throw new Error('MONGO_URL is not defined in the environment variables.');
    }
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Bookings Database connected successfully');
  } catch (err) {
    console.error('Bookings Database connection error:', err);
    // Optionally, rethrow the error if you want to handle it further up the call stack
    throw err;
  }
};

module.exports = dbConnect;
