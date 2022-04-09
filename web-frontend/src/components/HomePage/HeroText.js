
import React from "react";
import styled from "styled-components";
import { useState } from "react";
import Register from "../../Register";
import {  Modal, Button, FormControl } from 'react-bootstrap'

function Signup() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Sign up 
      </Button>

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
           

           < Register / >


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

const HeroText = () => {
  return (
    <Container>
       {/* <h5>Hungry???? Idk</h5> */}
      <h1>ReciPin</h1>
      <h1>Recipes.</h1>
      <h1>Anytime.</h1>
      <h1>Anywhere.</h1>
      <BtnContainer>
        <button className="readmore">Read More</button>
        < Signup / >
      </BtnContainer> 
      
    </Container>
  );
};

const BtnContainer = styled.div`
  margin-top: 2rem;
  button {
    background: #8c1000;
    border: none;
    padding: 0.9rem 1.1rem;
    color: #fff;
    border-radius: 1rem;
    transition: all 0.3s ease-in-out;
    margin: 0.5rem;
    font-size: 0.8rem;
    cursor: pointer;
    &:hover {
      box-shadow: 0px 17px 16px -11px #81d1ff;
      transform: translateY(-5px);
    }
  }

  .readmore {
    color: #fff;
    background: #8c1000;
    border: 3px solid ;
    
    &:hover {
      box-shadow: 0px 17px 16px -11px #fff;
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
   font-size: 3.5rem;
    font-weight: 1000;

    &:nth-of-type(1) {
      color: #46AF78;
    }
    &:nth-of-type(2) {
      color: #5a9677;
      font-weight: 700;
    }
    &:nth-of-type(3) {
      color: #008C43;
      font-weight: 700;
    
    }
    &:nth-of-type(4) {
      color: #177343;
      font-weight: 700;
    }
  }
`;

export default HeroText;