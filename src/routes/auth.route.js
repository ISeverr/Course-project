import {getAuth} from "firebase/auth";
import {useAuthState} from "react-firebase-hooks/auth";
import {Route, Routes} from "react-router-dom";
import UserPage from "./userPage/UserPage";
import CreateCollection from "./userPage/CreateUserCollection";
import NotFoundPage from "./notFoundPage/NotFoundPage";
import {AuthContext, AuthProvider} from "../hoc/AuthProvider";
import {useContext} from "react";
import CreateItemUserCollection from "./userPage/CreateItemUserCollection";
import ItemsPage from "./userPage/ItemsPage";


export const AuthRoute = () => {
  const {auth} = useContext(AuthContext)
  const [user, loading] = useAuthState(auth)

  return (
    <>
      {user
        ? (
          <>
            <Route path="user-page" element={<UserPage/>}/>
            <Route path="user-page/create-collection" element={<CreateCollection/>}/>
            <Route path="user-page/create-collection/edit-collection" element={<CreateItemUserCollection/>}/>
            <Route path="user-page/create-collection/items" element={<ItemsPage/>}/>
          </>
        )
        : <Route path="*" element={<NotFoundPage/>}/>
      }
    </>
  )
}

