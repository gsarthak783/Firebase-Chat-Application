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
    })

      return user ? (
        children
      ) : (
        <Navigate to="/login" state={{ from: location }} replace />
      )
    
  
};

export default PrivateRoute;