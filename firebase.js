// firebase.js
import { initializeApp, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyDQ3wb5Zhk5sCdied7IChk3Q5y-R5SXLY4",
  authDomain: "fir-auth-740be.firebaseapp.com", 
  projectId: "fir-auth-740be", 
  storageBucket: "fir-auth-740be.appspot.com", 
  messagingSenderId: "187299185086", 
  appId: "1:187299185086:web:660ac03c34cc2f9824b9ef", 
  measurementId: "G-PBBWZJ26CK",
  databaseURL: "https://fir-auth-740be-default-rtdb.asia-southeast1.firebasedatabase.app"
};  

let app;

try {
  app = getApp();
} catch (error) {
  app = initializeApp(firebaseConfig);
}

const auth = getAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

const database = getDatabase(app);

export { app, auth, database };
