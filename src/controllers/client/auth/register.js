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

    // Prevent admin email from registering as a general user
    if (email.endsWith('@claritytech.com')) {
        return res.status(400).json({ message: 'Admin emails are not allowed to register as a general user.' });
    }

    try {
        // Check for existing user
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        // Password strength validation (e.g., minimum length, complexity)
        // Example: if (password.length < 8) ...

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
