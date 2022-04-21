import {useState} from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Modal} from 'react-bootstrap'
import styled from 'styled-components'
import {useMap} from 'react-leaflet'

const Container = styled.div`
    border-left: 3px solid ${props => props.active ? props.theme.activeMenu : "transparent"};
    width: 100%;
    padding: 0.3rem;
    padding-left: 2rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 1rem;
    transition: 0.2s all ease-in-out;

    &:hover {
        background-color: rgba(0,0,0,0.1);
    }
`

const Title = styled.h1`
    font-size: 1.2rem;
    font-weight: 300;
    color: "black";
`


const CustomRecipePopupModal = (props) => {

    const [lgShow, setLgShow] = useState(false);
  const { post } = props;
  
  let mappy = useMap();




  function createCard(recipe)
  {
    function moveToCard()
    {
        let x = recipe['location']['coordinates'][1]
        let y = recipe['location']['coordinates'][0]
        mappy.panTo([x,y]);
        mappy.setZoom(12);
        props.setMarkerList([recipe]);
        props.closeSideBar()
        setLgShow(false)
    }

    let picture = recipe.pic

    if (picture == null || picture == "")
      picture = "https://image.shutterstock.com/image-vector/picture-vector-icon-no-image-260nw-1350441335.jpg"
      return(
        <CardActionArea component="" href="" onClick = {moveToCard} sx = {{ marginBottom: '2%'}}>
    <Card sx={{ display: 'flex' }}>
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

  props.hashMap.forEach(function(key, value){x.push(key);})

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
      <Modal.Title id="example-modal-sizes-title-lg"> {props.title}: </Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <Grid item xs={12} md={6}>

          {x.map(createCard)}

    </Grid>
    </Modal.Body>
        </Modal>

        <Container onClick={() => setLgShow(true)} active={props.active}  >
        <Title active={props.active}>{props.title}</Title>
        </Container>
    </>
  );
}

export default CustomRecipePopupModal;