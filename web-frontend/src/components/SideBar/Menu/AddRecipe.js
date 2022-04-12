import React from 'react'
import { Modal, Form, Button, Row, Col, InputGroup, FormControl } from 'react-bootstrap'
import styled from 'styled-components'
import { useState } from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Marker, Popup, useMap} from 'react-leaflet'
import { useCallback, useMemo, useRef } from 'react'
import DraggableMarkerExample from '../../DragPin';
import l from "leaflet";


const app_name = 'reci-pin';
function buildPath(route)
{
    if (process.env.NODE_ENV === 'production')
        return 'https://' + app_name + '.herokuapp.com/' + route;
    else
        return 'http://localhost:5000/' + route;
}

const Container = styled.div`
    border-left: 3px solid ${props => props.active ? props.theme.activeMenu : "transparent"};

    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    transition: 0.2s all ease-in-out;

    &:hover {
        background-color: rgba(0,0,0,0.1);
    }
`


const Span = styled.span`
    /* color: ${props => props.active ? props.theme.activeMenu : "#AAA5A5"}; */
    color: ${props => !props.active && props.theme.textColor};
    font-size: 1rem;
    margin-right: 1rem;
`

const Title = styled.h1`
    text-align: center;
    font-size: 1rem;
    font-weight: 300;
    color: "black";
`

const center = {
    lat: 51.505,
    lng: -0.09,
  }


const MyRecipes = ({ title, active, icon }) => {


    const [smShow, setSmShow] = useState(false);
    const [lgShow, setLgShow] = useState(false);

    let recipeTitle, country, ingredients, directions, coordinates;
    let mappy = useMap();
    
    // unused in data base
    let prepTime, tags, notes;


    const createRecipe = async (event) => {
        // prevents the form from refreshing the page
        event.preventDefault();
      
        let jsonPayLoad = JSON.stringify({
 
            'country': country,
            'desc': directions,
            'creatorID': 1,
            "name": recipeTitle,
            "text": ingredients,
            'pic': "google.com",
            'coordinates': [0, 0]
        });

        console.log(jsonPayLoad);
      
        try 
        {
            // Do not await fetches anymore
            const response = await fetch(buildPath("api/createRecipe"), {
                method: "POST",
                body: jsonPayLoad,
                headers: { "Content-Type": "application/json" }
            });
            
            let res = JSON.parse(await response.text());
        
            // to do
            console.log(res);

        } 
        catch (e) 
        {
            console.log(e);
            return;
        }

    };


    function insertMarker()
    {
        setLgShow(false)
  
        let marky =  l.marker(mappy.getCenter(), {draggable: true}).addTo(mappy);
        let popup = l.popup().setContent(`<div class = "d-flex justify-content-sm-center flex-column"><h3 class = "text-center">Drag and drop</h3><button type = "button" onClick = '() => {console.log("shit")}' class = "btn btn-secondary text-white"> Add recipe </button></div>`)
        marky.bindPopup(popup).openPopup();
        marky.on('dragend', function(){marky.openPopup(); coordinates = marky.getLatLng()});
    }

    return (
      <>
        <Modal
          size="lg"
          show={lgShow}
          onHide={() => setLgShow(false)}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg"> Add Recipe:</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Recipe Title: </Form.Label>
                  <Form.Control
                    type="recipe"
                    placeholder="Spaghetti & Meatballs"
                    onChange = {(e) => recipeTitle = e.target.value}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Country of Origin: </Form.Label>
                  <Form.Control type="country" placeholder="Italy" onChange = {(e) => country= e.target.value}/>
                </Form.Group>
              </Row>

              <Form.Select className="w-25" aria-label="Default select example">
                <option>Prep Time: </option>
                <option value="1"> 0-30min </option>
                <option value="2"> 1 - 2 hrs</option>
                <option value="3"> 2 - 3 hrs </option>
              </Form.Select>

              <Form.Group className="mt-3 mb-3" controlId="formGridAddress2">
                <Form.Label>Ingredients: </Form.Label>
                <FormControl
                  as="textarea"
                  aria-label="With textarea"
                  type="ingredients"
                  placeholder="1lb Spaghetti 45 meatballs ... "
                  onChange = {(e) => ingredients = e.target.value}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formGridAddress2">
                <Form.Label>Directions: </Form.Label>
                <FormControl
                  as="textarea"
                  aria-label="With textarea"
                  type="directions"
                  placeholder="In a large pot of salted boiling water, cook pasta until al dente. "
                  onChange = {(e) => directions = e.target.value}
                />
              </Form.Group>

              <Row className="mb-3 ">
                <Form.Group
                  as={Col}
                  className="mt-4 p-2"
                  controlId="formGridCity"
                >
                  <Autocomplete
                    multiple
                    id="tags-filled"
                    options={top100Films.map((option) => option.title)}
                    defaultValue={[top100Films[5].title]}
                    freeSolo
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          variant="outlined"
                          label={option}
                          {...getTagProps({ index })}
                        />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="filled"
                        label="tags"
                        placeholder=""
                      />
                    )}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                  <Form.Label>Notes: </Form.Label>
                  <FormControl as="textarea" aria-label="With textarea"  type="notes"
                  placeholder="Don't overcook the red sauce!" />
                </Form.Group>
              </Row>

              <Form.Group className="mb-3" id="formGridCheckbox">
                <Form.Check type="checkbox" label="Make My Recipe Public" />
              </Form.Group>

              <Button variant="primary" type="button" onClick = {insertMarker} >
                Place Pin
              </Button>
            </Form>
          </Modal.Body>
        </Modal>

        <Container onClick={() => setLgShow(true)} active={active}>
          {title}
        </Container>
      </>
    );
}
//() => setLgShow(true)



export default MyRecipes

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
    { title: 'Spaghetti', year: 1994 },
    { title: 'Italian', year: 1972 },
    { title: 'Italian Cuisine', year: 1974 },
    { title: 'Vegan', year: 2008 },
    { title: 'Comfort Food', year: 1957 },
    { title: "European", year: 1993 },
    { title: 'Vegetarian', year: 1994 },
    { title: 'Quick Recipes', year: 1975 },
  ];
  
  