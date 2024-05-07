const mongoose = require('mongoose');

const activitiesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    activityDescription: String,
    // activityName: {
    //     type: String,
    //     required: true
    // },
    // duration: {
    //     type: Date,
    //     required: true,
    // },
    ageRestriction: {
        type: Number,
        required: false
    },
    participants: {
        type: Number,
        required: true
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

    profileImage: {
        data: Buffer,
        contentType: String
    },
    
    fee:{
        type: Number,
        required: true

    },

    date: {
        type: Date, // Added type Date
        required: true // Adjust as needed based on your requirements
    }
}, { timestamps: true });

const Activities= mongoose.model('Activities', activitiesSchema);

module.exports = Activities;
