import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyDQ3wb5Zhk5sCdied7IChk3Q5y-R5SXLY4", //Use your api key
  authDomain: "fir-auth-740be.firebaseapp.com", //Use your api key
  projectId: "fir-auth-740be", //Use your api key
  storageBucket: "fir-auth-740be.appspot.com", //Use your api key
  messagingSenderId: "187299185086", //Use your api key
  appId: "1:187299185086:web:660ac03c34cc2f9824b9ef", //Use your api key
  measurementId: "G-PBBWZJ26CK" //Use your api key
};  

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage
const auth = getAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export { app, auth };
