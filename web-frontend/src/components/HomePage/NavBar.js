import React, { useState } from "react";
import styled from "styled-components";
import {  Modal, Form, FormControl } from 'react-bootstrap'
import App from '../../Login'
import RegisterApp from '../../Register'


function Login() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Login
      </Button>

      <Modal size="lg" show={show} onHide={handleClose}>
       
        <Modal.Body closeButton>
           

           < App / >


        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
}
function Register() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="" onClick={handleShow}>
        Sign Up
      </Button>

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body closeButton>
           

           <RegisterApp / >


        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
}


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Nav>
      <Container>
        <mapLogo />
        
        <Menu isOpen={isOpen}>
          <LinkWrapper>
            <MenuLink href="">Help</MenuLink>
            <Register/>
            < Login / >
          </LinkWrapper>
        </Menu>
      </Container>
    </Nav>
  );
};

export default Navbar;

const Button = styled.button`
  font-size: 0.8rem;
  background: black;
  border: none;
  padding: 0.8rem 1.1rem;
  color: #fff;
  border-radius: .3rem;
  box-shadow: 0px 13px 24px -7px ;
  transition: all 0.3s ease-in-out;
  margin-left: 0.5rem;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 17px 16px -11px ;
    transform: translateY(-5px);
  }

  @media (max-width: 670px) {
    /* width: 100%; */
    padding: 0.3;
  }
`;

const MenuLink = styled.a`
  text-decoration: none;
  color: #858586;
  font-size: 0.9rem;
  padding: 0.7rem 1.5rem;
  transition: all 0.2s ease-in;
  border-radius: 0.5rem;
  font-weight: 500;

  &:hover {
    color: #7781d4;
    // background: #e7e9fc;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  max-width: 1000px;
  margin: auto;
  width: 100%;
  padding: 2rem;

  svg {
    height: 1.4rem;
    cursor: pointer;
  }

  a {
    text-decoration: none;
    color: #858586;
    font-size: 0.9rem;
    padding: 0.7rem 1.5rem;
    transition: all 0.2s ease-in;
    border-radius: 0.5rem;
    font-weight: 500;

    &:hover {
      color: #7781d4;
      background: #e7e9fc;
    }
  }
`;

const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 3;
`;

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  @media (max-width: 768px) {
    background-color: rgba(255, 255, 255, 0.9);
    @supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
      -webkit-backdrop-filter: blur(35px);
      backdrop-filter: blur(15px);
      background-color: rgba(255, 255, 255, 0.4);
    }
    border-radius: 1rem;
    margin-top: 1rem;
    box-shadow: -4px 8px 15px 1px rgba(0, 0, 0, 0.07);
    overflow: hidden;
    flex-direction: column;
    max-height: ${({ isOpen }) => (isOpen ? "300px" : "0")};
    transition: max-height 0.3s ease-in;
    width: 100%;
  }
`;

const LinkWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding: 1.5rem 0;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Hamburger = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;
  span {
    height: 2px;
    width: 25px;
    background: #f774c5;
    margin-bottom: 4px;
    border-radius: 5px;
  }
  @media (max-width: 768px) {
    display: flex;
  }
`;