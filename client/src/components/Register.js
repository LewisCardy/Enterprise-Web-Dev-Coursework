import {useRef, useState, useEffect} from 'react';
import Axios from "axios";
import Swal from 'sweetalert2';

export const Register = () => {
    const userRef = useRef();

    const [userName, setUsername] = useState(''); //username
    const [password, setPassword] = useState(''); //password

    useEffect(() => {
      userRef.current.focus();
    }, []);
    
    const registerUser = async (e) => { //when register  button pressed send to the server username and password to hash password and create account
        e.preventDefault();
        console.log(userName, password)
        setUsername('');
        setPassword('');
        if(userName != "admin"){
            Axios.post("/quotes/register",{
                username: userName,
                password: password
            });
            Swal.fire({ //popup
                title: 'Account Created'
            });
        } else {
            console.log("Cant use this username");
        };
    };
    return (
        <div>
            <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-md" >
            <h1 class="text-2xl mb-5">Register</h1>
                <div class="py-2 px-6 shadow rounded-lg sm:px-10">
                    <form onSubmit={registerUser} class="mb-0 space-y-6">
                        <div>
                            <div>
                                <label class="block text-sm text-gray-600">Email</label>
                                <div class="mt-1">
                                    <input type="text" ref={userRef} onChange={(e) => setUsername(e.target.value)} value={userName} required autoComplete='off' class="w-full border border-gray-200 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"></input>
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
                            <button class="bg-orange-400 rounded-lg shadow-lg m-2 p-2 hover:bg-orange-500 hover:font-semibold">Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}