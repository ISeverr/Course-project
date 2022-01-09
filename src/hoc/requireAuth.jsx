import {useLocation, Navigate} from "react-router-dom";
import {useContext} from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {getAuth} from "firebase/auth";
import {AuthContext} from "./AuthProvider";


const RequireAuth = ({children}) => {
  //const location = useLocation();
  const {auth} = useContext(AuthContext);
  const [user] = useAuthState(auth);
  console.log(user)
    const test = true
  if(!test) {
    return  <Navigate to="/authorization" />
  }

  return children;
};

export default RequireAuth;