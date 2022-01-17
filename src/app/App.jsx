import AuthForm from "../routes/authorizationPage/AuthPage";
import './app.css';
import {Route, Routes} from "react-router-dom";
import HomePage from "../routes/homepage/HomePage";
import Layout from "../components/layout/Layout";
import NotFoundPage from "../routes/notFoundPage/NotFoundPage";
import {AuthRoute} from "../routes/auth.route";


const App = () => {
  const routes = AuthRoute()

  return (
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<HomePage/>}/>
          <Route path="authorization" element={<AuthForm/>}/>
          {routes}
          <Route path="*" element={<NotFoundPage/>}/>
        </Route>
      </Routes>
  );
}

export default App;
