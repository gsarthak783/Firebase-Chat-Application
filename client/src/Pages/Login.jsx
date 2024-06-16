import React from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../Firebase/Firebase';
import { signInWithEmailAndPassword, updateProfile } from 'firebase/auth';

const Login = () => {

    const [showPass, setShowPass] = useState(false);
    const [loginEmail,setLoginEmail] = useState("")
    const [loginPassword,setLoginPassword] = useState("")
    const [name, setName] = useState("");

    const updateName = async () =>{
        try{
            const userName = await updateProfile(auth.currentUser, {
                displayName: name
              })

              console.log("Name Updated")
        }
        catch(err){
            console.log("Error", err)
        }
       

    }


  const togglePassVisiblity = (e) => {
    setShowPass(!showPass);
  }

  const loginUser = async (e) => {
    e.preventDefault();
    try{
        const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
    }
    catch(err){
        console.log("Error" ,err)
    }
  }

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <div className="bg-blue-50 py-10 px-4 lg:px-16">

        <div className=" flex  justify-center bg-white rounded px-6 pt-4 pb-4 mb-2 mx-20">

        <form
          
          className="space-y-5"
        >
          <h3 className="text-xl font-semibold mb-4">Please Login</h3>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Email <span className='text-red-500'>*</span></label>
              <input
                id='email'
                name='email'
                placeholder="Enter email"
               onChange={(event)=>{setLoginEmail(event.target.value)}}
                className="create-job-input border-2"
              />
            </div>
            <div className="lg:w-1/2 w-full relative ">
              <label className="block mb-2 text-lg">Password <span className='text-red-500'>*</span></label>
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="Enter Password"
                onChange={(event)=>{setLoginPassword(event.target.value)}}
                className="create-job-input border-2 "
              />
              <span onClick={togglePassVisiblity} className='absolute right-2 inset-y-12 flex'>
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          

          <div className="flex items-center justify-between">
            <button
              className="w-1/4 block mt-6 bg-blue-500 hover:bg-blue-700 text-white font-semibold px-8 py-2 rounded-sm cursor-pointer"
              onClick={loginUser}

            >
              Login
            </button>

            {/* <Link to="/register"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Register
              </Link> */}

          </div>

          {/* <div className=" mt-2 ">

            <Link to="#"
              className=" text-gray-700 text-sm font-semibold  hover:underline cursor-pointer space-y-[5]"

            >
              Forgot Password?
            </Link>

            <div className='flex'>
              <div className='flex text-gray-500 font-semibold'>
                Don't have an account?
              </div>
              <Link to="/register"
                className="flex text-gray-700 pl-1 text-m font-bold mb-2 hover:underline cursor-pointer space-y-[5]"

              >
                Register
              </Link>
            </div>

          </div> */}
        </form>

        
        {/* <p className="text-center text-gray-500 text-xs">
          &copy;2024 JobPortal. All rights reserved.
        </p> */}

</div>

<div className=" ">
              <label className="block mb-2 text-lg"> Enter Name <span className='text-red-500'>*</span></label>
              <input
                id='name'
                name='name'
                placeholder="Enter name..."
               onChange={(event)=>{setName(event.target.value)}}
                className="create-job-input border-2"
              />
              <button
              className="w-1/4 block mt-6 bg-blue-500 hover:bg-blue-700 text-white font-semibold px-8 py-2 rounded-sm cursor-pointer"
              onClick={updateName}

            >
              Update
            </button>
            </div>
      </div>
     
    </div>
  )
}

export default Login