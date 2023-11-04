import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDQ3wb5Zhk5sCdied7IChk3Q5y-R5SXLY4",
    authDomain: "fir-auth-740be.firebaseapp.com",
    projectId: "fir-auth-740be",
    storageBucket: "fir-auth-740be.appspot.com",
    messagingSenderId: "187299185086",
    appId: "1:187299185086:web:660ac03c34cc2f9824b9ef",
    measurementId: "G-PBBWZJ26CK"
  };  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const authInstance = getAuth(app);

export { app, authInstance as auth };
