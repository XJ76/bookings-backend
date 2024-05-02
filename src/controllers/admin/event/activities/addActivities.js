const Event = require('../../../../models/event');
const { validationResult } = require('express-validator');
const Activity = require('../../../../models/activity');

/**
 * Adds an activity to an event.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const addActivityToEvent = async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { eventId } = req.params;
    const { name, description, startTime, endTime,fee, profileImage } = req.body;

    // Validate eventName field
    if (!name) {
        return res.status(400).json({ message: 'Event Name is required.' });
    }

    try {
        // Calculate duration
        const duration = calculateDuration(startTime, endTime);
        if (isNaN(duration) || duration <= 0) {
            return res.status(400).json({ message: 'Invalid start and end time. Duration cannot be calculated.' });
        }

        // Create the activity
        const activity = new Activity({ eventName: name, activityDescription: description, duration, maxParticipants: 50, availability: 'Available', event: eventId ,fee, profileImage});
        await activity.save();

        // Find the event
        let event = await Event.findById(eventId);
        if (!event) {
            // If event not found, return 404
            return res.status(404).json({ message: 'Event not found.' });
        }

        // Add the activity to the event
        event.activities.push(activity._id);
        await event.save();

        // Successful addition response
        res.status(200).json({ message: 'Activity added successfully.', activity: activity, event: event });
    } catch (error) {
        // Log the error for debugging purposes
        console.error('Activity Addition Error:', error);

        // Error response
        res.status(500).json({ message: 'Error adding activity to event.', error: error.message });
    }
};

/**
 * Calculates the duration of an activity based on start and end times.
 * 
 * @param {string} startTime - The start time of the activity.
 * @param {string} endTime - The end time of the activity.
 * @returns {number} The duration of the activity in hours.
 */
const calculateDuration = (startTime, endTime) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const durationMs = end - start;
    const durationHours = 5
    return durationHours;
};

module.exports = addActivityToEvent;
