import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    border-left: 3px solid ${props => props.active ? props.theme.activeMenu : "transparent"};

    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    transition: 0.2s all ease-in-out;

    &:hover {
        background-color: rgba(0,0,0,0.1);
    }
`

const MyRecipes = ({ title, active, ...props }) => {

    return(
        <>
        <Container onClick={() => {props.setAddingRecipe(prev => {return !prev})} } active={active}  >
          {title}
        </Container>
      </>
    );
}
//() => setLgShow(true)



export default MyRecipes

