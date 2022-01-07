import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {createContext, useContext} from "react";

console.log(process.env)
const firebaseConfig = {
  apiKey: "AIzaSyB56e25C3rFEpuBzf3JLAxljhT8PE8Cuc8",
  authDomain: process.env["REACT_APP_FIREBASE_AUTH_DOMAIN "],
  projectId: process.env["REACT_APP_FIREBASE_PROJECT_ID "],
  storageBucket: process.env["REACT_APP_FIREBASE_STORAGE_BUCKET "],
  messagingSenderId: process.env["REACT_APP_FIREBASE_MESSAGING_SENDER_ID "],
  appId: process.env["REACT_APP_FIREBASE_APP_ID "],
  measurementId: process.env["REACT_APP_FIREBASE_MEASUREMENT_ID "],
};

const app = initializeApp(firebaseConfig);
