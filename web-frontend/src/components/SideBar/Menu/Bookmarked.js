import {useState} from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import image from '../../../assets/images/milkshake.jpg'
import { Modal} from 'react-bootstrap'
import styled from 'styled-components'

const Container = styled.div`
    border-left: 3px solid ${props => props.active ? props.theme.activeMenu : "transparent"};
    margin-left: 0%;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    transition: 0.2s all ease-in-out;

    &:hover {
        background-color: rgba(0,0,0,0.1);
    }
`


const BookMarks = (props) => {

    const [lgShow, setLgShow] = useState(false);
  const { post } = props;


  function createCard(recipe)
  {
    let picture = recipe.pic

    if (picture == null || picture == "")
      picture = "https://image.shutterstock.com/image-vector/picture-vector-icon-no-image-260nw-1350441335.jpg"
      return(
        <CardActionArea component="a" href="#">
    <Card sx={{ display: 'flex', marginBottom: '2%' }}>
    <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' , justifyContent: 'center'}} >
      <Typography component="h2" variant="h5">
        {recipe.name}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary">
        Country of Origin: {recipe.country} 
      </Typography>
      <Typography variant="subtitle1" paragraph>
      {recipe.desc}
      </Typography>
      <Typography variant="subtitle1" color="primary">
      </Typography>
    </CardContent>
    <CardMedia
      component="img"
      sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
      image={picture}
      alt="food"
    />
  </Card>
  </CardActionArea>
      );
  }
  let x = [];

  props.favs.forEach(function(key, value){x.push(key); console.log(x)})

  return (
      <>
    <Modal
    style = {{marginTop: '1.7%'}} 
    size="lg"
    show={lgShow}
    onHide={() => setLgShow(false)}
    aria-labelledby="example-modal-sizes-title-lg"
  >
    <Modal.Header closeButton>
      <Modal.Title id="example-modal-sizes-title-lg"> Bookmarks: </Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <Grid item xs={12} md={6}>

          {x.map(createCard)}

    </Grid>
    </Modal.Body>
        </Modal>

        <Container onClick={() => setLgShow(true)} active={props.active} styles = {{backgroundColor : "green"}}  >
          {'Bookmarks'}
        </Container>
    </>
  );
}

export default BookMarks;