import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import image from '../../../assets/images/keylime.jpg'
import { useState, useRef } from 'react';
import { Overlay } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPencil } from '@fortawesome/free-solid-svg-icons'
import EditRecipe from './editRecipe.js'

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard(props) {

    
  const [expanded, setExpanded] = React.useState(false);

  const [show, setShow] = useState(false);
  const target = useRef(null);

  let recipe = props.recipe;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const app_name = 'reci-pin';
  function buildPath(route)
  {
      if (process.env.NODE_ENV === 'production')
          return 'https://' + app_name + '.herokuapp.com/' + route;
      else
          return 'http://localhost:5000/' + route;
  }

    function deleteRecipe()
    {
        // If the user does not want to delete we return right away
        if (!window.confirm("Are you okay with deleting this recipe?"))
            return;

        deleteRecipeAPI();
    }

  const deleteRecipeAPI = async() =>
  {

    let jsonPayLoad = JSON.stringify({
        recipeID: props.recipeID
        });

    console.log(jsonPayLoad)
    
    
    try 
    {
        // Do not await fetches anymore
        const response = await fetch(buildPath("api/deleteRecipe"), {
        method: "POST",
        body: jsonPayLoad,
        headers: { "Content-Type": "application/json","x-access-token": JSON.parse(window.localStorage.getItem('userObject'))['token'] }
        });

        let res = JSON.parse(await response.text());
    
        if(res.hasOwnProperty('error'))
        console.log(res['error']);

        props.setMarkerList(prevItems => { return prevItems.filter((item, index) => {return item['_id'] !== props.recipeID;} )});
        props.setArray(prevItems => { return prevItems.filter((item, index) => {return item['_id'] !== props.recipeID;} )});

    }
    catch(e)
    {
        console.log(e)
    }
  }

//   <IconButton aria-label="settings" onClick = {() => {}}> 
//   <MoreVertIcon />
// </IconButton>

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <>
          <Button variant="white" ref={target} onClick={() => setShow(!show)}>
            <MoreVertIcon />
          </Button>
          <Overlay target={target.current} show={show} placement="left">
            {({ placement, arrowProps, show: _show, popper, ...props }) => (
              <div
              {...props}
                id="closeButtons"
                style={{
                  zIndex: "1500",
                  position: 'absolute',
                  opacity: 1,
                  backgroundColor: 'rgba(255, 255, 255, 0)',
                  padding: '0px',
                  color: 'black',
                  borderRadius: '0px',
                  width: '50px',

                  ...props.style,
                }}
                className = "row"
              >

            <EditRecipe recipe = {recipe}/>
            <button className = "btn btn-danger" onClick = {() => deleteRecipe()}> 
                <FontAwesomeIcon icon={faTrash} />
            </button>
              </div>
            )}
          </Overlay>
        </>
        }
        title={props.recipeTitle}
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="194"
        image={image}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.recipeSummary}
          
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
        <Typography paragraph>Ingredients:</Typography>
          <Typography paragraph>
            {props.recipeIngredients}
          </Typography>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            {props.recipeinstructions}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
