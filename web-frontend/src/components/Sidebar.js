import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Offcanvas, Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import SidebarContent from './SideBar/SidebarContents';


const Sidebar = () =>
{
 
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const options = [
    {
      name: 'Disable backdrop',
      scroll: false,
      backdrop: false,
    }
  ];



    return (
      <body>
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
          <Container>
            <Navbar.Brand href="#home">ReciPin.</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link onClick={handleShow}>Add Recipe</Nav.Link>

                <Nav.Link>BookMarks</Nav.Link>
                <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Something
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Nav>
                <Nav.Link href="#deets">My Profile</Nav.Link>
                <Nav.Link eventKey={2} href="#memes">
                  Logout
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <>
          <Offcanvas show={show} backdrop = {true} onHide={handleClose} >
            <Offcanvas.Header closeButton>
            </Offcanvas.Header>
            <Offcanvas.Body>

              <SidebarContent />

            </Offcanvas.Body>
          </Offcanvas>
        </>
      </body>
    );
};

export default Sidebar;