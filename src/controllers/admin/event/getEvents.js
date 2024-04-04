const Event = require('../../../models/event');
const jwt = require('jsonwebtoken');

/**
 * Retrieves all events.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getEvents = async (req, res) => {
    // Authenticate and authorize admin
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: 'Authentication token is missing.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded || decoded.role !== 'admin') {
            return res.status(403).json({ message: 'Unauthorized access. Admins only.' });
        }
    } catch (error) {
        return res.status(403).json({ message: 'Invalid or expired token.', error: error.message });
    }

    try {
        // Retrieve all events
        const events = await Event.find({});
        res.status(200).json(events);
    } catch (error) {
        // Log the error for debugging purposes
        console.error('Event Retrieval Error:', error);

        // Error response
        res.status(500).json({ message: 'Error retrieving events.', error: error.message });
    }
};

module.exports = getEvents;
