import {useRef, useState, useEffect} from 'react';
import Axios from "axios";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
//import { listenerCount } from '../../../server/models/userAccount';


export const Login = ({setLoginStatus, setLoggedInUsername, loginStatus, loggedInUsername}) => {
    const [userName, setUsername] = useState(''); //username
    const [password, setPassword] = useState(''); //password

    const [juniorPay, setJuniorPay] = useState(0); //junior pay
    const [standardPay, setStandardPay] = useState(0); //standard pay
    const [seniorPay, setSeniorPay] = useState(0); //senior pay



    const [loginMessage, setloginMessage] = useState(''); //state for login message
    
    const handleLoginFormSubmit = async (e) => { //when the login form is submited
        e.preventDefault();
        //console.log(userName, password)
        
        setUsername('');
        setPassword('');
        await Axios.post("/quotes/login",{ //send the data from input to the server and perform a login check
            username: userName,
            password: password
        }).then(res=>{ //response from server
            console.log(res.data)
            setloginMessage(res.data)
            if(loginMessage == "Logged In"){ //if the server sends a login message - login
                setLoginStatus(true);
                setLoggedInUsername(userName)
                //loginStatus = true;
            } else if (loginMessage == "Logged In As Admin"){
                setLoginStatus(true);
                setLoggedInUsername(userName);
            }
        })
        await Axios.get("/quotes/login").then((res) => { //performs another check using the get in order to update the change of the DOM
            if(res.data.loggedIn == true){
                setLoginStatus(true)
                //loginStatus = true;
                setLoggedInUsername(res.data.user.username)
                window.location.reload();
                console.log("LOGIN CHECKED")
            }
        });
    }

    const Logout = async(e) => { //logout
        e.preventDefault();
        Axios.get('/quotes/logout').then((res) => { //logs out and sets all of the varables to false
            if(res.data.loggedIn == false){
                setloginMessage("Logged Out")
                setLoggedInUsername('')
                setLoginStatus(false)
                
            }
        });
    }

    const changeEmployeePay = async(employeeType) =>{ //changes employee pay
        let newPay;
        if(employeeType == "junior"){ //makes sure the right pay is changing
            newPay = juniorPay;
        } else if(employeeType == "standard"){
            newPay = standardPay;
        } else if(employeeType == "senior"){
            newPay = seniorPay;
        }
        console.log("Type " + employeeType + " Pay " + newPay)
        Axios.post("/quotes/changeEmployeePay",{ //sends the employee type and the new pay to server
            employeeTypeToChange: employeeType,
            payChange: newPay
        }).then(res=>{
            console.log("Employee Pay Changed")
        });
    }

    const resetFudgeFactor = async(e) => { //resets fudge to 0 so that a quote without it can be made
        e.preventDefault();
        await Axios.post("/quotes/resetFudgeFactor",{
            fudgeFactor: 0
        });
    }

    if(loginStatus == true && loggedInUsername != "admin"){ //if not logged in display login otherwise display links and buttons to function as a profile page
        return (<div>
            <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-md" >
                <div class="flex justify-center space-x-10 text-4xl mb-5">
                    <h1>Welcome...</h1>
                    <h1 class="text-orange-400">{loggedInUsername}</h1>
                </div>
                <div class="py-2 px-6 sm:px-10">
                    <div class="text-2xl text-orange-500 text-center">
                        <h1>{loginStatus}</h1>
                    </div>
                </div>
                <div class="space-x-5 flex justify-center px-10 flex-wrap mt-10">
                    <Link to='/' class="hover:bg-orange-200 bg-orange-300 rounded-lg p-5">Create a Quote</Link>
                    <Link to='/Quotes' class="hover:bg-orange-200 bg-orange-300 rounded-lg p-5">View Quotes</Link>
                </div>
                <div class="flex justify-center mt-5">
                    <button class="hover:bg-orange-200 bg-orange-300 rounded-lg p-5 px-10" onClick={(e) => Logout(e)}>Logout</button>
                </div>
            </div>

        </div>)
    
    } if (loginStatus == true && loggedInUsername == "admin"){
        return(
            <div>
                <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-md" >
                <h1 class="text-2xl mb-5">Admin Account</h1>
                    <div class="py-2 px-6 shadow rounded-lg sm:px-10">
                        <div>
                            <h1>Employee Pay Per Hour</h1>
                        </div>
                        <div class="grid grid-cols-3 items-center">
                            <p class="text-sm text-gray-600 text-center font-bold">Junior Pay</p>
                            <input onChange={(e) => setJuniorPay(e.target.value)} value={juniorPay} type="number" autoComplete='off' class="w-full border border-gray-200 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"></input>
                            <button onClick={(junior)=>changeEmployeePay("junior")} class="bg-orange-400 rounded-lg shadow-lg m-2 p-2 hover:bg-orange-500 hover:font-semibold">Edit</button>
                        </div>
                        <div class="grid grid-cols-3 items-center">
                            <p class="text-sm text-gray-600 text-center font-bold">Standard Pay</p>
                            <input onChange={(e) => setStandardPay(e.target.value)} value={standardPay} type="number" autoComplete='off' class="w-full border border-gray-200 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"></input>
                            <button onClick={(standard)=>changeEmployeePay("standard")} class="bg-orange-400 rounded-lg shadow-lg m-2 p-2 hover:bg-orange-500 hover:font-semibold">Edit</button>
                        </div>
                        <div class="grid grid-cols-3 items-center">
                            <p class="text-sm text-gray-600 text-center font-bold">Senior Pay</p>
                            <input onChange={(e) => setSeniorPay(e.target.value)} value={seniorPay} type="number" autoComplete='off' class="w-full border border-gray-200 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"></input>
                            <button onClick={(senior)=>changeEmployeePay("senior")} class="bg-orange-400 rounded-lg shadow-lg m-2 p-2 hover:bg-orange-500 hover:font-semibold">Edit</button>
                        </div>
                        <div class="grid grid-cols-1 justify-center mt-5">
                            <button  onClick={(e)=>resetFudgeFactor(e)} class="bg-orange-400 rounded-lg shadow-lg m-2 p-2 hover:bg-orange-500 hover:font-semibold">Reset Fudge Factor</button>
                        </div>
                        <div class="flex justify-center mt-5">
                            <button class="hover:bg-orange-200 bg-orange-300 rounded-lg p-5 px-10" onClick={(e) => Logout(e)}>Logout</button>
                        </div>
                    </div>
                </div>
            </div>
        )           
    }else {
        return (
            <div>
                <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-md" >
                <h1 class="text-2xl mb-5">Login</h1>
                    <div class="py-2 px-6 shadow rounded-lg sm:px-10">
                        <div class="text-xl text-orange-500 text-center">
                            <h1>{loginMessage}</h1>
                            <h1>{loginStatus}</h1>
                        </div>
                        
                        <form onSubmit={(e) => {handleLoginFormSubmit(e) }}
                             class="mb-0 space-y-6">
                            <div>
                                <div>
                                    <label class="block text-sm text-gray-600">Email</label>
                                    <div class="mt-1">
                                        <input type="text" onChange={(e) => setUsername(e.target.value)} value={userName} required autoComplete='off' class="w-full border border-gray-200 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"></input>
                                    </div>
                                </div>
                                <div>
                                    <label class="block text-sm text-gray-600">Password</label>
                                    <div class="mt-1">
                                        <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} required class="w-full border border-gray-200 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"></input>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="grid grid-cols-1 justify-center">
                                <button class="bg-orange-400 rounded-lg shadow-lg m-2 p-2 hover:bg-orange-500 hover:font-semibold">Sign In</button>
                            </div>
                        </form>
                        
                    </div>
                </div>
    
            </div>
        
        
        )
    }
    
}