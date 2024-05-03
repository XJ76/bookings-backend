const Activities = require('../../../../models/sepActivity');

/**
 * Get all activities.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getAllActivities = async (req, res) => {
    try {
        // Fetch all activities from the database
        const activities = await Activities.find();

        // Return the activities as a JSON response
        res.status(200).json(activities);
    } catch (error) {
        // Log the error for debugging purposes
        console.error('Error fetching activities:', error);
        
        // Error response
        res.status(500).json({ message: 'Error fetching activities', error: error.message });
    }
};

module.exports = getAllActivities;
