const Event = require('../../../models/event');
const { validationResult } = require('express-validator');

/**
 * Adds a new event.
 * 
 * @param {Object} req - The request object containing event details.
 * @param {Object} res - The response object.
 */
const addEvent = async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, description, startDate, endDate, location ,maxAttendees} = req.body;

    try {
        // Check for existing event
        let event = await Event.findOne({ name });
        if (event) {
            return res.status(409).json({ message: 'An event with this name already exists.' });
        }

        // Event creation
        event = new Event({
            name,
            description,
            startDate,
            endDate,
            location,
            maxAttendees
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
