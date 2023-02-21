const express = require('express');
const router = express.Router();

router.use('/getQuote', (req, res) => {
    let data = req.body;
    CalculateProjectCost(data)
})
function CalculateProjectCost(data){
    let juniorPay = 10;
    let regularPay = 20;
    let seniorPay = 30;

    let projectName = data.projectName;
    let projectDescription = data.projectDescription;
    let employees = data.employees;
    let items = data.items.body;

    // console.log(employees)
    let employeeHours = employees[0].employeeHours;
    console.log(employeeHours)
    
    

}

module.exports = router;