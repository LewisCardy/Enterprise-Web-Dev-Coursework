import {useState} from 'react'
import {createBrowserRouter, createRoutesFromElements, Route, Link, Outlet, RouterProvider} from 'react-router-dom'
import {Home} from "./components/Home"
import {Login} from "./components/Login"
import {Quotes} from "./components/Quotes"
import {Register} from "./components/Register"
import axios from 'axios';
// import {ProtectedRoutes} from './components/ProtectedRoutes'

axios.defaults.baseURL="http://localhost:5000/";
axios.defaults.withCredentials = true;

function App() {
  const [loginStatus, setLoginStatus] = useState(false);
  const [loggedInUsername, setLoggedInUsername] = useState('');

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Root loginStatus={loginStatus} loggedInUsername={loggedInUsername}  />}>
        {/* <Route element={<ProtectedRoutes loggedIn={loginStatus}/>}> */}
          <Route path='/' index element={<Home loggedInUser={loggedInUsername} />}/>
          <Route path='/Login' element={<Login setLoginStatus={setLoginStatus} setLoggedInUsername={setLoggedInUsername}/>}/>
          <Route path='/Register' element={<Register />}/>
          <Route path='/Quotes' element={<Quotes loggedInUser={loggedInUsername} />}/>
        </Route>
      // </Route>
    )
  )

  console.log(loginStatus)

  return (
    <div class=" text-slate-700 h-screen font-title">
      <RouterProvider router={router}/>
    </div>
  )
}

const Root = ({loginStatus, loggedInUsername}) => {
  return <> 
    <div class="grid grid-cols-2 p-4 font-title  bg-gray-100 items-center shadow-lg ">
      <div class="flex space-x-5 border-gray-700">
        <h1 class="text-2xl text-orange-500 font-medium">Project Quote Generator
        </h1>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" class=" hidden sm:flex"><path fill="none" d="M0 0h24v24H0z"/><path d="M4 2h16a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zm3 10v2h2v-2H7zm0 4v2h2v-2H7zm4-4v2h2v-2h-2zm0 4v2h2v-2h-2zm4-4v6h2v-6h-2zM7 6v4h10V6H7z" fill="#fb923c"/></svg>
      </div>
      
      <div class="space-x-2 flex justify-end pr-10 flex-wrap">
        <Link to="/" class="hover:bg-orange-300 p-2 rounded-lg">Home</Link>
        <Link to="/Login" class="hover:bg-orange-300 p-2 rounded-lg"> Login </Link>
        <Link to="/Register" class="hover:bg-orange-300 p-2 rounded-lg"> Register </Link>
        <Link to="/Quotes" class="hover:bg-orange-300 p-2 rounded-lg"> Quotes </Link>
      </div>
      
    </div>
    <div>
      <Outlet />
      <h1>Login Status : {String(loginStatus)}</h1>
      <h1>Logged in Username: {loggedInUsername}</h1>
    </div>
  </>
}

export default App