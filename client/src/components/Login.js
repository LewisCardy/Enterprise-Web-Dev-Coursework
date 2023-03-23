import {useRef, useState, useEffect} from 'react';
import Axios from "axios";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
//import { listenerCount } from '../../../server/models/userAccount';


export const Login = ({setLoginStatus, setLoggedInUsername}) => {
    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const [loginMessage, setloginMessage] = useState('');
    //const [loginStatus, setLoginStatus] = useState('');
    var loginStatus;
    
    useEffect(() => {
        Axios.get("/quotes/login").then((res) => {
            if(res.data.loggedIn == true){
                setLoginStatus(true)
                loginStatus = true;
                setloginMessage("Logged in as: " + res.data.user.username)
                setLoggedInUsername(res.data.user.username)
            }
        });
    },[]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log(userName, password)
        
        setUsername('');
        setPassword('');
        Axios.post("/quotes/login",{
            username: userName,
            password: password
        }).then(res=>{
            console.log(res.data)
            setloginMessage(res.data)
            if(loginMessage == "Logged In"){
                setLoginStatus(true);
                setLoggedInUsername(userName)
                loginStatus = true;
            }
        })
    }
    const Logout = async(e) => {
        Axios.get('/quotes/logout').then((res) => {
            if(res.data.loggedIn == false){
                setloginMessage("Logged Out")
                setLoggedInUsername('')
                setLoginStatus(false)
                loginStatus = false
            }
        });
    }
    console.log("LoGIN" + loginStatus)
    if({loginStatus} == true){
        return (<div>
            <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-md" >
                <h1 class="text-4xl mb-5">Welcome...</h1>
                <div class="py-2 px-6 sm:px-10">
                    <div class="text-2xl text-orange-500 text-center">
                        <h1>{loginMessage}</h1>
                        <h1>{loginStatus}</h1>
                    </div>
                </div>
                <div class="space-x-2 flex justify-center px-10 flex-wrap mt-10">
                    <Link to='/' class="hover:bg-orange-200 bg-orange-300 rounded-lg p-5">Create a Quote</Link>
                    <Link to='/Quotes' class="hover:bg-orange-200 bg-orange-300 rounded-lg p-5">View Quotes</Link>
                </div>
                <div class="space-x-2 flex justify-center px-10 flex-wrap mt-5">
                    <button class="hover:bg-orange-200 bg-orange-300 rounded-lg p-5" onClick={(e) => Logout(e)}>Logout</button>
                </div>
            </div>

        </div>)
    
    } else {
        return (
            <div>
                <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-md" >
                <h1 class="text-2xl mb-5">Login</h1>
                    <div class="py-2 px-6 shadow rounded-lg sm:px-10">
                        <div class="text-xl text-orange-500 text-center">
                            <h1>{loginMessage}</h1>
                            <h1>{loginStatus}</h1>
                        </div>
                        
                        <form onSubmit={(e) => {handleSubmit(e) }}
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