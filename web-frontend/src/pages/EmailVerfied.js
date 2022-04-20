import React from 'react'; 
import styled from "styled-components";
import image from "../assets/images/Doodles/BlueIceCreamDoodle.png"
import EmailText from '../components/HomePage/Email/Reset/EmailText';


const EmailVerification = () => {
    return (
        <Container style={{ backgroundColor : "lightblue"}}>
          <Wrapper>
            <InnerWrapper>
              <Left>
            
                  <Img src={image}/>
                
              </Left>
              <Right>
              <EmailText />
              </Right>
            </InnerWrapper>
          </Wrapper>
        </Container>
      );
};

export default EmailVerification; 



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

