import React from 'react'
import { Container, Row, Col, Tab} from 'react-bootstrap'
import keylimepie from '../../../assets/images/keylime.jpg'
import CardMedia from '@mui/material/CardMedia';
import Tabs from 'react-bootstrap/Tabs'

//  <img src = {keylimepie} height = "100%" width="100%"/>


function ReadMore(props) {
    let string = props.recipe.ingredients.split('\n');
    let directions = props.recipe.instructions.split('\n')

    function bulletIt(ingredientsLine)
    {
        return(<li style = {{marginBottom: "1%"}}> {ingredientsLine}  </li>)
    }

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
              <div style = {{marginLeft: "2%"}}>

                {string.map(bulletIt)}
              </div>
          </Tab>
          <Tab
            eventKey="directions"
            title="Directions"
            tabClassName="text-black"
          >
              <ol>
                  {directions.map(bulletIt)}
              </ol>
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