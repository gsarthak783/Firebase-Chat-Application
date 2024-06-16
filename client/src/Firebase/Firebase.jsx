import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAsIkVLzAxgWyprs8O3b1UJJMPSqKee9lU",
    authDomain: "authentication-9c79d.firebaseapp.com",
    projectId: "authentication-9c79d",
    storageBucket: "authentication-9c79d.appspot.com",
    messagingSenderId: "37062694081",
    appId: "1:37062694081:web:911b761cf95a96afb8b040",
    measurementId: "G-0T07V4CVT6"
  };

  const app = initializeApp(firebaseConfig);

  export const auth = getAuth(app)
