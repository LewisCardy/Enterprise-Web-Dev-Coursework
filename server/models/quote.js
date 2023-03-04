const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: true
    },
    projectDescription: {
        type: String,
        required: true
    }, 
    employees: {
        type: String,
        required: true
    },
    items: {
        type: String,
        required: true
    },
    finalQuote: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Quote', quoteSchema);