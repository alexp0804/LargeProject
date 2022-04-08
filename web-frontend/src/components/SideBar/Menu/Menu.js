import React from 'react'
import MenuLink from './MenuLink'
import styled from 'styled-components'
import Modal from 'react-bootstrap/Modal'
import { useState } from 'react';
import Featured from './FeaturedModal';
import Bookmarks from './BookmarksModal';
import MyRecipes from './MyRecipesModal';
import Search2 from './SearchBar2';
import RandomPick from './RandomPick';
import MappyMap from '../../MappyMap';


const Container = styled.div`
    margin-top: 3rem;
    width: 100%;
`
function Example() {
    const [smShow, setSmShow] = useState(false);
    const [lgShow, setLgShow] = useState(false);
  
    return (
      <>
        {/* <Button onClick={() => setLgShow(true)}>Large modal</Button> */}

        <a href="#" onClick={() => setLgShow(true)}> heyo </a>
        <Modal
          size="lg"
          show={lgShow}
          onHide={() => setLgShow(false)}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
              Large Modal
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>...</Modal.Body>
        </Modal>
      </>
    );
  }
  



const Menu = () => {

    const [lgShow, setLgShow] = useState(false); 
    return (

        <Container>

            < Search2 / > 
            <Featured title="Featured Recipes"/>
            <Bookmarks title="Bookmarks"/>
            <MyRecipes title="My Recipes"/>
            <MenuLink title="Pick for Me" icon={'cog'} />
        </Container>
    )
}

export default Menu