import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useContext, useState} from "react";
import {useNavigate} from 'react-router-dom';
import {AuthContext} from "../../hoc/AuthProvider";
import {database} from "../../firebase";
import './authPage.css'
import {useForm} from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';


const AuthPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const {email, password} = form;
  const {auth, login, registration} = useContext(AuthContext);

  const setLogin = () => {
    login(auth, email, password, ()=>navigate("/", {replace: true}))
  };

  const setAuth = () => {
    registration(auth, email, password, ()=>navigate("/", {replace: true}))
  };

  const handlerChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  return (
      <Container className='authPage'>
        <Row >
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
              </Form.Group>
              <Button
                className='me-2'
                onClick={setAuth}
                variant="primary"
              >
                Registration
              </Button>
              <Button onClick={setLogin} variant="primary">
                Login
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
  )
}

export default AuthPage