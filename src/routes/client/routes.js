const express = require('express');
const router = express.Router();
const loginUser = require('../../controllers/client/auth/login');
const registerUser = require('../../controllers/client/auth/register');
const authenticateUser = require('../../middleware/authstatus');

// Route for general user login
router.post('/login', loginUser);

// Route for general user registration
router.post('/register', registerUser);

// Middleware to ensure route authentication for general users
// router.use(authenticateUser);

// Example of an authenticated route for general users
// router.get('/profile', (req, res) => {
//     res.send('User Profile - Access Granted');
// });

module.exports = router;
