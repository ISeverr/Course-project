import {useLocation, Navigate} from "react-router-dom";
import {useContext} from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {getAuth} from "firebase/auth";
import {AuthContext} from "./AuthProvider";


const RequireAuth = ({children}) => {

    const test = true
  if(!true) {
    return  <Navigate to="/authorization" />
  }

  return children;
};

export default RequireAuth;