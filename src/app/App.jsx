import AuthForm from "../components/authorization/AuthForm";
import './app.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "../components/homepage/HomePage";
import Layout from "../components/layout/Layout";
import UserPage from "../components/userPage/UserPage";
import NotFoundPage from "../components/notFoundPage/NotFoundPage";
import RequireAuth from "../hoc/requireAuth";
import {AuthContext, AuthProvider} from "../hoc/AuthProvider";
import {useContext} from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {getAuth} from "firebase/auth";


const App = () => {
  const auth = getAuth()
  //const {auth} = useContext(AuthContext)
  const [user] = useAuthState(auth)

  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<HomePage/>}/>
          <Route path="authorization" element={<AuthForm/>}/>
          { user
            ? <Route path="user-page" element={<UserPage/>}/>
            : <Route path="*" element={<NotFoundPage/>} />
          }
          <Route path="*" element={<NotFoundPage/>} />
        </Route>
      </Routes>
    </AuthProvider>

  );
}

export default App;
