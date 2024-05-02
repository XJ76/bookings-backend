const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: true
    },
    activityDescription: String,
    duration: {
        type: Number,
        required: true,
        min: [1, 'Duration should be at least 1 hour']
    },
    ageRestriction: {
        type: Number,
        required: false
    },
    maxParticipants: {
        type: Number,
        required: true
    },
    availability: {
        type: String,
        enum: ['Fully Booked', 'Places Running Out', 'Available'],
        required: true
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    // Add any other activity fields as needed
    profileImage: {
        type: String, // Assuming the image is stored as a URL
        required: false // Adjust as needed based on your requirements
    },
    fee:{
        type: Number,
        required: true

    }
}, { timestamps: true });

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;
