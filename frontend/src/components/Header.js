import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "bootstrap/dist/css/bootstrap.min.css";

function Header({
  token,
  handleLogout,
  email,
  setEmail,
  setCreatingBookmark,
  setEditingBookmark,
  setEditingUser,
}) {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>Bookmarks 📚</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Nav>
          <Nav.Link
            onClick={() => {
              setCreatingBookmark(false);
              setEditingBookmark(false);
              setEditingUser(false);
            }}
          >
            Home 🏠
          </Nav.Link>
          <Nav.Link
            onClick={() => {
              setCreatingBookmark(true);
              setEditingUser(false);
              setEditingBookmark(false);
            }}
          >
            Create new bookmark 📝
          </Nav.Link>
        </Nav>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            <Nav.Link
              onClick={() => {
                setCreatingBookmark(false);
                setEditingUser(true);
                setEditingBookmark(false);
              }}
            >
              Welcome {email} 🤗
            </Nav.Link>
            <Nav.Link onClick={handleLogout}>Logout ❌</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
