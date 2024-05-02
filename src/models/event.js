const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true 
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    description: String,
    registeredUsers: {
        type: Number,
        required: true,
        default: 0
    },
    maxAttendees: {
        type: Number,
        required: true
    },
    dressCode: {
        type: String,
        required: false,
        default: ''
    },
    activities: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Activity'
    }],
    // Add any other event fields as needed
    profileImage: {
        type: String, // Assuming the image is stored as a URL
        required: false // Adjust as needed based on your requirements
    }
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
