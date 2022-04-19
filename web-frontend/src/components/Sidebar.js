import React, { useState } from 'react';
import { Button, Offcanvas, Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import SidebarContent from './SideBar/SidebarContents';
import Bookmarks from './SideBar/Menu/BookmarksModal';
import RecipeReviewCard from './SideBar/Menu/ProfileRecipes';
import AddRecipe from './SideBar/Menu/AddRecipe';




function OffCanvasExample({ name, ...props }) {

    

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {setShow(true); getUserRecipes();}
  const [recipeArray, setArray] = useState([]);

  const getUserRecipes = async (event) => {
    // prevents the form from refreshing the page
    console.log("HELLO")

    const app_name = 'reci-pin';
    function buildPath(route)
    {
        if (process.env.NODE_ENV === 'production')
            return 'https://' + app_name + '.herokuapp.com/' + route;
        else
            return 'http://localhost:5000/' + route;
    }

    let jsonPayLoad = JSON.stringify({
        userID: JSON.parse(window.localStorage.getItem('userObject'))['_id']
      });

    console.log(jsonPayLoad)


    try 
    {
      // Do not await fetches anymore
      const response = await fetch(buildPath("api/getUserRecipes"), {
        method: "POST",
        body: jsonPayLoad,
        headers: { "Content-Type": "application/json","x-access-token": JSON.parse(window.localStorage.getItem('userObject'))['token'] }
        });
      let res = JSON.parse(await response.text());
  
      if(res.hasOwnProperty('error'))
        console.log(res['error']);
  
        console.log(res)
      setArray(res)

    }
    catch(e)
    {
        console.log(e)
    }


    return;
};



    function createCard(recipe)
    {
        return (
            <RecipeReviewCard
            key = {recipe._id}
            recipeTitle = {recipe.name}
            recipeSummary = {recipe.desc}
            recipeIngredients = {recipe.ingredients}
            recipeinstructions = {recipe.instructions}
            recipePic = {recipe.pic}
            />
        );
    }


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

        { recipeArray.map(createCard) }
         


        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

function Readmore() {
  return (
    <>
      {['end'].map((placement, idx) => (
        <OffCanvasExample key={idx} placement={placement} name="My Recipes" />
      ))}
    </>
  );
}


const Sidebar = (props) =>
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
          <Offcanvas id = "contentnav" show={show} backdrop = {true} onHide={handleClose}>
            <Offcanvas.Header closeButton>
            </Offcanvas.Header>
            <Offcanvas.Body>

              <SidebarContent createMarker = {props.createMarker} setMarkerList = {props.setMarkerList}/>


            </Offcanvas.Body>
          </Offcanvas>
        </>
      </body>
    );
};

export default Sidebar;