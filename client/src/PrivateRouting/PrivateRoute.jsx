/* eslint-disable react/prop-types */
import React,{useState,useEffect} from "react";
import { Navigate, useLocation } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/Firebase";

const PrivateRoute = ({ children }) => {

  const location = useLocation();
  const [loading,setLoading] = useState(true);

  const [user,setUser] = useState({})
    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        console.log(user)
    })
 
 
  // useEffect(()=>{
  //   if(loginStatus){
  //    setLoading(false);
  //   }
  //   else{
  //     setLoading(true);
  //   }
    
  // },[loginStatus])
  
  // if(loading){
  //   return <div className="text-center text-3xl mx-20">Loading...</div>
  //  } 

      return user ? (
        children
      ) : (
        <Navigate to="/login" state={{ from: location }} replace />
      )
    
  
};

export default PrivateRoute;