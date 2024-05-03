const Activity = require('../../../../models/activity');


const updateActivity = async (req, res) => {
  try {
    const { activityId } = req.params;
    const updateFields = req.body; // Fields to be updated

    // Find the activity by ID and update the specified fields
    const activity = await Activity.findByIdAndUpdate(
      activityId,
      updateFields,
      { new: true }
    );

    if (!activity) {
      return res.status(404).json({ message: 'Activity not found.' });
    }

    res.status(200).json({
      message: 'Activity updated successfully.',
      activity
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating activity', error: error.message });
  }
};

module.exports = updateActivity;