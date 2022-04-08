import React from 'react'
import { Modal } from 'react-bootstrap'
import styled from 'styled-components'
import { useState } from 'react';

const Container = styled.div`
    border-left: 3px solid ${props => props.active ? props.theme.activeMenu : "transparent"};
    width: 100%;
    padding: 0.3rem;
    padding-left: 2rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 1rem;
    transition: 0.2s all ease-in-out;

    &:hover {
        background-color: rgba(0,0,0,0.1);
    }
`


const Span = styled.span`
    /* color: ${props => props.active ? props.theme.activeMenu : "#AAA5A5"}; */
    color: ${props => !props.active && props.theme.textColor};
    font-size: 1rem;
    margin-right: 1rem;
`

const Title = styled.h1`
    font-size: 0.9rem;
    font-weight: 300;
    color: ${props => props.active ? props.theme.activeMenu : "#AAA5A5"};
`

const Featured = ({ title, active, icon }) => {

    const [smShow, setSmShow] = useState(false);
    const [lgShow, setLgShow] = useState(false);


    return (
      <>
        <Modal
          size="lg"
          show={lgShow}
          onHide={() => setLgShow(false)}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
              Featured Recipes here!
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>...</Modal.Body>
        </Modal>

        <Container onClick={() => setLgShow(true)} active={active}>
          <Title active={active}>{title}</Title>
        </Container>
      </>
    );
}

export default Featured