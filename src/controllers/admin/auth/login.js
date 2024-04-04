const User = require('../../../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * Admin login controller.
 * 
 * @param {Object} req - The request object containing login details.
 * @param {Object} res - The response object.
 */
const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check for existing user
        const user = await User.findOne({ email, userType: 'Admin' });
        if (!user) {
            return res.status(404).json({ message: 'Admin not found.' });
        }

        // Password verification
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, userType: user.userType },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Successful login response
        res.status(200).json({
            message: 'Admin logged in successfully.',
            token
        });
    } catch (error) {
        // Log the error for debugging purposes
        console.error('Login Error:', error);

        // Error response
        res.status(500).json({ message: 'Error logging in admin.', error: error.message });
    }
};

module.exports = loginAdmin;
