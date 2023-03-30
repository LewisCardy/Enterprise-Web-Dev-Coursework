const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router()
const Quote = require('../models/Quote')
const UserAccount = require('../models/userAccount')
const bcrypt = require('bcrypt');

let finalCost; //final quote cost
let totalPay = 0;
let totalHours = 0;
let itemPrice = 0;

let juniorPay = 10;
let standardPay = 20;
let seniorPay = 30;

let fudgeFactor = 10;//Math.floor(Math.random() * 1.5) + 0.5;

router.use('/getQuote', (req, res) => { //gets the quote sent from the front end
    let data = req.body;
    CalculateProjectCost(data) //calculates quote
});

router.get('/sendQuote', (req, res) => { //sends the new calculated quote back to the front end
    finalCost = finalCost * fudgeFactor;
    let quotePrice = finalCost;
    res.end(JSON.stringify(quotePrice))
    console.log(quotePrice)
});

router.use('/saveQuote', async(req, res) => { //saves the quote in database
    let data = req.body;
    console.log(data)
    console.log(finalCost)
    try { //makes a new quote with data taken from the request aswell as from the global variables in server
        
        const quote = new Quote({ //new quote to be insrted with the following
            projectName: data.projectName,
            projectDescription: data.projectDescription,
            employeePay: totalPay,
            employeeHours: totalHours,
            items: itemPrice,
            finalQuote: finalCost.toString(),
            createdBy: data.username
    
        });
        const newQuote = await quote.save() //saves new quote
        console.log(quote);
    } catch (e) { //if error
        console.log(e.message)
    }
    
});

router.use('/getAllQuotes', async(req, res) => { //gets all quotes from the database
    let user = req.body.username
    console.log(user)
    const quoteData = await Quote.find({createdBy: user}) //finds all quotes created by the user
    console.log(quoteData)
    res.json(quoteData); //sends the quotes as a json
});

router.use('/deleteQuote', async(req, res) => { //deletes a quote 
    let quoteName = req.body
    console.log(quoteName)
    const quoteData = await Quote.findOneAndDelete({projectName: quoteName.projectName}) //finds quote by its name from the client and deletes it
    console.log("Deleted Entry")
});

router.use('/editQuote', async(req, res) => { //edits a quote
    let oldQuoteName = req.body.projectName; //old name
    let newQuoteName = req.body.newName.newQuote; //new name
    console.log("NEW QUOTE " + newQuoteName)
    console.log(oldQuoteName, newQuoteName)
    const quoteData = await Quote.findOne({projectName: oldQuoteName}) //finds the quote to be changed
    console.log(quoteData)
    quoteData.projectName = newQuoteName; //change quote
    await quoteData.save() //save changed quote

});

router.get('/login', (req, res) => { //login get route //login checker
    console.log(req.session.user)
    if (req.session.user) { //if logged in
        res.send({loggedIn: true, user: req.session.user})
    } else {
        res.send({loggedIn: false})
    }
});

router.get('/logout', (req, res) => { //logout
    if(req.session.user) { //if logged in close session and logout
        res.send({loggedIn: false})
        req.session.destroy();
    }
});

router.post('/login', async(req, res) => { //the login route
    let isDetailsCorrect = false;
    try {
        const user = await UserAccount.findOne({username: req.body.username}).lean().then(async(res) => { //finds if the user exists within the database with the username
            const userFound = res //the found user
            const isPasswordCorrect = await bcrypt.compare(req.body.password, userFound.password) //compares the password entered to the hashed password in database

            if(isPasswordCorrect){ //if the password is correct
                console.log("Success")
                isDetailsCorrect = true
                req.session.user = userFound; //creates session with user details
                console.log(req.session.user)
            } else { //else incorrect
                console.log("password incorrect")
                isDetailsCorrect = false
            }
        }).catch((e) => { //if the user is not found
            //console.log("User not found")
            console.log("User Not Found")
        })
        if (isDetailsCorrect){ //if all details correct
            
            res.send('Logged in')
        } else if (isDetailsCorrect && req.body.username == "admin"){
            res.send('Logged in as Admin')
        }else { //else details incorrect
            res.send('Username/Password Incorrect')
        }
    } catch (e) { //login route error
        console.log(e.message)
    }
});

router.use('/register', async(req, res) => { //register user
    console.log(req.body.password)
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10) //hash the password by 10 characters
        const user = new UserAccount({ //creates new account in database
            username: req.body.username,
            password: hashedPassword
        });
        const newUser = await user.save() //saves new user
        console.log(user)
    } catch (e) {
        console.log(e.message)
    }
    
});

router.use('/changeEmployeePay', async(req, res) => {
    if(req.body.employeeTypeToChange == "junior"){
        juniorPay = req.body.payChange
    } else if(req.body.employeeTypeToChange == "standard"){
        standardPay = req.body.payChange
    } else {
        seniorPay = req.body.payChange
    }
    console.log(juniorPay + " " + standardPay + " " + seniorPay)
});

router.use('/resetFudgeFactor', async(req, res) => {
    console.log(fudgeFactor)
    fudgeFactor = req.body.fudgeFactor
    console.log(fudgeFactor)
});


function CalculateProjectCost(data){ //calculates the quote using the data sent from the front end
    finalCost = CalculateEmployeeCost(data) + CalculateItemCost(data)
    console.log("FINAL COST" + finalCost)
    let projectName = data.projectName;
    let projectDescription = data.projectDescription;
    
}

function CalculateEmployeeCost(data){ //calculates the pay for the employees
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