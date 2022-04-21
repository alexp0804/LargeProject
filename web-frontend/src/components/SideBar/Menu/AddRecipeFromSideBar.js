import React from 'react'
import styled from 'styled-components'
import {Modal} from 'react-bootstrap'

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

const Title = styled.h1`
    font-size: 1.2rem;
    font-weight: 300;
    color: "black";
`


const MyRecipes = ({ title, active, ...props }) => {

    return(
        <>
        <Container onClick={() => {props.setAddingRecipe(prev => {return !prev}); props.closeSideBar()}} active={active}  >
            <Title active={props.active}>{title}</Title>
        </Container>
      </>
    );
}
//() => setLgShow(true)



export default MyRecipes

