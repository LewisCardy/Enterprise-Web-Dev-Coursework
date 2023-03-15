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
    employeeHours: {
        // type: [{employeeType: String, employeeHours: String}],
        type: String,
        required: true
    },
    employeePay:{
        type: String,
        required: true
    },
    items: {
        // type: [{itemName: String, itemPrice: String}],
        type: String,
        required: true
    },
    finalQuote: {
        type: String,
        required: true
    },
    createdBy: {
        type: String
    }
})

module.exports = mongoose.model('Quote', quoteSchema);