import {createContext, useContext} from "react";
import {getAuth, signOut} from "firebase/auth";
import {useAuthState} from "react-firebase-hooks/auth";
import {useLocation} from "react-router-dom";

export const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
 const auth = getAuth();

  return <AuthContext.Provider value={{auth}}>
    {children}
  </AuthContext.Provider>
}
