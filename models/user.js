const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    lastname: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    age: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    date: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('user', userSchema);