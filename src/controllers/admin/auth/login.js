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
        // Verify admin existence
        const admin = await User.findOne({ email, userType: 'Admin' });
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found.' });
        }

        // Validate password
        const validPassword = await bcrypt.compare(password, admin.password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        // Create auth token
        const authToken = jwt.sign(
            { id: admin._id, userType: admin.userType },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Respond with success and token
        res.status(200).json({
            message: 'Admin successfully authenticated.',
            authToken
        });
    } catch (error) {
        // Debugging log
        console.error('Authentication Error:', error);

        // Respond with error
        res.status(500).json({ message: 'Failed to authenticate admin.', error: error.message });
    }
};

module.exports = loginAdmin;
