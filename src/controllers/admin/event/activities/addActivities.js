const Event = require('../../../../models/event');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

/**
 * Adds an activity to an event.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const addActivityToEvent = async (req, res) => {
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

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { eventId, activityId } = req.params;

    try {
        // Check for existing event
        let event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found.' });
        }

        // Add the activity to the event
        event.activities.push(activityId);
        await event.save();

        // Successful addition response
        res.status(200).json({ message: 'Activity added successfully.', event: event });
    } catch (error) {
        // Log the error for debugging purposes
        console.error('Activity Addition Error:', error);

        // Error response
        res.status(500).json({ message: 'Error adding activity to event.', error: error.message });
    }
};

module.exports = addActivityToEvent;
