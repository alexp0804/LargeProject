import React from 'react'
import { Container, Row, Col, Tab} from 'react-bootstrap'
import keylimepie from '../../../assets/images/keylime.jpg'
import CardMedia from '@mui/material/CardMedia';
import Tabs from 'react-bootstrap/Tabs'

//  <img src = {keylimepie} height = "100%" width="100%"/>


function ReadMore() {
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
            <h5> For the cheesecake: </h5>

            <ul>
              <li> Cooking spray, for the pan 6.8 ounces </li>
              <li>
                {" "}
                graham crackers (about 12 crackers), or 1 1/2 cups graham
                cracker crumbs{" "}
              </li>
              <li> 3 tablespoons powdered sugar </li>
              <li> 1/4 teaspoon salt, divided</li>
              <li> 5 tablespoons unsalted butter</li>
              <li> 2 (8-ounce) blocks cream cheese, at room temperature </li>
            </ul>

            <h5> For the whipped cream: </h5>

            <li> 3/4 cup heavy cream </li>
            <li> 2 tablespoons powdered sugar </li>
            <li> 2 tablespoons sour cream </li>
            <li> 1/2 teaspoon key lime zest</li>
            <li> 5 tablespoons unsalted butter</li>
            <li> 1/2 teaspoon vanilla extract</li>
          </Tab>
          <Tab
            eventKey="directions"
            title="Directions"
            tabClassName="text-black"
          >
            <h5> Prepare the oven and baking pan:</h5>

            <p>
              {" "}
              Preheat the oven to 350°F. Grease the inside of a 9-inch round
              springform pan with cooking spray. Set it aside.
            </p>

            <h5> Make the crust:</h5>

            <p>
              Break up the graham crackers into smaller pieces and add them into
              a food processor. Attach the lid and pulse about 20 times until
              fine even crumbs form.
            </p>
            <p>
              Add the powdered sugar and 1/8 teaspoon salt, and pulse to
              combine. In a small heatproof bowl, add the butter and microwave
              on high in 30-second increments until melted. Pour the melted
              butter over the crumbs and pulse until fully combined. It should
              look like moist sand and loosely stick together when pressed with
              your fingers.
            </p>

            <p>
              If using store-bought graham cracker crumbs, add it into a medium
              bowl and use a rubber spatula to stir it with the powdered sugar,
              1/8 teaspoon salt, and melted butter until combined.
            </p>
          </Tab>
          <Tab
            eventKey="Country Stuff"
            title="Origins"
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

