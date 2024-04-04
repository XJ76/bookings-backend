const mongoose = require('mongoose');

const accommodationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    // Add any other accommodation fields as needed
});

const Accommodation = mongoose.model('Accommodation', accommodationSchema);

module.exports = Accommodation;
