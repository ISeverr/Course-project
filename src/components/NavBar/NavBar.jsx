import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {Link, NavLink} from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth";
import {useContext} from "react";
import { signOut } from "firebase/auth";
import {AuthContext} from "../../hoc/AuthProvider";


const NavBar = () => {
  const {auth} = useContext(AuthContext)
  const [user] = useAuthState(auth)

  const logout = () => {
    signOut(auth).then(() => {
    }).catch((error) => {
      console.log(error)
    });
  }


  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {user ?

              <Button onClick={logout} >Log Out</Button>
            :
              <Nav.Link><Link to="/authorization">Authorization</Link></Nav.Link>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar;