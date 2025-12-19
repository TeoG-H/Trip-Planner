// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTGOdUPIu8YfQUsnWtfNFj4vuGGV4PTjo",
  authDomain: "trip-planner-5f1a1.firebaseapp.com",
  projectId: "trip-planner-5f1a1",
  storageBucket: "trip-planner-5f1a1.firebasestorage.app",
  messagingSenderId: "327821879806",
  appId: "1:327821879806:web:bae64633cefe784224b8af",
  measurementId: "G-F9008BD6W9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)
//const analytics = getAnalytics(app);