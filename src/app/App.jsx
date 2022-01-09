import AuthForm from "../components/authorization/AuthForm";
import './app.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "../components/homepage/HomePage";
import Layout from "../components/layout/Layout";
import UserPage from "../components/userPage/UserPage";
import NotFoundPage from "../components/notFoundPage/NotFoundPage";
import RequireAuth from "../hoc/requireAuth";
import {AuthProvider} from "../hoc/AuthProvider";


const App = () => {


  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<HomePage/>}/>
          <Route path="authorization" element={<AuthForm/>}/>
          <Route path="user-page" element={
            <RequireAuth>
              <UserPage/>
            </RequireAuth>} />
          <Route path="*" element={<NotFoundPage/>} />
        </Route>
      </Routes>
    </AuthProvider>

  );
}

export default App;
