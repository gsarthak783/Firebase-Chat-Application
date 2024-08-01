import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import HomePage from '../Pages/HomePage';
import { auth } from '../Firebase/Firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useState } from 'react';

const Navbar = () => {

   
    const [user,setUser] = useState({})
    const [username,setUsername] = useState("")
    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        console.log(user)
        console.log(user?.email)
        setUsername(user?.email);
    })

    const logout = async () => {
        signOut(auth);
       // window.location.reload();
        

    }
  return (
    <div className="bg-slate-300 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to='/' className=" text-xl font-bold">Home</Link>
        <div className="flex space-x-4 font-mono">
        {user === null ? (
            <>
            <Link to={`/chat/${username}`} className="text-white bg-blue-500 p-2 rounded-lg ">Chat</Link>
        <Link to='register' className="text-white bg-blue-500 p-2 rounded-lg ">Register</Link>
        <Link to='login' className="text-white bg-blue-500 p-2 rounded-lg ">Login</Link>
            </>
        ) : (
           <div>
           {user?.email}

           <Link to={`/chat/${username}`} className="text-white bg-blue-500 p-2 rounded-lg ">Chat</Link>
           {/* <Link to='/' onClick={logout} className="text-white bg-blue-500 p-2 rounded-lg ">Logout</Link> */}
           <button
           onClick={logout}
            className='mx-2 bg-blue-600 text-white p-2 rounded-lg'>Logout</button>
           </div> 
        )}
            
        </div>
      </div>
    </div>
  );
};

export default Navbar;
