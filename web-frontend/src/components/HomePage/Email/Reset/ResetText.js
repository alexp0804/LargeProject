
import React from "react";
import styled from "styled-components";
import { useState } from "react";
import {  Form, Button, FormControl, Nav } from 'react-bootstrap'
import { Link } from "react-router-dom";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';




const ResetText = () => {
  return (
    <Container>
      {/* <h5>Hungry???? Idk</h5> */}
      <h1>What a mess. Don't worry, we'll clean it up. </h1>
      <br />
      <h4>What's your email? </h4>
    
      

      {/* <Nav.Link eventKey={2} href="./home">
        Logout
      </Nav.Link> */}

      {/* <BtnContainer>
        <Link to="/home">
        <button>Back to home </button>
        </Link>
     
      </BtnContainer> */}

      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else. Except this entire class. 
          </Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit" style = {{backgroundColor : "#c6faac", border : "none", color : "black", width: "50%"}}>
          Submit
        </Button>
      </Form>


      <br/>


     
      <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        Nice — <strong>Go check your email!</strong>
      </Alert>



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

  h4 {
    font-size: 1.3rem;
     font-weight: 650;
 
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

export default ResetText;