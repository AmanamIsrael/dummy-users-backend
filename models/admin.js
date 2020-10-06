const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 3,
        max: 1024
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('admin', adminSchema);