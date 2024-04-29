// Load environment variables
require('dotenv').config();

// Import required modules
const express = require('express');
const cors = require('cors');
const dbConnect = require('./config/dbConnect');
const clientRoutes = require('./src/routes/client/routes'); // Import client routes
const adminRoutes = require('./src/routes/admin/routes'); // Import admin routes

// Initialize Express application
const app = express();

// Middleware: Enable CORS for cross-origin requests
app.use(cors());

// Middleware: Parse JSON bodies
app.use(express.json());

// Use Client Routes
app.use('/client/auth', clientRoutes); // Mount client routes

// Use Admin Routes
app.use('/admin', adminRoutes); // Mount admin routes

// Route: Define a simple GET route for the root path
app.get('/', (req, res) => {
  res.send(`
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bookings Project</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #1a1a1a; /* Dark background color */
        text-align: center;
        margin-top: 100px;
        color: #fff; /* White text color */
      }
      h1 {
        font-size: 3em;
        color: #00bfff; /* Deep Sky Blue */
        margin-bottom: 20px; /* Add some space below the heading */
        animation: fadeInDown 1s ease; /* Fade in animation */
      }
      p {
        font-size: 1.2em;
        color: #ccc; /* Light Gray */
        animation: fadeInUp 1s ease; /* Fade in animation */
      }
      .developer-info {
        position: fixed;
        bottom: 10px;
        right: 10px;
        font-size: 0.8em;
        color: #888; /* Light Gray */
      }
      @keyframes fadeInDown {
        from {
          opacity: 0;
          transform: translateY(-20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    </style>
  </head>
  <body>
    <h1>Welcome to the Bookings API!</h1>
    <p>We collect a large amount of data from our customers with their consent, see bottom right for contact details</p>
    <div class="developer-info">
      <p>Developed by Joshua J Smith</p>
      <p>Github: <a href="https://github.com/XJ76">XJ76</a></p>
      <p>Phone: +263789956168</p>
    </div>
  </body>
  </html>  
  `);
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
