import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../hoc/AuthProvider";
import { database } from "../../firebase";
import "./authPage.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthPage = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const { email, password } = form;
  const { auth, login, registration } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formerrors, setFormErrors] = useState({});
  const [showMessage, setShowMessage] = useState(false);

  const validate = () => {
    let errors = {};

    if (!form.email) {
      errors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errors.email = "Email address is invalid";
    }

    if (!form.password) {
      errors.password = "Password is required";
    } else if (form.password.length < 5) {
      errors.password = "Password must be at least 6 characters";
    }

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      return true;
    } else {
      return false;
    }
  };

  const setLogin = () => {
    login(auth, email, password, () => navigate("/", { replace: true }));
  };

  const setAuth = () => {
    registration(auth, email, password, () => navigate("/", { replace: true }));
  };

  const handlerChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    validate(form) ? setShowMessage(true) : setShowMessage(false);
  };

  return (
    <Container className="authPage">
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
      <Row>
        <Col>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                aria-required="true"
                name="email"
                type="email"
                placeholder="Enter email"
                onChange={handlerChange}
              />
              {formerrors.email && (
                <p className="text-warning">{formerrors.email}</p>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                aria-required="true"
                name="password"
                type="password"
                placeholder="Password"
                onChange={handlerChange}
              />
              {formerrors.password && (
                <p className="text-warning">{formerrors.password}</p>
              )}
            </Form.Group>
            <Button className="me-2" onClick={setAuth} variant="primary">
              Registration
            </Button>
            <Button onClick={setLogin} variant="primary">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AuthPage;
