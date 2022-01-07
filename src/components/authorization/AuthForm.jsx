import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useContext, useState} from "react";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import {AppContext} from "../../context/AppContext";
//import {authReducer, initialState} from "../../reducers/userReducer";

const AuthForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const {auth} = useContext(AppContext)
  const {email, password} = form;


  const registration = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(({user}) => {

        console.log(user)
        navigate('/');
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);

      });
  };

  const login =  () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // navigate('/');
        console.log(user)

      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
      });
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
            <Button onClick={registration} variant="primary">
              Registration
            </Button>
            <Button onClick={login} variant="primary">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default AuthForm