
import React from "react";
import styled from "styled-components";
import { useState } from "react";
import Register from "../../../../Register";
import {  Modal, Button, FormControl, Nav } from 'react-bootstrap'
import { Link } from "react-router-dom";




const EmailText = () => {
  return (
    <Container>
      {/* <h5>Hungry???? Idk</h5> */}
      <h1>Congrats. You're verfied! Are you hungry? I am. </h1>
      <h4></h4>
      <br />
      <h1></h1>
      <h1> </h1>

      {/* <Nav.Link eventKey={2} href="./home">
        Logout
      </Nav.Link> */}

      <BtnContainer>
        <Link to="/home">
        <button>Back to home </button>
        </Link>
     
      </BtnContainer>


    </Container>
  );
};

const BtnContainer = styled.div`
  margin-top: 2rem;
  button {
    background: #2d3d8b;
    border: none;
    width: 50%;
    padding: 0.9rem 1.1rem;
    color: #fff;
    border-radius: .3rem;
    transition: all 0.3s ease-in-out;
    margin: 0.5rem;
    font-size: 1rem;
    cursor: pointer;
    &:hover {
      box-shadow: 0px 17px 16px -11px ;
      transform: translateY(-5px);
    }
  }

  .readmore {
    color: red;
    background: black;
    border: 3px solid ;
    
    &:hover {
      box-shadow: 0px 17px 16px -11px;
      transform: translateY(-5px);
    }
  }
`;

const Container = styled.div`
  padding: 1rem;
  h5 {
    color: #515151;
    font-weight: 500;
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }
  h1 {
   font-size: 1.8rem;
    font-weight: 800;

    &:nth-of-type(1) {
      color: black;
    }
    &:nth-of-type(2) {
      color: black;
      font-weight: 700;
    }
    &:nth-of-type(3) {
      color: black;
      font-weight: 700;
    
    }
    &:nth-of-type(4) {
      color: black;
      font-weight: 700;
    }
  }
`;

export default EmailText;