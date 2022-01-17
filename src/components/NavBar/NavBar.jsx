import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {Link, NavLink} from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth";
import {useContext} from "react";
import { signOut } from "firebase/auth";
import {AuthContext} from "../../hoc/AuthProvider";


const NavBar = () => {
  const {auth, logout} = useContext(AuthContext);
  const [user] = useAuthState(auth);

const setLogout = () => {
  logout(auth)
}


  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Nav.Link><Link to="/">Home</Link></Nav.Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {user ?
              (
                <>
                  <Button onClick={setLogout} >Log Out</Button>
                  <Link to="/user-page">User page</Link>
                </>

              )
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