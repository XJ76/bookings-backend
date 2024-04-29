const Event = require('../../../../models/event');
const { validationResult } = require('express-validator');

/**
 * Deletes an activity from an event.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const deleteActivity = async (req, res) => {
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

        // Check if the activity exists in the event
        if (!event.activities.includes(activityId)) {
            return res.status(404).json({ message: 'Activity not found in this event.' });
        }

        // Remove the activity from the event
        event.activities = event.activities.filter(id => id.toString() !== activityId);
        await event.save();

        // Successful deletion response
        res.status(200).json({ message: 'Activity deleted successfully from the event.' });
    } catch (error) {
        // Log the error for debugging purposes
        console.error('Activity Deletion Error:', error);

        // Error response
        res.status(500).json({ message: 'Error deleting activity from event.', error: error.message });
    }
};

module.exports = deleteActivity;
