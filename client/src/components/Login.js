import {useRef, useState, useEffect} from 'react';
import Axios from "axios";
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';


export const Login = () => {
    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const [loginMessage, setloginMessage] = useState('');
    const [loginStatus, setLoginStatus] = useState('');
    
    useEffect(() => {
        Axios.get("/quotes/login").then((res) => {
            if(res.data.loggedIn == true){
                setLoginStatus("Logged in as: " + res.data.user.username)
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
        })

    }

    

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