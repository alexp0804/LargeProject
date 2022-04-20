import React from 'react'
import { Modal, Form, Button, Row, Col} from 'react-bootstrap'
import styled from 'styled-components'
import { useState } from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useMap} from 'react-leaflet'
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { EditText, EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';

const EditRecipe = (props) => {

    let x = document.getElementById("closeButtons")

    const [lgShow, setLgShow] = useState(false);

    let recipeTitle, ingredients,directions, description, pic;

    let flag = true;

    function hideButtons(input)
    {
        if (input)
            x.style['opacity'] = 0;
        
        else
            x.style['opacity'] = 1;

        flag = !flag;
    }

    const handleSave = ({name, value, previousValue}) =>
    {

        if (name == "ingredients")
            ingredients = value;

        else if (name == "instructions")
            directions = value;

        else if (name == "title")
            recipeTitle = value;

        else if (name == "summary")
            description = value;
    }

    const app_name = 'reci-pin';
    function buildPath(route)
    {
    if (process.env.NODE_ENV === 'production')
        return 'https://' + app_name + '.herokuapp.com/' + route;
    else
        return 'http://localhost:5000/' + route;
    }

    function changeRecipe()
    {
        let x = [recipeTitle, ingredients, directions, description, pic];
        let y = ["name", "ingredients", "instructions", "desc", "pic"]

        for (let i = 0; i < x.length; i++)
        {
            if (x[i] === undefined)
                continue;

            updateRecipe(y[i], x[i]);
            
            
        }
    }

    const updateRecipe = async (editField, editValue) => {

        let item = {}
        item['recipeID'] = props.recipe._id;
        item['newField'] = editField;
        item['newValue'] = editValue;

        let jsonPayLoad = JSON.stringify(item);
    
        console.log(jsonPayLoad);
    
        try {
          // Do not await fetches anymore
          const response = await fetch(buildPath("api/editRecipe"), {
            method: "POST",
            body: jsonPayLoad,
            headers: {
              "Content-Type": "application/json",
              "x-access-token": JSON.parse(
                window.localStorage.getItem("userObject")
              )["token"],
            },
          });
    
          let res = JSON.parse(await response.text());
    
          if (res.hasOwnProperty("error")) console.log(res["error"]);
    

        } catch (e) {
          console.log(e);
        }
      };
    

    return (
      <>
        <Modal
          size="lg"
          show={lgShow}
          onHide={() => {setLgShow(false); hideButtons(false)}}
          aria-labelledby="example-modal-sizes-title-lg"
          style = {{zIndex: "3000", marginTop: "2%"}}
        >
            
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg"> 
            
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Country of Origin: </Form.Label>
                  <EditText
                  readonly
                  className='input-group-prepend'
                  style = {{frontSize: '30px'}}
                   defaultValue = {props.recipe.country}/>
                    

                </Form.Group>
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Recipe Title: </Form.Label>
                  <EditText
                  className='input-group-prepend'
                  name = "title"
                  style = {{frontSize: '30px'}}
                   defaultValue = {props.recipe.name}
                   onSave = {handleSave}
                   />
                </Form.Group>

              </Row>

                <Form.Label>Preparation Time: </Form.Label>
              <Form.Select className="w-25" aria-label="Default select example">
                <option value="1"> 0-30min </option>
                <option value="2"> 1 - 2 hrs</option>
                <option value="3"> 2 - 3 hrs </option>
              </Form.Select>

              <Form.Group className="mt-3 mb-3" controlId="formGridAddress2">
                <Form.Label>Ingredients: </Form.Label>
                <EditTextarea 
                  className='input-group-prepend'
                  name  = "ingredients"
                  style = {{ whiteSpace: "pre-wrap"}}
                   defaultValue = {props.recipe.ingredients}
                   onSave = {handleSave}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formGridAddress2">
                <Form.Label>Directions: </Form.Label>
                <EditTextarea
                  className='input-group-prepend'
                  name = "instructions"
                  style = {{ whiteSpace: "pre-wrap"}}
                   defaultValue = {props.recipe.instructions}
                   onSave = {handleSave}
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
                    options={recipeTags.map((option) => option.title)}
                    defaultValue={[recipeTags[1].title]}
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
                  <Form.Label>Summary: </Form.Label>
                  <EditTextarea
                  className='input-group-prepend'
                  name = "summary"
                  style = {{ whiteSpace: "pre-wrap"}}
                   defaultValue = {props.recipe.desc}
                   onSave = {handleSave}
                   />
                </Form.Group>
              </Row>

              <Form.Group className="mb-3" id="formGridCheckbox">
                <Form.Check defaultChecked = {true} type="checkbox" label="Make My Recipe Public" />
              </Form.Group>

              <Button variant="primary" type="button" onClick={changeRecipe} >
                Update Recipe
              </Button>
            </Form>
          </Modal.Body>
        </Modal>

        
        <button className='btn btn-secondary' style = {{marginBottom: "0.5px"}}  onClick={() => {setLgShow(true); hideButtons(true)}} active={props.active}>
            <FontAwesomeIcon icon={faPencil} />
        </button>
        
      </>
    );
}

export default EditRecipe

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const recipeTags = [
    { title: 'Spaghetti', year: 1994 },
    { title: 'Italian', year: 1972 },
    { title: 'Italian Cuisine', year: 1974 },
    { title: 'Vegan', year: 2008 },
    { title: 'Comfort Food', year: 1957 },
    { title: "European", year: 1993 },
    { title: 'Vegetarian', year: 1994 },
    { title: 'Quick Recipes', year: 1975 },
];