const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    price: {
        type: Number,
        required: true
    },
    duration: {
        type: Number,
        required: true,
        min: [1, 'Duration should be at least 1 hour']
    },
    ageLimit: {
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
    // Add any other activity fields as needed
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;
