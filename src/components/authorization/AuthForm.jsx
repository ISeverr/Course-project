import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useContext, useState} from "react";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import {AuthContext} from "../../hoc/AuthProvider";
import {database} from "../../firebase";
import {doc, setDoc} from "@firebase/firestore";
import {useAuthState} from "react-firebase-hooks/auth";
//import {authReducer, initialState} from "../../reducers/userReducer";

const AuthForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const {email, password} = form;
  const {auth} = useContext(AuthContext);

  const registration = async () => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      const {user} = response;
      // await setDoc(doc(database, "users", user.uid ), {
      //   userUid: user.uid,
      //   setDoc(doc())
      // });
      navigate("/")
      console.log(database)
    } catch (err) {
      console.error(err);
      alert(err.message);
    }

    // createUserWithEmailAndPassword(auth, email, password)
    //   .then((userCredential) => {
    //     console.log(user)
    //     navigate('/');
    //   })
    //   .catch((error) => {
    //     console.log(error.code);
    //     console.log(error.message);
    //
    //   });
  };

  const login = async () => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      const {user} = response;

      navigate('/')
      console.log(user);
    }
    catch (error) {
      console.error(error);
      alert(error.message);
    }

  //   signInWithEmailAndPassword(auth, email, password)
  //     .then((userCredential) => {
  //       const user = userCredential.user;
  //       navigate('/');
  //       console.log(user)
  //     })
  //     .catch((error) => {
  //       console.log(error.code);
  //       console.log(error.message);
  //     });
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