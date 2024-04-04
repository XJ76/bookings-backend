// Load environment variables
require('dotenv').config();

// Import required modules
const express = require('express');
const cors = require('cors');
const dbConnect = require('./config/dbConnect');
const clientRoutes = require('./src/routes/client/routes'); // Import client routes

// Initialize Express application
const app = express();

// Middleware: Enable CORS for cross-origin requests
app.use(cors());

// Middleware: Parse JSON bodies
app.use(express.json());

// Use Client Routes
app.use('/client/auth', clientRoutes); // Mount client routes

// Route: Define a simple GET route for the root path
app.get('/', (req, res) => {
  res.send('Bookings Project!');
});

// Configuration: Retrieve port from environment variables or set default to 5001
const PORT = process.env.PORT || 5001;

// Server: Start the Express server and connect to the database
app.listen(PORT, () => {
  dbConnect().then(() => {
    console.log(`Bookings Project is running on port ${PORT}`);
  }).catch((error) => {
    console.error(`Failed to connect to the database: ${error.message}`);
  });
}).on('error', (error) => {
  console.error(`Failed to start the server: ${error.message}`);
});
