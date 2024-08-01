import React from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../Firebase/Firebase';
import { signInWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();

    const [showPass, setShowPass] = useState(false);
    const [loginEmail,setLoginEmail] = useState("")
    const [loginPassword,setLoginPassword] = useState("")
    const [name, setName] = useState("");

    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = (e) => {
        e.preventDefault();
      setIsOpen(!isOpen);
    }


    const resetPassword = async (e) =>{
        e.preventDefault();
        try{
            const reset = await sendPasswordResetEmail(auth, loginEmail);

              console.log("Password Reset mail sent")
              setIsOpen(!isOpen);
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
        navigate('/');

    }
    catch(err){
        console.log("Error" ,err)
    }
  }

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <div className="bg-blue-50 py-10 px-4 lg:px-16">

        <div className=" flex justify-center bg-white rounded px-6 pt-4 pb-4 mb-2 mx-20">

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
              className="w-1/2 block mx-2 mt-6 bg-blue-500 hover:bg-blue-700 text-white font-semibold px-8 py-2 rounded-sm cursor-pointer"
              onClick={loginUser}

            >
              Login
            </button>

            {/* <div className='text-gray-700 text-sm font-semibold  hover:underline cursor-pointer space-y-[5]'>
                <a href='' onClick={resetPassword}>
            Reset Password
                </a></div> */}

            <button
              className="w-1/2 block mx-2 mt-6 bg-blue-500 hover:bg-blue-700 text-white font-semibold px-8 py-2 rounded-sm cursor-pointer"
              onClick={togglePopup}

            >
              Reset Password
            </button>

            {/* <Link to="/register"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Register
              </Link> */}

          </div>
        </form>

</div>


        {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md p-6 mx-2 bg-slate-100 rounded shadow-lg">
            <h2 className="mb-4 text-2xl font-bold text-blue-500">Reset Mail</h2>
            <p className="mb-4 text-gray-700">
             Click on the below button to send reset password for {loginEmail}.
            </p>
            <button
              onClick={resetPassword}
              className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
            >
              Send Reset Mail
            </button>
          </div>
        </div>
      )}



      </div>
     
    </div>
  )
}

export default Login