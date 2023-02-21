import React, {useState} from "react";
import Axios from "axios";

export const Home = () => {
    const [employeeList, setEmployeeList] = useState([{employeeType: "", employeeHours: ""}]);
    // console.log (employeeList);
    const EmployeeAdd = () => {
        setEmployeeList([...employeeList, {employeeType: "", employeeHours: ""}]);
    }

    const EmployeeRemove = (index) => {
        const newEmployeeList = [...employeeList];
        newEmployeeList.splice(index, 1);
        setEmployeeList(newEmployeeList);
    }

    const [itemList, setItemList] = useState([{item: ""}]);

    const ItemAdd = () => {
        setItemList([...itemList, {item: ""}]);
    }

    const ItemRemove = (index) => {
        const newItemList = [...itemList];
        newItemList.splice(index, 1);
        setItemList(newItemList);
    }

    const url = ""
    const [quote, setQuote] = useState({
        projectName: "",
        projectDescription: "",
        employees: [],
        items: []
    })
    function handleQuoteChange(e){
        const newQuote={...quote}
        newQuote[e.target.id] = e.target.value
        newQuote.employees = employeeList
        setQuote(newQuote)
        
    }

    const handleEmployeeChange = (e, index) => {
        const {name, value} = e.target
        const newEmployeeList = [...employeeList];
        newEmployeeList[index][name] = value;
        setEmployeeList(newEmployeeList)
    }
    console.log(quote)
    return (
        <div>
            
            <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-md" >
            <h1 class="text-2xl mb-5 p-5">Generate a quote for your project</h1>
                <div class="py-2 px-6 shadow rounded-lg sm:px-10">
                    <form class="mb-0 space-y-6">
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
                        <div>
                            <h2>Employees</h2>
                            {employeeList.map((singleEmployee, index) => (
                                <div class="flex space-x-5">
                                
                                <div>
                                    <label class="block text-sm text-gray-600">Type</label>
                                        <div class="mt-1">
                                            <select name="employeeType" onChange={(e)=> {handleEmployeeChange(e, index); handleQuoteChange(e)}} class="border w-44 border-gray-200 px-5 py-2 rounded-lg shadow-sm focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400">
                                                <option class="text-sm">Junior</option>
                                                <option class="text-sm">Standard</option>
                                                <option class="text-sm">Senior</option>
                                            </select>
                                        </div>    
                                </div>
                                <div>
                                    <label class="block text-sm text-gray-600">Hours Work</label>
                                        <div class="mt-1">
                                            <input type="number" name="employeeHours" onChange={(e)=> handleEmployeeChange(e, index)} class="border w-20 border-gray-200 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"></input>
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
                        <div>
                            <h2>Extras</h2>
                            {itemList.map((singleItem, index) => (
                                <div class="flex space-x-5">
                                    <div>
                                        <label class="block text-sm text-gray-600">Item Name</label>
                                            <div class="mt-1">
                                                <input type="text" class="w-full border border-gray-200 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"></input>
                                            </div>
                                    </div>
                                    <div>
                                        <label class="block text-sm text-gray-600">Price (£)</label>
                                        <div class="mt-1">
                                            <input type="number" class="w-full border border-gray-200 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"></input>
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
                        <div class="grid grid-cols-1 justify-center">
                            <button class="bg-orange-400 rounded-lg shadow-lg m-2 p-2 hover:bg-orange-500 hover:font-semibold">Get Quote</button>
                        </div>
                        <div class="grid grid-cols-2 items-center justify-center">
                            <h3 class="">Your Final Quote Is...</h3>
                            <h1 class=" text-4xl underline text-orange-400">£125000</h1>
                        </div>
                        <div class="flex justify-end m-0">
                            <button class="bg-orange-400 rounded-2xl shadow-lg m-0 p-2 hover:bg-orange-500 hover:font-semibol">Save Quote</button>
                        </div>
                    </form>
                </div>
            </div>

    </div>
    
    
    )
}