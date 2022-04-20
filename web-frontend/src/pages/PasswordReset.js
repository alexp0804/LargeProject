import React from 'react'; 
import styled from "styled-components";
import image from "../assets/images/Doodles/reset.png"
import Tilt from 'react-parallax-tilt';
import ResetText from '../components/HomePage/Email/Reset/ResetText';


const PasswordReset = () => {
    return (
      <Container style={{ backgroundColor: "#fff0f4" }}>
        <Wrapper>
          <InnerWrapper>
            <Left>
              <ResetText />
            </Left>
            <Right>
              <Tilt>
                <Img src={image} />
              </Tilt>
            </Right>
          </InnerWrapper>
        </Wrapper>
      </Container>
    );
};

export default PasswordReset; 



const Left = styled.div`
  width: 40%;
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

