import React from 'react'
import { Container, Row, Col, Tab} from 'react-bootstrap'
import keylimepie from '../../../assets/images/keylime.jpg'
import CardMedia from '@mui/material/CardMedia';
import Tabs from 'react-bootstrap/Tabs'

//  <img src = {keylimepie} height = "100%" width="100%"/>


function ReadMore(props) {

  return (
    <Container>
      <Row>
        <CardMedia component="img" height="294" image={keylimepie} alt="food" />
      </Row>

      <br></br>
      <Row>
        <Tabs
          defaultActiveKey="ingredients"
          id="uncontrolled-tab-example"
          className="mb-3"
          tabClassName="text-black"
        >
          <Tab
            eventKey="ingredients"
            title="Ingredients"
            tabClassName="text-black"
            
          >
              <div style = {{marginLeft: "2%", whiteSpace: "pre-wrap"}}>

                {props.recipe.ingredients}
              </div>
          </Tab>
          <Tab
            eventKey="directions"
            title="Directions"
            tabClassName="text-black"
          >
              <div style = {{marginLeft: "2%", whiteSpace: "pre-wrap"}}>

                {props.recipe.instructions}
              </div>
          </Tab>
          <Tab
            eventKey="Country Stuff"
            title="Comments"
            tabClassName="text-black"
          >
            hello!
          </Tab>
        </Tabs>
      </Row>
    </Container>
  );
}
  

  export default ReadMore;