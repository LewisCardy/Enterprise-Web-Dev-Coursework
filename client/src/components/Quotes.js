import { useEffect, useState } from "react";
import Axios from "axios";

export const Quotes = () => {
    const [quoteData, setQuoteData] = useState([]); //state for the quotes to go

    useEffect(() => { //gets the quotes from the api and sets the quote data to the data fetched
        const getQuoteData = async () => {
            const res = await fetch('http://localhost:5000/quotes/getAllQuotes');
            const getData = await res.json();
            setQuoteData(getData);
            console.log(getData)
        }
        getQuoteData();
    }, []);
    
    function deleteQuote(quoteName){ //deletes the quote
        Axios.post('/quotes/deleteQuote',{
            projectName: quoteName
        }).then(res=>{
            console.log()
        })
        window.location.reload()
    }

    return (
        <div class="mt-10 sm:mx-auto sm:w-full px-20 pt-5" >
            <h1 class="text-2xl mb-5">Quotes</h1>
            <div class="flex flex-col overflow-x-auto shadow rounded-lg">
                <div class="sm:-mx-6 lg:-mx-8">
                    <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div class="overflow-x-auto">
                            <table class="min-w-full text-left text-sm font-light">
                                <thead class="border-b dark:border-neutral-500">
                                    <tr class="bg-orange-200 text-center text-xl">
                                        <th class="px-6 py-3 font-bold">Name</th>
                                        <th class="px-6 py-3">Description</th>
                                        <th class="px-6 py-3">Total Employee Hours</th>
                                        <th class="px-6 py-3">Employee Pay</th>
                                        <th class="px-6 py-3">Item Cost</th>
                                        <th class="px-6 py-3">Quote</th>
                                        <th class="px-6 py-3"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    quoteData.map((getQuote)=>( //mpas the quote data to table data and display the quotes
                                            
                                        <tr class="border-b dark:border-neutral-500 text-center hover:bg-orange-100">
                                            <td class="whitespace-nowrap px-6 py-4 font-medium">{getQuote.projectName}</td>
                                            <td class="whitespace-nowrap px-6 py-4">{getQuote.projectDescription}</td>
                                            <td class="whitespace-nowrap px-6 py-4">{getQuote.employeeHours}</td>
                                            <td class="whitespace-nowrap px-6 py-4">{getQuote.employeePay}</td>
                                            <td class="whitespace-nowrap px-6 py-4">{getQuote.items}</td>
                                            <td class="whitespace-nowrap px-6 py-4">{getQuote.finalQuote}</td>
                                            <td class="whitespace-nowrap px-6 py-4"><button class="bg-orange-400 rounded-lg shadow-lg text-center px-2 hover:bg-orange-500 hover:font-semibold" type="button" onClick={() => deleteQuote(getQuote.projectName)}>X</button></td>
                                            
                                        </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
                

        </div>
    );
}