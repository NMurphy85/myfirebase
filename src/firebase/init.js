// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrj5hU5og8jStF02MEA0_fngxSi9urVC8",
  authDomain: "myfirebase-5c437.firebaseapp.com",
  projectId: "myfirebase-5c437",
  storageBucket: "myfirebase-5c437.firebasestorage.app",
  messagingSenderId: "9850931159",
  appId: "1:9850931159:web:e6d99334f8d93d251f2d92"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 export const auth = getAuth()
 export const db = getFirestore()