const Event = require('../../../models/event');

/**
 * Retrieves all events.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getEvents = async (req, res) => {
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
