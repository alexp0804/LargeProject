import React from "react";
import styled from "styled-components";
import image from "../../../assets/images/Doodles/Chilling.png"
import image2 from "../../../assets/images/Doodles/Reading.png"
import image3 from "../../../assets/images/Doodles/Meditating.png"
import image4 from "../../../assets/images/Doodles/Dancing.png"
import HeroText from "../HeroText";
import ThirdHeroText from "../MapHero/ThirdHeroText";
import { Row, Col } from "react-bootstrap"
import Tilt from 'react-parallax-tilt';
// import Tilt from "react-tilt";

const ThirdHero = () => {
  return (
    <Container style={{ backgroundColor: "white" }}>
      <Wrapper>
        <InnerWrapper>
          {/* <Left>
              <HeroText />
          </Left>
          <Right>
            <Tilt>
              <Img src={image2} />
            </Tilt>
          </Right> */}


          <ThirdHeroText />


         

          <Row>
            <Col className="justify-content-md-center">
              <Img src={image} />

              <Row className="justify-content-md-center">
                
                <Container2> Are you ever in the mood for something new, or something from your hometown? Do you want to make it yourself but from a curated recipe from a local?  </Container2>
                </Row>
            </Col>


            <Col>
              <Img2 src={image4} />
              <Row className="justify-content-md-center"> <Container2> 

              Our recipe app allows you to create a profile, pan along our map and see recipes anywhere you zoom! Our approved locals also have a special spot on the map, as well as our featured recipes of the month.

              </Container2>
</Row>
            </Col>



            <Col>
              <Img3 src={image3} />

              <Row className="justify-content-md-center"> <Container2>
                
              Users can create new recipes, put the recipe on the map according to its origins, as well as bookmark and save recipes they find and enjoy through the map. 
                
                </Container2> </Row>
            </Col>


          </Row>
        </InnerWrapper>
      </Wrapper>
    </Container>
  );
};



const Left = styled.div`
  width: 60%;
  @media (max-width: 670px) {
    width: 100%;
    /* padding: 1rem; */
  }
`;


const Right = styled.div`
  width: 40%;
  @media (max-width: 670px) {
    width: 100%;
    /* padding: 1rem; */
  }
`;


const Img = styled.img`
  width: 100%;
  padding-bottom: 4.5em;
`;


const Img2 = styled.img`
  width: 100%;
  padding-bottom: 1em;
  

`;

const Img3 = styled.img`
  width: 100%;
  padding-bottom: 2.5em;
  

`;

const InnerWrapper = styled.div`
  max-width: 1000px;
  height: 100%;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;
const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  /* margin: 2rem; */
  background-color: rgba(255, 255, 255, 0.9);
  @supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
    -webkit-backdrop-filter: blur(35px);
    backdrop-filter: blur(35px);
    background-color: rgba(255, 255, 255, 0.5);
  }
`;

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${({ bg }) => bg});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

const Container2 = styled.div`
  height: 10vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10%;
`;

export default ThirdHero;