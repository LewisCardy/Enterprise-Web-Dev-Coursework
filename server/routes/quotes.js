const express = require('express');
const { default: mongoose } = require('mongoose');
const quote = require('../models/Quote');
const router = express.Router()
const Quote = require('../models/Quote')

let finalCost; //final quote cost
let totalPay = 0;
let totalHours = 0;
let itemPrice = 0;

router.use('/getQuote', (req, res) => { //gets the quote sent from the front end
    let data = req.body;
    CalculateProjectCost(data) //calculates quote
});

router.get('/sendQuote', (req, res) => { //sends the new calculated quote back to the front end
    let quotePrice = finalCost;
    res.end(JSON.stringify(quotePrice))
    console.log(quotePrice)
});

router.use('/saveQuote', async(req, res) => {
    let data = req.body;
    console.log(finalCost)
    try {
        const quote = new Quote({
            projectName: data.projectName,
            projectDescription: data.projectDescription,
            employeePay: totalPay,
            employeeHours: totalHours,
            items: itemPrice,
            finalQuote: finalCost.toString()
    
        });
        const newQuote = await quote.save()
        console.log(quote);
    } catch (e) {
        console.log(e.message)
    }
    
});

router.get('/getAllQuotes', async(req, res) => {
    const quoteData = await Quote.find()
    res.json(quoteData);
});

router.use('/deleteQuote', async(req, res) => {
    let quoteName = req.body
    console.log(quoteName)
    const quoteData = await Quote.findOneAndDelete({projectName: quoteName.projectName})
    console.log("Deleted Entry")
});




function CalculateProjectCost(data){ //calculates the quote using the data sent from the front end
    finalCost = CalculateEmployeeCost(data) + CalculateItemCost(data)
    let projectName = data.projectName;
    let projectDescription = data.projectDescription;
    
}

function CalculateEmployeeCost(data){ //calculates the pay for the employees
    //standard hourly rates depending on employee type
    let juniorPay = 10;
    let standardPay = 20;
    let seniorPay = 30;

    let fudgeFactor = Math.floor(Math.random() * 1.5) + 0.5;

    standardPay = standardPay *  fudgeFactor;

    //base hours
    let juniorHours = 0;
    let standardHours = 0;
    
    let seniorHours = 0;

    let employees = data.employees; //employees array from the full data

    employees.forEach(employee => { //for each employee in the array calculate hours depening on what type they are
        if(employee.employeeType == "Junior"){
            juniorHours = juniorHours + parseInt(employee.employeeHours);
        } else if (employee.employeeType == "Standard"){
            standardHours = standardHours + parseInt(employee.employeeHours) ;
        } else if (employee.employeeType == "Senior"){
            seniorHours = seniorHours + parseInt(employee.employeeHours) ;
        }
    });
    
    //calulates the final pay depening on the hours and the base rates
    let totalJuniorPay = juniorHours * juniorPay;
    let totalStandardPay = standardHours * standardPay;
    let totalSeniorPay = seniorHours * seniorPay;
    
    totalPay = totalJuniorPay + totalStandardPay + totalSeniorPay; //total pay for employees
    totalHours = juniorHours + standardHours + seniorHours;
    return totalPay;
}
function CalculateItemCost(data){ //calculates the cost of the extra items
    itemPrice = 0;
    let items = data.items;

    items.forEach(item => { //for each item run a total of the cost
        itemPrice = itemPrice + parseInt(item.itemPrice) 
    });
    return itemPrice;
}

module.exports = router;