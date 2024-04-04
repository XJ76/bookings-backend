const mongoose = require('mongoose');

const mealPlanSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    numberOfPlates: {
        type: Number,
        required: true
    },
    mealType: {
        type: String,
        enum: ['Breakfast', 'Lunch', 'Dinner', 'Snack'],
        required: true
    },
    caloriesPerPlate: {
        type: Number,
        required: false
    },
    ingredients: [String],
    // Add any other meal plan fields as needed
});

const MealPlan = mongoose.model('MealPlan', mealPlanSchema);

module.exports = MealPlan;
