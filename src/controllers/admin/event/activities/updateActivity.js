const Activity = require('../../models/Activity');

const updateActivity = async (req, res) => {
  try {
    const { eventId, activityId } = req.params;
    const { name, description, startTime, endTime } = req.body;

    // Find the activity within the event by IDs
    const activity = await Activity.findOneAndUpdate(
      { _id: activityId, event: eventId },
      { name, description, startTime, endTime },
      { new: true }
    );

    if (!activity) {
      return res.status(404).json({ message: 'Activity not found or does not belong to the specified event.' });
    }

    res.status(200).json({
      message: 'Activity updated successfully.',
      activity
    });
  } catch (error) {

