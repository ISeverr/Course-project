import {Button, Container, Nav, Navbar, NavItem} from "react-bootstrap";
import {Link, NavLink} from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth";
import {useContext} from "react";
import {signOut} from "firebase/auth";
import {AuthContext} from "../../hoc/AuthProvider";


const NavBar = () => {
  const {auth, logout} = useContext(AuthContext);
  const [user] = useAuthState(auth);

  const setLogout = () => {
    logout(auth)
  }


  return (
    <Navbar bg="light" expand="lg" fixed="top" style={{position: "sticky"}}>
      <Container>
          <Nav className="me-auto" >
            <Nav.Link as={Link} to="/">Home</Nav.Link>
          </Nav>
          <Nav>
          {user ?
            (
              <>
                <Nav.Item>
                  <Nav.Link as={Link} to="/user-page">User page</Nav.Link>
                </Nav.Item>
                <Nav.Item >
                  <Button variant="outline-secondary" onClick={setLogout}>Log Out</Button>
                </Nav.Item>
              </>
            )
            :
            <Nav.Link as={Link} to="/authorization">Authorization</Nav.Link>
          }
      </Nav>

      </Container>
    </Navbar>
  )
}

export default NavBar;