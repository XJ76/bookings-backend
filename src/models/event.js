const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
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
    // Add any other event fields as needed
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
