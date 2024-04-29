const Event = require('../../../models/event');
const { validationResult } = require('express-validator');

/**
 * Deletes an existing event by its name.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const deleteEvent = async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { eventName } = req.params;

    try {
        // Check for existing event by name
        let event = await Event.findOne({ name: eventName });
        if (!event) {
            return res.status(404).json({ message: 'Event not found.' });
        }

        // Delete the event by name
        await Event.deleteOne({ name: eventName });

        // Successful deletion response
        res.status(200).json({ message: 'Event deleted successfully.' });
    } catch (error) {
        // Log the error for debugging purposes
        console.error('Event Deletion Error:', error);

        // Error response
        res.status(500).json({ message: 'Error deleting event.', error: error.message });
    }
};

module.exports = deleteEvent;
