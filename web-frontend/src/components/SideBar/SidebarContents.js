import React from 'react'
import styled from 'styled-components'
import Menu from './Menu/Menu'
import Profile from './Profile'

const Container = styled.div`
    // background-color: ${({ theme }) => theme.secondary};
    background-color: #f8f8f8;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    width: 25rem;
    display: flex;
    flex-direction: column;
    align-items: center;


`

const SidebarContent = (props) => {
    return (
        <Container>
            <Profile />
            <Menu handleClose = {props.handleClose} createMarker = {props.createMarker} setMarkerList = {props.setMarkerList}/>
        </Container>
    )
}

export default SidebarContent
