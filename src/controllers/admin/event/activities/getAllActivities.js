const Event = require('../../../../models/event');

/**
 * Retrieves all activities for a specific event.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getAllActivities = async (req, res) => {
    const { eventId } = req.params;

    try {
        // Retrieve the event with the specified ID
        const event = await Event.findById(eventId).populate('activities');
        if (!event) {
            return res.status(404).json({ message: 'Event not found.' });
        }

        // Respond with the activities of the event
        res.status(200).json({ activities: event.activities });
    } catch (error) {
        // Log the error for debugging purposes
        console.error('Activities Retrieval Error:', error);

        // Error response
        res.status(500).json({ message: 'Error retrieving activities.', error: error.message });
    }
};

module.exports = getAllActivities;
