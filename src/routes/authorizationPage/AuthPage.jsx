import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useContext, useState} from "react";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {useNavigate} from 'react-router-dom';
import {AuthContext} from "../../hoc/AuthProvider";
import {database} from "../../firebase";
import {doc, setDoc} from "@firebase/firestore";
import {useAuthState} from "react-firebase-hooks/auth";
//import {authReducer, initialState} from "../../reducers/userReducer";

const AuthPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const {email, password} = form;
  const {auth, login, registration} = useContext(AuthContext);

  console.log(auth)

  const setLogin = () => {
    login(auth, email, password, ()=>navigate("/", {replace: true}))
  }

  const setAuth = () => {
    registration(auth, email, password, ()=>navigate("/", {replace: true}))
  }

  const handlerChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});

  }
  return (
    <Container>
      <Row>
        <Col>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="Enter email"
                onChange={handlerChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder="Password"
                onChange={handlerChange}
              />
            </Form.Group>
            <Button onClick={setAuth} variant="primary">
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