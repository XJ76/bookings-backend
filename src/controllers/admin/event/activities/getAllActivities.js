const Event = require('../../../../models/event');
const jwt = require('jsonwebtoken');

/**
 * Retrieves all activities for a specific event.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getAllActivities = async (req, res) => {
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

    const { eventId } = req.params;

    try {
        // Retrieve the event with the specified ID
        const event = await Event.findById(eventId).populate('activities');
        if (!event) {

