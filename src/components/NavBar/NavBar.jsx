import { Button, Container, Nav, Navbar, NavItem } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { useContext } from "react";
import { signOut } from "firebase/auth";
import { AuthContext } from "../../hoc/AuthProvider";

const NavBar = () => {
  const { auth, logout } = useContext(AuthContext);
  const [user] = useAuthState(auth);
  const navigate = useNavigate()

  const setLogout = () => {
    logout(auth);
    navigate('/', {replace: true})
  };

  return (
    <Navbar bg="light" expand="lg" fixed="top" style={{ position: "sticky" }}>
      <Container>
        {user ? (
          <>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/user-page">
                User page
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Item>
                <Button variant="outline-secondary" onClick={setLogout}>
                  Log Out
                </Button>
              </Nav.Item>
            </Nav>
          </>
        ) : (
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
            <Nav.Link as={Link} to="/authorization">
              Authorization
            </Nav.Link>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
};

export default NavBar;
