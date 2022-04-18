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

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
                style={{
                    zIndex: "3000",
                  position: 'absolute',
                backgroundColor: 'rgba(255, 255, 255, 1)',
                  padding: '0px',
                  color: 'black',
                  borderRadius: '0px',
                  width: '50px',

                  ...props.style,
                }}
                className = "row"
              >
            <button className='btn btn-secondary' style = {{marginBottom: "0.5px"}}>
            <FontAwesomeIcon icon={faPencil} />
            </button>
            <button className = "btn btn-danger">
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
