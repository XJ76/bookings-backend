const Activity = require('../../../../models/sepActivity');

/**
 * Controller function to add an activity.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const addActivity = async (req, res) => {
    try {
        // Extract data from the request body
        const { name, activityDescription, ageRestriction, participants, maxParticipants, availability, profileImage, fee, date } = req.body;

        // Create a new activity object
        const newActivity = new Activity({
            name,
            activityDescription,
            // duration,
            ageRestriction,
            participants,
            maxParticipants,
            availability,
            profileImage,
            fee,
            date
        });

        // Save the new activity to the database
        const savedActivity = await newActivity.save();

        // Return a success response with the saved activity
        res.status(201).json({ message: 'Activity added successfully', activity: savedActivity });
    } catch (error) {
        // Return an error response if there is an error while adding the activity
        console.error('Error adding activity:', error);
        res.status(500).json({ message: 'Error adding activity', error: error.message });
    }
};

module.exports = addActivity;
