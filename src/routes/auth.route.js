import {getAuth} from "firebase/auth";
import {useAuthState} from "react-firebase-hooks/auth";
import {Route, Routes} from "react-router-dom";
import UserPage from "./userPage/UserPage";
import CreateCollection from "./userPage/modals/CreateCollection";
import NotFoundPage from "./notFoundPage/NotFoundPage";
import {AuthContext, AuthProvider} from "../hoc/AuthProvider";
import {useContext} from "react";
import CreateItem from "./userPage/modals/CreateItem";
import ItemsPage from "./userPage/ItemsPage";
import HomePage from "./homepage/HomePage";


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
            <Route path="user-page/create-collection/edit-collection" element={<CreateItem/>}/>
            <Route path="user-page/create-collection/items" element={<ItemsPage/>}/>
          </>
        )
        : <Route path="*" element={<NotFoundPage />}/>
      }
    </>
  )
}

