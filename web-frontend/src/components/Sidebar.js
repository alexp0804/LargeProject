import React, { useState } from 'react';
import { Button, Offcanvas, Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import SidebarContent from './SideBar/SidebarContents';
import Bookmarks from './SideBar/Menu/BookmarksModal';
import RecipeReviewCard from './SideBar/Menu/ProfileRecipes';
import AddRecipe from './SideBar/Menu/AddRecipe';



function OffCanvasExample({ name, ...props }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="light" onClick={handleShow} className="me-2">
        {name}
      </Button>
      <Offcanvas backdrop = {true} show={show} onHide={handleClose} {...props}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>My Profile</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>

          My Recipes: 

          <br />
         
         
        < RecipeReviewCard / >


        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

function Readmore() {
  return (
    <>
      {['end'].map((placement, idx) => (
        <OffCanvasExample key={idx} placement={placement} name="Read More" />
      ))}
    </>
  );
}


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
        <Navbar style = {{zIndex : "2000"}} collapseOnSelect expand="lg" bg="light" variant="light">
          <Container>
            <Navbar.Brand onClick={handleShow} href="#home">ReciPin.</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <AddRecipe title="Add Recipes"/>

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
                <Readmore /> 
                <Nav.Link eventKey={2} href="./home">
                  Logout
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <>
          <Offcanvas id = "contentnav" show={show} backdrop = {true} onHide={handleClose} >
            <Offcanvas.Header closeButton>
            </Offcanvas.Header>
            <Offcanvas.Body>

              <SidebarContent/>


            </Offcanvas.Body>
          </Offcanvas>
        </>
      </body>
    );
};

export default Sidebar;