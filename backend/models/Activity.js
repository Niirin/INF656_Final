const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    userId: {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'User',
        type: String,
        required: true,
    },
    activityTitle: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    burnedCalories: {
        type: Number,
        required: true,
    },
    steps: {
        type: Number,
        required: false,
    },
    distance: {
        type: Number,
        required: false,
    },
    date: {
        type: Date,
        default: Date.now(),
    }
});


module.exports = mongoose.model('Activity', activitySchema);