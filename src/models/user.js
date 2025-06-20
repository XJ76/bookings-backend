const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    userType: {
        type: String,
        required: true,
        enum: ['Admin', 'General User'],
        default: 'General User'
    },
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    phoneNumber: {
        type: String,
        required: false,
        trim: true,
        match: [/^\d{10}$/, 'Please fill a valid phone number']
    },
    address: {
        street: String,
        city: String,
        state: String,
        zipCode: {
            type: String,
            match: [/^\d{5}(-\d{4})?$/, 'Please fill a valid zip code']
        }
    },
    // Add any other user fields as needed
    profileImage: {
        type: String, // Assuming the image is stored as a URL
        required: false // Adjust as needed based on your requirements
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
