import * as React from "react";
import { styled } from "@mui/material/styles";
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
import FavoriteIcon from "@mui/icons-material/Favorite";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import ShareIcon from "@mui/icons-material/Share";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import image from "../../../assets/images/milkshake.jpg";
import AddRecipe from "./AddRecipe";
import MyRecipes from "./MyRecipesModal";
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

export default function RecipeReviewCard() {
  const [expanded, setExpanded] = React.useState(false);

  const [lgShow, setLgShow] = useState(false);

  const lower = countryPosition.id;
  const flags = "au.png";

  return (
    <>
      <Modal
        style={{ zIndex: "2000"}}
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
        scrollable={true}
      >
        <Modal.Header closeButton >
          <Modal.Title id="example-modal-sizes-title-lg">
            Key Lime Pie !!!!! 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body >
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
            <IconButton aria-label="settings">
              <BookmarkBorderIcon></BookmarkBorderIcon>
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
