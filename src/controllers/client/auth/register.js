const User = require('../../../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

/**
 * Registers a new general user.
 * 
 * @param {Object} req - The request object containing user details.
 * @param {Object} res - The response object.
 */
const registerUser = async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, fullName, dateOfBirth, phoneNumber, address } = req.body;
    const username = fullName.replace(/\s+/g, '');

    // Validate email for admin domain
    if (email.endsWith('@claritytech.com')) {
        return res.status(403).json({ message: 'Registration with an admin email is not permitted for general users.' });
    }

    try {
        // Check for existing user
        let user = await User.findOne({ email });
        if (user) {
            return res.status(409).json({ message: 'A user with this email already exists.' });
        }

        // Password strength validation
        if (password.length < 8 || !/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
            return res.status(400).json({ message: 'Password must be at least 8 characters long and include both letters and numbers.' });
        }

        // Password hashing
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // General user creation
        user = new User({
            username,
            email,
            password: hashedPassword,
            userType: 'General',
            fullName,
            dateOfBirth,
            phoneNumber,
            address
        });

        // Persist the new user
        await user.save();

        // Generate auth token for the new user
        const authToken = jwt.sign(
            { id: user._id, userType: user.userType },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Successful registration response with token
        res.status(201).json({ message: 'User registered successfully.', authToken });
    } catch (error) {
        // Log the error for debugging purposes
        console.error('Registration Error:', error);

        // Error response
        res.status(500).json({ message: 'Error registering user.', error: error.message });
    }
};

module.exports = registerUser;
