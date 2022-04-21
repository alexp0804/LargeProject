import React from 'react'
import { Modal } from 'react-bootstrap'
import styled from 'styled-components'
// import Modal from 'react-bootstrap/Modal'
import { useState } from 'react';
import { Button } from 'react-bootstrap'
import {useMap, Marker} from 'react-leaflet';
import RecipeReviewCard from './ProfileRecipesMap';
import l from "leaflet";


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
  /* color: ${(props) =>
    props.active ? props.theme.activeMenu : "#AAA5A5"}; */
  color: ${(props) => !props.active && props.theme.textColor};
  font-size: 1rem;
  margin-right: 1rem;
`;

const Title = styled.h1`
  font-size: 1.2rem;
  font-weight: 300;
  color: "black";
`;

const MenuLink = (props) => {

    const [smShow, setSmShow] = useState(false);
    const [lgShow, setLgShow] = useState(false);
    let mappy = useMap();


    const getRando = async (event) => {
    
        const app_name = 'reci-pin';
        function buildPath(route)
        {
            if (process.env.NODE_ENV === 'production')
                return 'https://' + app_name + '.herokuapp.com/' + route;
            else
                return 'http://localhost:5000/' + route;
        }
    
        let jsonPayLoad = JSON.stringify({
            userID: JSON.parse(window.localStorage.getItem('userObject'))['_id']
          });
    
    
        try 
        {
          // Do not await fetches anymore
          const response = await fetch(buildPath("api/randomRecipe"), {
            method: "POST",
            body: jsonPayLoad,
            headers: { "Content-Type": "application/json","x-access-token": JSON.parse(window.localStorage.getItem('userObject'))['token'] }
            });

          let res = JSON.parse(await response.text());
      
          if(res.hasOwnProperty('error'))
            console.log(res['error']);

            let x = res[0]['location']['coordinates'][1]
            let y = res[0]['location']['coordinates'][0]

            console.log([x,y])
      
            mappy.panTo([x, y])
            mappy.setZoom(12);
            props.setMarkerList(res);
            props.closeSideBar();   
    
        }
        catch(e)
        {
            console.log(e)
        }
    };


    return (
      <>
        <Modal
          size="lg"
          show={lgShow}
          onHide={() => setLgShow(false)}
          aria-labelledby="example-modal-sizes-title-lg"
          style = {{zIndex : '2000'}}
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
              Stand in modal - should be a randomizer 
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>...</Modal.Body>
        </Modal>

        <Container onClick={getRando} active={props.active}>
          <Title active={props.active}>{props.title}</Title>
        </Container>
      </>
    );
}

export default MenuLink