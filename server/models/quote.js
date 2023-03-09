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
        type: [{employeeType: String, employeeHours: String}],
        required: true
    },
    items: {
        type: [{itemName: String, itemPrice: String}],
        required: true
    },
    finalQuote: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Quote', quoteSchema);