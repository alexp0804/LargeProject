import * as React from "react";
import { Row, Col } from "react-bootstrap";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { green, red } from "@mui/material/colors";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import image from "../../../assets/images/milkshake.jpg";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import Readmore from "./ReadMore";
import countryPosition from "../../../data/CountriesUpdated.json";

function importAll(r) {
  let images = {};
  r.keys().map((item) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}

const images = importAll(
  require.context("../../../assets/images/flagpng", false, /\.(png|jpe?g|svg)$/)
);

export default function RecipeReviewCard(props) {
    console.log(props.fav);
  const [expanded, setExpanded] = React.useState(false);

  const [lgShow, setLgShow] = useState(false);

  // Fav = true, then display BookmarkIcon
  const[FavFlag, setFavFlag] = useState(props.fav);
  let x = <BookmarkBorderIcon/>;

  // if already fav'd
  if (props.fav)
    x = <BookmarkIcon/>

  const[bookImage, setbookImage] = useState(x); 

    const app_name = 'reci-pin';
    function buildPath(route)
    {
      if (process.env.NODE_ENV === 'production')
          return 'https://' + app_name + '.herokuapp.com/' + route;
      else
          return 'http://localhost:5000/' + route;
    }

    const setLike = async () => {

        let jsonPayLoad = JSON.stringify({
            userID: JSON.parse(window.localStorage.getItem('userObject'))['_id'],
            recipeID: props.recipe['_id']
        });

        console.log(jsonPayLoad)


        try 
        {
        // Do not await fetches anymore
        const response = await fetch(buildPath("api/addLike"), {
            method: "POST",
            body: jsonPayLoad,
            headers: { "Content-Type": "application/json","x-access-token": JSON.parse(window.localStorage.getItem('userObject'))['token'] }
            });

        let res = JSON.parse(await response.text());
    
        if(res.hasOwnProperty('error'))
            console.log(res['error']);
        
            setbookImage(<BookmarkIcon/>)
            setFavFlag(!FavFlag);


        }
        catch(e)
        {
            console.log(e)
        }
    };

    const deleteLike = async () => {

        let jsonPayLoad = JSON.stringify({
            userID: JSON.parse(window.localStorage.getItem('userObject'))['_id'],
            recipeID: props.recipe['_id']
        });

        console.log(jsonPayLoad)


        try 
        {
        // Do not await fetches anymore
        const response = await fetch(buildPath("api/deleteLike"), {
            method: "POST",
            body: jsonPayLoad,
            headers: { "Content-Type": "application/json","x-access-token": JSON.parse(window.localStorage.getItem('userObject'))['token'] }
            });

        let res = JSON.parse(await response.text());
    
        if(res.hasOwnProperty('error'))
            console.log(res['error']);
        
            setbookImage(<BookmarkBorderIcon/>)
            setFavFlag(!FavFlag);

        }
        catch(e)
        {
            console.log(e)
        }
    };

    const setFav = async () => {

        let jsonPayLoad = JSON.stringify({
            userID: JSON.parse(window.localStorage.getItem('userObject'))['_id'],
            recipeID: props.recipe['_id']
        });

        console.log(jsonPayLoad)


        try 
        {
        // Do not await fetches anymore
        const response = await fetch(buildPath("api/addFavorite"), {
            method: "POST",
            body: jsonPayLoad,
            headers: { "Content-Type": "application/json","x-access-token": JSON.parse(window.localStorage.getItem('userObject'))['token'] }
            });

        let res = JSON.parse(await response.text());
    
        if(res.hasOwnProperty('error'))
            console.log(res['error']);


            console.log("SET AS FAVORITE")
            setbookImage(<BookmarkIcon/>)
            setFavFlag(!FavFlag);
            props.favMethod(prevItems => {prevItems.set(props.recipe['_id'], props.recipe); return prevItems;})


        }
        catch(e)
        {
            console.log(e)
        }
    };

    const deleteFav = async () => {

        let jsonPayLoad = JSON.stringify({
            userID: JSON.parse(window.localStorage.getItem('userObject'))['_id'],
            recipeID: props.recipe['_id']
        });

        console.log(jsonPayLoad)


        try 
        {
        // Do not await fetches anymore
        const response = await fetch(buildPath("api/deleteFavorite"), {
            method: "POST",
            body: jsonPayLoad,
            headers: { "Content-Type": "application/json","x-access-token": JSON.parse(window.localStorage.getItem('userObject'))['token'] }
            });

        let res = JSON.parse(await response.text());
    
        if(res.hasOwnProperty('error'))
            console.log(res['error']);
        
            console.log('set as unfav')
            setbookImage(<BookmarkBorderIcon/>)
            setFavFlag(!FavFlag);
            props.favMethod(prevItems => {prevItems.delete(props.recipe['_id']); return prevItems;})

        }
        catch(e)
        {
            console.log(e)
        }
    };

  return (
    <>
      <Modal
        style={{ zIndex: "2000", marginTop: "5%" }}
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Bookmarks:
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Readmore />
        </Modal.Body>
      </Modal>

      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: green[500] }} aria-label="recipe">
              {countryPosition.map((countryYoink) => (
                <>
                  <img src={images[countryYoink.id.toLowerCase() + ".png"]} />
                </>
              ))}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings" onClick = {() =>{FavFlag? deleteFav(): setFav();}}>
              {bookImage} 
            </IconButton>
          }
          title="Shrimp and Chorizo Paella"
          subheader="September 14, 2016"
        />

        <CardContent>
          <Row>
            <Col>
              <Typography variant="body2" color="text.secondary">
                This impressive paella is a perfect party dish and a fun meal to
                cook
              </Typography>

              <Col md={{ span: 3, offset: 6 }}>
                {" "}
                <IconButton onClick={() => setLgShow(true)}>
                  <ReadMoreIcon></ReadMoreIcon>
                </IconButton>{" "}
              </Col>
            </Col>
            <Col>
              <CardMedia
                component="img"
                height="180"
                image={image}
                alt="Paella dish"
              />
            </Col>
          </Row>
        </CardContent>
        <CardActions disableSpacing></CardActions>
      </Card>
    </>
  );
}
