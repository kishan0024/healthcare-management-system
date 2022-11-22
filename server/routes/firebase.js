// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage';


import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyBROCf76PY9oElOeOvdplNJrFS18fO0nm4",

  authDomain: "healthapp-6fe17.firebaseapp.com",

  projectId: "healthapp-6fe17",

  storageBucket: "healthapp-6fe17.appspot.com",

  messagingSenderId: "908541120100",

  appId: "1:908541120100:web:7da7703ff61ebc8705d971",

  measurementId: "G-G8ZD9L0T0V"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
const storage=getStorage(app)

const analytics = getAnalytics(app);