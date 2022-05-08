import React from "react";
import styled from "styled-components";
import image from "../../assets/images/CoffeeDoddle2.png"
import HeroText from "./HeroText";
import Tilt from 'react-parallax-tilt';
// import Tilt from "react-tilt";

const Hero = () => {
  return (
    <Container style={{ backgroundColor : "white"}}>
      <Wrapper>
        <InnerWrapper>
          <Left>
            <HeroText />
          </Left>
          <Right>
            <Tilt>
              <Img src={image} alt="@gouthamgtronics" />
            </Tilt>
          </Right>
        </InnerWrapper>
      </Wrapper>
    </Container>
  );
};

const Left = styled.div`
  width: 40%;
  @media (max-width: 670px) {
    width: 100%;
    /* padding: 1rem; */
  }
`;

// const Gradient = styled.div`
// background: rgb(23,115,67);
// background: linear-gradient(90deg, rgba(23,115,67,1) 0%, rgba(0,140,67,1) 35%, rgba(176,177,197,1) 100%);
// `;


const Right = styled.div`
  width: 60%;
  @media (max-width: 670px) {
    width: 100%;
    /* padding: 1rem; */
  }
`;

// const TiltWrapper = styled(Tilt)`
//   width: 60%;
//   min-width: 400px;
//   @media (max-width: 670px) {
//     display: none;
//   }
// `;

const Img = styled.img`
  width: 100%;
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

export default Hero;