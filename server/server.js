const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')


const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

let finalCost = 0; //final quote cost

app.use('/getQuote', (req, res) => { //gets the quote sent from the front end
    let data = req.body;
    CalculateProjectCost(data) //calculates quote
})

app.get('/sendQuote', (req, res) => { //sends the new calculated quote back to the front end
    let quotePrice = finalCost;
    res.end(JSON.stringify(quotePrice))
    console.log(quotePrice)
})

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
    
    let totalPay = totalJuniorPay + totalStandardPay + totalSeniorPay; //total pay for employees
    return totalPay;
}
function CalculateItemCost(data){ //calculates the cost of the extra items
    let itemPrice = 0;
    let items = data.items;

    items.forEach(item => { //for each item run a total of the cost
        itemPrice = itemPrice + parseInt(item.itemPrice) 
    });
    return itemPrice;
}



app.listen(5000, () => {
    console.log("Server started on port 5000")
})