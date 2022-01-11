import {createContext, useContext, useState} from "react";
import {getAuth, signOut} from "firebase/auth";


export const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
 const auth = getAuth();


  return <AuthContext.Provider value={{auth}}>
    {children}
  </AuthContext.Provider>
}
