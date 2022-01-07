import AuthForm from "../components/authorization/AuthForm";
import './app.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "../components/homepage/HomePage";
import Layout from "../components/layout/Layout";
import {createContext, useContext, useReducer} from "react";
import {authReducer, initialState} from "../reducers/userReducer";
import {AppContext} from "../context/AppContext";
import {getAuth} from "firebase/auth";

const App = () => {
  const auth = getAuth()

  return (
    <BrowserRouter>
      <AppContext.Provider value={{auth}}>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<HomePage/>}/>
            <Route path="authorization" element={<AuthForm/>}/>
          </Route>
        </Routes>
      </AppContext.Provider>

    </BrowserRouter>
  );
}

export default App;
