const express = require('express');
const router = express.Router();
const loginAdmin = require('../../controllers/admin/auth/login');
const registerAdmin = require('../../controllers/admin/auth/register');
const authenticateUser = require('../../middleware/authstatus');

// Route for admin login
router.post('/login', loginAdmin);

// Route for admin registration
router.post('/register', registerAdmin);

// Middleware to ensure route authentication
router.use(authenticateUser);

// Example of an authenticated route
// router.get('/dashboard', (req, res) => {
//     res.send('Admin Dashboard - Access Granted');
// });

module.exports = router;
