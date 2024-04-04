const jwt = require('jsonwebtoken');
const User = require('../models/user');

/**
 * Middleware to authenticate users and admins.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function in the stack.
 */
const authenticateUser = async (req, res, next) => {
    try {
        // Check for the authorization header
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: 'Authentication token is missing.' });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded.id, 'tokens.token': token });

        if (!user) {
            throw new Error();
        }

        // Attach user to the request object
        req.user = user;
        req.token = token;

        next();
    } catch (error) {
        res.status(401).json({ message: 'Not authorized to access this resource.' });
    }
};

module.exports = authenticateUser;
