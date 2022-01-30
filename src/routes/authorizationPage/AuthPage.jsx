import { Button, Container, Form, Row, Col} from "react-bootstrap";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../hoc/AuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik } from "formik";
import {FORM, CONTAINER } from '../../styles/FormStyle'


const AuthPage = () => {
  const { auth, login, registration, validationAuthSchema } = useContext(AuthContext);
  const navigate = useNavigate();

  const setLogin = (email, password) => {
    login(auth, email, password, () => navigate("/", { replace: true }));
  };

  const setAuth = (email, password) => {
    registration(auth, email, password, () => navigate("/", { replace: true }));
  };

  return (
    <CONTAINER >
      <Row>
        <Col >
        <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationAuthSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          dirty
        }) => (
          <FORM className="mx-auto">
            <Form.Group className="mb-4" controlId="formEmail">
              <Form.Label>Email :</Form.Label>
              <Form.Control
                type="text"
                name="email"
                placeholder="Enter email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                className={touched.email && errors.email ? "error" : null}
              />
              {touched.email && errors.email ? (
                <div className="error-message">{errors.email}</div>
              ) : null}
            </Form.Group>
            <Form.Group className="mb-4" controlId="formPassword">
              <Form.Label>Password :</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                className={touched.password && errors.password ? "error" : null}
              />
              {touched.password && errors.password ? (
                <div className="error-message">{errors.password}</div>
              ) : null}
            </Form.Group>
            <Form.Group className="d-flex justify-content-center">
              <Button 
              className="me-2"
              variant="primary"
              disabled={!errors.values && !dirty}
              onClick={() => setAuth(values.email, values.password)}
            >
              Registration
            </Button>
            <Button
            className="ms-2"
              variant="primary"
              disabled={!errors.values && !dirty}
              onClick={() => setLogin(values.email, values.password)}
            >
              Login
            </Button>
            </Form.Group>
            
          </FORM>
        )}
      </Formik>
        </Col>
      </Row>
      
    </CONTAINER>
  );
};

export default AuthPage;
