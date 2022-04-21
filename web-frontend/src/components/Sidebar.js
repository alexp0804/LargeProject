import React, { useState } from 'react';
import { Button, Offcanvas, Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import SidebarContent from './SideBar/SidebarContents';
import RecipeReviewCard from './SideBar/Menu/ProfileRecipes';
import AddRecipe from './SideBar/Menu/AddRecipe';
import {useMap} from 'react-leaflet';
//import Bookmarks from './SideBar/Menu/BookmarksModal';
import BookMarks from './SideBar/Menu/Bookmarked.js'




function OffCanvasExample(props) {

  const [show, setShow] = useState(false);

  let mappy = useMap();

  const handleClose = () => setShow(false);
  const handleShow = () => {setShow(true); getUserRecipes();}
  const [recipeArray, setArray] = useState([]);

  const getUserRecipes = async (event) => {
    // prevents the form from refreshing the page

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
  
        setArray(res)
        props.setMarkerList(res);

        if (res.length >= 1)
        {

            let x = res[0]['location']['coordinates'][1]
            let y = res[0]['location']['coordinates'][0]

            console.log([x,y])
            mappy.setView(mappy.getCenter(), 1)
        }

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
            recipeID = {recipe._id}
            recipeTitle = {recipe.name}
            recipeSummary = {recipe.desc}
            recipeIngredients = {recipe.ingredients}
            recipeinstructions = {recipe.instructions}
            recipePic = {recipe.pic}
            setMarkerList = {props.setMarkerList}
            recipe = {recipe}
            setArray = {setArray}
            />
        );
    }


  return (
    <>
      <Button variant="light" onClick={handleShow} className="me-2">
        {props.name}
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

  let mappy = useMap();
  console.log("favs")
  console.log(props.favs)



    return (
      <body>
        <Navbar style = {{zIndex : "2000"}} collapseOnSelect expand="lg" bg="light" variant="light">
          <Container>
            <Navbar.Brand onClick={handleShow} href="">ReciPin.</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <AddRecipe title="Add Recipes"/>
              </Nav>
                <BookMarks title="Bookmarks" favs = {props.favs}/>      
              <Nav>
                <OffCanvasExample placement={'end'} name="My Recipes" setMarkerList = {props.setMarkerList} />
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

              <SidebarContent closeSideBar = {handleClose} favs = {props.favs} likes = {props.likes} setMarkerList = {props.setMarkerList}/>


            </Offcanvas.Body>
          </Offcanvas>
        </>
      </body>
    );
};

export default Sidebar;