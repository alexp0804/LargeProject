import React from 'react'
import MenuLink from './MenuLink'
import styled from 'styled-components'
import Modal from 'react-bootstrap/Modal'
import { useState } from 'react';
import AddRecipe from './AddRecipeFromSideBar'
import Search2 from './SearchBar2';
import CustomRecipePopupModal from './CustomRecipePopupModal'


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
  



const Menu = (props) => {

    const [lgShow, setLgShow] = useState(false); 
    return (

        <Container>

            < Search2 closeSideBar = {props.closeSideBar} setMarkerList = {props.setMarkerList} / > 
            <CustomRecipePopupModal closeSideBar = {props.closeSideBar} hashMap = {props.likes} setMarkerList = {props.setMarkerList} title="Featured Recipes"/>
            <CustomRecipePopupModal closeSideBar = {props.closeSideBar} hashMap = {props.likes} setMarkerList = {props.setMarkerList} title="Liked Recipes"/>
            <CustomRecipePopupModal closeSideBar = {props.closeSideBar} hashMap = {props.favs} setMarkerList = {props.setMarkerList} title="Bookmarks"/>
            <AddRecipe closeSideBar = {props.closeSideBar} setAddingRecipe = {props.setAddingRecipe}  title="Add Recipe"/>
            <MenuLink closeSideBar = {props.closeSideBar} title="Pick for Me" icon={'cog'} setMarkerList = {props.setMarkerList} />
        </Container>
    )
}

export default Menu