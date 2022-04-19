import React from 'react'
import { Modal, Form, Button, Row, Col, FormControl } from 'react-bootstrap'
import styled from 'styled-components'
import { useState } from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useMap} from 'react-leaflet'
import l from "leaflet";
import {Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';


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
function filterBy(option, country) {
    if (country.selected.length) {
      return true;
    }
    return option.toLowerCase().indexOf(country.text.toLowerCase()) > -1;
}

const MyRecipes = ({ title, active, icon }) => {

    const [lgShow, setLgShow] = useState(false);
    const [countryHook, setCountryHook] = useState();

    let recipeTitle, country, ingredients, directions, description;
    let mappy = useMap();
    
    // unused in data base
    // let prepTime, tags;


    function insertMarker()
    {
        setLgShow(false)
  
        let marky =  l.marker(mappy.getCenter(), {draggable: true}).addTo(mappy);

        let popup = l.popup().setContent(`<div class = "d-flex justify-content-sm-center flex-column"><h3 class = "text-center">Drag and drop</h3><button type = "button" onClick = 'window.myObj.submitRecipe("${countryHook}", "${directions}", "${recipeTitle}", "${ingredients}", "${description}","${2}", "${marky.getLatLng()["lat"]}", "${marky.getLatLng()["lng"]}", "${JSON.parse(localStorage.getItem('userObject'))['_id']}", ${process.env.NODE_ENV === 'production'})' class = "btn btn-secondary text-white"> Add recipe </button></div>`)
        marky.bindPopup(popup).openPopup();

        marky.on('dragend', function(){marky.openPopup(); popup.setContent(`<div class = "d-flex justify-content-sm-center flex-column"><h3 class = "text-center">Drag and drop</h3><button type = "button" onClick = 'window.myObj.submitRecipe("${countryHook}", "${directions}", "${recipeTitle}", "${ingredients}", "${description}","${2}", "${marky.getLatLng()["lat"]}", "${marky.getLatLng()["lng"]}", "${JSON.parse(localStorage.getItem('userObject'))['_id']}", ${process.env.NODE_ENV === 'production'})' class = "btn btn-secondary text-white"> Add recipe </button></div>`)});
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
                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Country of Origin: </Form.Label>
                  <Typeahead
                    filterBy={filterBy}
                    id = "countryInputs"
                    options={options}
                    placeholder="Choose a country..."
                    onChange = {(e) => setCountryHook(e)}
                    onInputChange = {(e) => setCountryHook(e)}
                    >
                    
                  </Typeahead>
                    

                </Form.Group>
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Recipe Title: </Form.Label>
                  <Form.Control
                    type="recipe"
                    placeholder="Spaghetti & Meatballs"
                    onChange = {(e) => recipeTitle = e.target.value}
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
                  <Form.Label>Notes: </Form.Label>
                  <FormControl as="textarea" aria-label="With textarea"  type="notes"
                  placeholder="Don't overcook the red sauce!" 
                  onChange = {(e) => description = e.target.value}/>
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

let options = [
    "Afghanistan",
    "Aland Islands",
    "Albania",
    "Algeria",
    "American Samoa",
    "Andorra",
    "Angola",
    "Anguilla",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Aruba",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bermuda",
    "Bhutan",
    "Bolivia (Plurinational State of)",
    "Bonaire, Sint Eustatius and Saba",
    "Bosnia and Herzegovina",
    "Botswana",
    "Bouvet Island",
    "Brazil",
    "British Indian Ocean Territory",
    "United States Minor Outlying Islands",
    "Virgin Islands (British)",
    "Virgin Islands (U.S.)",
    "Brunei Darussalam",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Cabo Verde",
    "Cayman Islands",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Christmas Island",
    "Cocos (Keeling) Islands",
    "Colombia",
    "Comoros",
    "Congo",
    "Congo (Democratic Republic of the)",
    "Cook Islands",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Curaçao",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Ethiopia",
    "Falkland Islands (Malvinas)",
    "Faroe Islands",
    "Fiji",
    "Finland",
    "France",
    "French Guiana",
    "French Polynesia",
    "French Southern Territories",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Gibraltar",
    "Greece",
    "Greenland",
    "Grenada",
    "Guadeloupe",
    "Guam",
    "Guatemala",
    "Guernsey",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Heard Island and McDonald Islands",
    "Holy See",
    "Honduras",
    "Hong Kong",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Côte d'Ivoire",
    "Iran (Islamic Republic of)",
    "Iraq",
    "Ireland",
    "Isle of Man",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jersey",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Kuwait",
    "Kyrgyzstan",
    "Lao People's Democratic Republic",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Macao",
    "Macedonia (the former Yugoslav Republic of)",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Martinique",
    "Mauritania",
    "Mauritius",
    "Mayotte",
    "Mexico",
    "Micronesia (Federated States of)",
    "Moldova (Republic of)",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Montserrat",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Caledonia",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "Niue",
    "Norfolk Island",
    "Korea (Democratic People's Republic of)",
    "Northern Mariana Islands",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Palestine, State of",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Pitcairn",
    "Poland",
    "Portugal",
    "Puerto Rico",
    "Qatar",
    "Republic of Kosovo",
    "Réunion",
    "Romania",
    "Russian Federation",
    "Rwanda",
    "Saint Barthélemy",
    "Saint Helena, Ascension and Tristan da Cunha",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Martin (French part)",
    "Saint Pierre and Miquelon",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Sint Maarten (Dutch part)",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Georgia and the South Sandwich Islands",
    "Korea (Republic of)",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Svalbard and Jan Mayen",
    "Swaziland",
    "Sweden",
    "Switzerland",
    "Syrian Arab Republic",
    "Taiwan",
    "Tajikistan",
    "Tanzania, United Republic of",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tokelau",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Turks and Caicos Islands",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom of Great Britain and Northern Ireland",
    "United States of America",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Venezuela (Bolivarian Republic of)",
    "Viet Nam",
    "Wallis and Futuna",
    "Western Sahara",
    "Yemen",
    "Zambia",
    "Zimbabwe"
];