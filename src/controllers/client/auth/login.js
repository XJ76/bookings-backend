const User = require('../../../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * General user login controller.
 * 
 * @param {Object} req - The request object containing login details.
 * @param {Object} res - The response object.
 */
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Check if the email is an admin email
    if (email.endsWith('@claritytech.com')) {
        return res.status(403).json({ message: 'Admin emails are not allowed to login here.' });
    }

    try {
        // Verify general user existence
        const user = await User.findOne({ email, userType: 'General' });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Validate password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid password.' });
        }

        // Create auth token
        const authToken = jwt.sign(
            { id: user._id, userType: user.userType },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Respond with success and token
        res.status(200).json({
            message: 'User successfully authenticated.',
            authToken
        });
    } catch (error) {
        // Debugging log
        console.error('Authentication Error:', error);

        // Respond with error
        res.status(500).json({ message: 'Failed to authenticate user.', error: error.message });
    }
};

module.exports = loginUser;
