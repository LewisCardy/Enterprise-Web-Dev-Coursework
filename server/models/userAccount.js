const mongoose = require('mongoose');

const userAccountSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('UserAccount', userAccountSchema);