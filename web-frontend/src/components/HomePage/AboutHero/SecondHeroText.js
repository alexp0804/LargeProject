
import React from "react";
import styled from "styled-components";
import { useState } from "react";
import Register from "../../../Register";
import {  Modal, Button, FormControl, Offcanvas } from 'react-bootstrap'

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


function OffCanvasExample({ name, ...props }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow} className="me-2">
        {name}
      </Button>
      <Offcanvas show={show} onHide={handleClose} {...props}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>ReciPin</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Welcome to ReciPin!

         Group 11 created this project to make finding recipes so much more fun. Map stuff Recipe stuff x x x 

         < duck / >

        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

function Readmore() {
  return (
    <>
      {['top'].map((placement, idx) => (
        <OffCanvasExample key={idx} placement={placement} name="Read More" />
      ))}
    </>
  );
}



const SecondHeroText = () => {
  return (
    <Container>
       {/* <h5>Hungry???? Idk</h5> */}
      <h1>When it comes to a great recipe, you know it when you see it.</h1>
      <h4>
</h4>
<br/>
      <h1></h1>
      <h1>Curated recipes from locals all around the world </h1>

      <br/>
      <p>Take a stroll around our map. Challenge yourself to make something new! Upload your own recipes, bookmark, like, explore. </p>
      <BtnContainer>
        
      </BtnContainer> 
      
    </Container>
  );
};

const BtnContainer = styled.div`
  margin-top: 2rem;
  button {
    background: black;
    border: none;
    padding: 0.9rem 1.1rem;
    color: #fff;
    border-radius: .3rem;
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

export default SecondHeroText;