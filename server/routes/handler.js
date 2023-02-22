const express = require('express');
const router = express.Router();

let finalCost = 0;

router.use('/getQuote', (req, res) => {
    let data = req.body;
    CalculateProjectCost(data)
})

router.get('/sendQuote', (req, res) => {
    let quotePrice = finalCost;
    res.end(JSON.stringify(quotePrice))
})

function CalculateProjectCost(data){
    finalCost = CalculateEmployeeCost(data) + CalculateItemCost(data)
    let projectName = data.projectName;
    let projectDescription = data.projectDescription;
    
}

function CalculateEmployeeCost(data){
    let juniorPay = 10;
    let standardPay = 20;
    let seniorPay = 30;

    let juniorHours = 0;
    let standardHours = 0;
    let seniorHours = 0;

    let employees = data.employees;

    employees.forEach(employee => {
        if(employee.employeeType == "Junior"){
            juniorHours = employee.employeeHours;
        } else if (employee.employeeType == "Standard"){
            standardHours = employee.employeeHours;
        } else {
            seniorHours = employee.employeeHours;
        }
    });

    let totalJuniorPay = juniorHours * juniorPay;
    let totalStandardPay = standardHours * standardPay;
    let totalSeniorPay = seniorHours * seniorPay;
    
    let totalPay = totalJuniorPay + totalStandardPay + totalSeniorPay;

    return totalPay;
}
function CalculateItemCost(data){
    let itemPrice = 0;
    let items = data.items;

    items.forEach(item => {
        itemPrice = itemPrice+ parseInt(item.itemPrice) 
    });
    return itemPrice;
}

module.exports = router;