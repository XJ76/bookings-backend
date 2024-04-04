const Event = require('../../../models/event');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

/**
 * Adds a new event.
 * 
 * @param {Object} req - The request object containing event details.
 * @param {Object} res - The response object.
 */
const addEvent = async (req, res) => {
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

    const { eventName, eventDescription, startDate, endDate, location } = req.body;

    try {
        // Check for existing event
        let event = await Event.findOne({ eventName });
        if (event) {
            return res.status(409).json({ message: 'An event with this name already exists.' });
        }

        // Event creation
        event = new Event({
            eventName,
            eventDescription,
            startDate,
            endDate,
            location
        });

        // Persist the new event
        await event.save();

        // Successful event addition response
        res.status(201).json({ message: 'Event added successfully.', event });
    } catch (error) {
        // Log the error for debugging purposes
        console.error('Event Addition Error:', error);

        // Error response
        res.status(500).json({ message: 'Error adding event.', error: error.message });
    }
};

module.exports = addEvent;
