import {createContext, useContext, useState} from "react";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {collection, doc, getDocs, setDoc} from "@firebase/firestore";
import {database} from "../firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import { getDatabase, ref, set} from "firebase/database";
import {getStorage} from "firebase/storage";


export const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
 const auth = getAuth();
 const {user} = getAuth()
 const db = getDatabase()
 const storage = getStorage()

 const login = async (auth, email, password, navigate) => {
  try {
   const response = await signInWithEmailAndPassword(auth, email, password);
   const {user} = response;
   navigate()
  } catch (error) {
   console.error(error);
   alert(error.message);
  }
 }

 const registration = async (auth, email, password, navigate) => {
  try {
   const response = await createUserWithEmailAndPassword(auth, email, password);
   const {user} = response;
   const newUser = await set(ref(db, "users/" + auth.currentUser.uid ), {
   email: email,
  });
   console.log(newUser)
   navigate()
   console.log(user);
  } catch (err) {
   console.error(err);
   alert(err.message);
  }
 };

 const logout = (auth) => {
  signOut(auth).then(() => {
  }).catch((error) => {
   console.log(error)
  });
 }

 console.log(auth)


 return <AuthContext.Provider value={{auth, login, registration, logout, user, db, storage}}>
    {children}
  </AuthContext.Provider>
}
