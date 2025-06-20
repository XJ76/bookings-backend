const mongoose = require('mongoose');

const accommodationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    size: {
        type: Number,
        required: true,
        min: 1, // Minimum size of 1 square meter
    },
    costPerNight: {
        type: Number,
        required: true,
    },
    sharingOptions: {
        type: String,
        enum: ['Private', 'Shared', 'Dormitory'],
        required: true,
    },
    specialInstructions: String,
    // Add any other accommodation fields as needed
    profileImage: {
        type: String, // Assuming the image is stored as a URL
        required: false // Adjust as needed based on your requirements
    }
});

const Accommodation = mongoose.model('Accommodation', accommodationSchema);

module.exports = Accommodation;
