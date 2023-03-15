import React, {useState, setState} from "react";
import Axios from "axios";

//the home component and main page for the website to calculate quotes
export const Home = ({loggedInUser}) => {
    const [employeeList, setEmployeeList] = useState([{employeeType: "", employeeHours: ""}]); //list of employees to add multiple instead of one.
    const EmployeeAdd = () => { //adds employee input boxes to the webpage
        setEmployeeList([...employeeList, {employeeType: "", employeeHours: ""}]);
    }

    const EmployeeRemove = (index) => { //handles removing an employee
        const newEmployeeList = [...employeeList];
        newEmployeeList.splice(index, 1);
        setEmployeeList(newEmployeeList);
    }

    const [itemList, setItemList] = useState([{itemName: "", itemPrice: ""}]); //list of items to add to the dom.

    const ItemAdd = () => { //adds item to the html
        setItemList([...itemList, {itemName: "", itemPrice: ""}]);
    }

    const ItemRemove = (index) => { //removes item from html
        const newItemList = [...itemList];
        newItemList.splice(index, 1);
        setItemList(newItemList);
    }

    const handleEmployeeChange = (e, index) => { //when the input for the employee changes
        const {name, value} = e.target
        const newEmployeeList = [...employeeList];
        newEmployeeList[index][name] = value;
        setEmployeeList(newEmployeeList)
    }
    const handleItemChange = (e, index) => { //input for item change
        const {name, value} = e.target
        const newItemList = [...itemList];
        newItemList[index][name] = value;
        setItemList(newItemList)
    }

    const url = "/quotes/getQuote"
    const [quote, setQuote] = useState({ //structure of the quote to be updated and sent to the backend
        projectName: "",
        projectDescription: "",
        employees: "",
        items: ""
    })
    function handleQuoteChange(e){ //when the input is changed update the quote data
        const newQuote={...quote}
        newQuote[e.target.id] = e.target.value
        newQuote.employees = employeeList
        newQuote.items = itemList
        setQuote(newQuote)
        
    }

    function sendQuote(e){ //sends the quote to the url in the server which will handle the data, process and calcualte the final quote
        e.preventDefault()
        Axios.post(url,{
            projectName: quote.projectName,
            projectDescription: quote.projectDescription,
            employees: quote.employees,
            items: quote.items
        }).then(res=>{
            console.log(res.quote)
        })
    }

    const [finalQuote, setFinalQuote] = useState({text: ""}) //used for getting the quote back from the server
    function getQuote(){
        Axios.get("/quotes/sendQuote").then( res =>{ //gets the quote calculation from the server and updates the text
            const newFinalQuote = res.data;
            setFinalQuote({text: newFinalQuote})
        });
    }

    function saveQuote(e){ //sends the quote to the url in the server which will handle the data, process and calcualte the final quote
        e.preventDefault()
        Axios.post("/quotes/saveQuote",{
            projectName: quote.projectName,
            projectDescription: quote.projectDescription,
            employees: quote.employees,
            items: quote.items,
            username: loggedInUser
        }).then(res=>{
            console.log(res.quote)
        })
    }
    
    
    // console.log(quote)
    return (
        <div>
            
            <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-md" >
            <h1 class="text-2xl mb-5 p-5">Generate a quote for your project</h1>
                <div class="py-2 px-6 shadow rounded-lg sm:px-10">
                    <form class="mb-0 space-y-6">
                        {/* Project Details */}
                        <div>
                            <h2>Project Details</h2>
                            <div>
                                <label class="block text-sm text-gray-600">Project Name</label>
                                <div class="mt-1">
                                    <input type="text" onChange={(e)=>handleQuoteChange(e)} id="projectName" value={quote.projectName} class="w-full border border-gray-200 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"></input>
                                </div>
                            </div>
                            <div>
                                <label class="block text-sm text-gray-600">Project Description</label>
                                <div class="mt-1">
                                    <textarea onChange={(e)=>handleQuoteChange(e)} id="projectDescription" value={quote.projectDescription} type="text" class="w-full border text-xs border-gray-200 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"></textarea>
                                </div>
                            </div>
                        </div>
                        {/* Employyes */}
                        <div>
                            <h2>Employees</h2>
                            {employeeList.map((singleEmployee, index) => (
                                <div class="flex space-x-5">
                                
                                <div>
                                    <label class="block text-sm text-gray-600">Type</label>
                                        <div class="mt-1">
                                            <select name="employeeType" typeof="text" onChange={(e)=> {handleEmployeeChange(e, index); handleQuoteChange(e)}} class="border w-44 border-gray-200 px-5 py-2 rounded-lg shadow-sm focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400">
                                                <option class="text-sm">Junior</option>
                                                <option class="text-sm">Standard</option>
                                                <option class="text-sm">Senior</option>
                                            </select>
                                        </div>    
                                </div>
                                <div>
                                    <label class="block text-sm text-gray-600">Hours Work</label>
                                        <div class="mt-1">
                                            <input type="number" name="employeeHours" onChange={(e)=> {handleEmployeeChange(e, index); handleQuoteChange(e)}} class="border w-20 border-gray-200 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"></input>
                                        </div>
                                </div>
                                {employeeList.length > 1 && <div class="mt-4"> 
                                    <button class="bg-orange-400 rounded-lg shadow-lg m-2 p-2 px-3 text-center hover:bg-orange-500 hover:font-semibold" type="button" onClick={() => EmployeeRemove(index)}>X</button>
                                    </div>
                                } 
                                
                                </div>    
                            ))}
                            
                            <div class="flex justify-end">
                                <button class="hover:text-orange-500 hover:font-semibold text-sm text-blue-400" type="button" onClick={EmployeeAdd}>Add Employee</button>
                            </div>
                        </div>
                        {/* Extra Items */}
                        <div>
                            <h2>Extras</h2>
                            {itemList.map((singleItem, index) => (
                                <div class="flex space-x-5">
                                    <div>
                                        <label class="block text-sm text-gray-600">Item Name</label>
                                            <div class="mt-1">
                                                <input type="text" name="itemName" onChange={(e)=> {handleItemChange(e, index); handleQuoteChange(e)}} class="w-full border border-gray-200 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"></input>
                                            </div>
                                    </div>
                                    <div>
                                        <label class="block text-sm text-gray-600">Price (£)</label>
                                        <div class="mt-1">
                                            <input type="number" name="itemPrice" onChange={(e)=> {handleItemChange(e, index); handleQuoteChange(e)}} class="w-full border border-gray-200 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"></input>
                                        </div>
                                    </div>
                                    {itemList.length > 1 && <div class="mt-4"> 
                                    <button class="bg-orange-400 rounded-lg shadow-lg m-2 p-2 px-3 text-center hover:bg-orange-500 hover:font-semibold" type="button" onClick={() => ItemRemove(index)}>X</button>
                                    </div>
                                }
                                </div>
                            ))}
                            
                            <div class="flex justify-end">
                                <button class="hover:text-orange-500 hover:font-semibold text-sm text-blue-400" type="button" onClick={ItemAdd}>Add Item</button>
                            </div>
                        </div>
                        {/* Get quote button */}
                        <div class="grid grid-cols-1 justify-center">
                            <button class="bg-orange-400 rounded-lg shadow-lg m-2 p-2 hover:bg-orange-500 hover:font-semibold" type="button" onClick={(e)=> {sendQuote(e); getQuote()}}>Get Quote</button>
                        </div>
                        {/* Display final quote */}
                        <div class="grid grid-cols-2 items-center justify-center">
                            <h3 class="">Your Final Quote Is...</h3>
                            <h1 class=" text-4xl underline text-orange-400">{finalQuote.text}</h1>
                        </div>
                        
                    </form>
                    <div class="flex justify-end mt-5">
                            <button class="bg-orange-400 rounded-lg shadow-lg p-2 hover:bg-orange-500 hover:font-semibol" type="button" onClick={(e) => saveQuote(e)}>Save Quote</button>
                    </div>
                </div>
            </div>

    </div>
    
    
    )
}