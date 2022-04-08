import React from 'react'
import { Modal, Form, Button, Row, Col, InputGroup, FormControl } from 'react-bootstrap'
import styled from 'styled-components'
import { useState } from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

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


const Span = styled.span`
    /* color: ${props => props.active ? props.theme.activeMenu : "#AAA5A5"}; */
    color: ${props => !props.active && props.theme.textColor};
    font-size: 1rem;
    margin-right: 1rem;
`

const Title = styled.h1`
    font-size: 0.9rem;
    font-weight: 300;
    color: ${props => props.active ? props.theme.activeMenu : "#AAA5A5"};
`

const MyRecipes = ({ title, active, icon }) => {

    const [smShow, setSmShow] = useState(false);
    const [lgShow, setLgShow] = useState(false);


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
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Country of Origin: </Form.Label>
                  <Form.Control type="country" placeholder="Italy" />
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
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formGridAddress2">
                <Form.Label>Directions: </Form.Label>
                <FormControl
                  as="textarea"
                  aria-label="With textarea"
                  type="directions"
                  placeholder="In a large pot of salted boiling water, cook pasta until al dente. "
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

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>

        <Container onClick={() => setLgShow(true)} active={active}>
          <Title active={active}>{title}</Title>
        </Container>
      </>
    );
}

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
  
  