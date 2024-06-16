import React from 'react'
import { Routes,Route,BrowserRouter } from 'react-router-dom'
import HomePage from '../Pages/HomePage'
import Messages from '../Pages/Messages'
import Login from '../Pages/Login'
import Register from '../Pages/Register';
import Navbar from '../Components/Navbar';
import PrivateRoute from '../PrivateRouting/PrivateRoute'
import Private from '../Pages/Private'

function Router() {


  return (

    <div>
        <BrowserRouter>
        <Navbar/>
            <Routes>
                <Route path='/' element={<HomePage/>} />
                <Route path='message' element={<Messages/>} />
                <Route path='login' element={<Login/>} />
                <Route path='register' element={<Register/>} />
                <Route path='private' element={<PrivateRoute><Private/></PrivateRoute>} />
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default Router