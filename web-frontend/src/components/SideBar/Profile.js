import React from 'react'
import styled from 'styled-components'
import Image from '../../assets/images/profilepics/a5.png'

const Container = styled.div`
    margin-top: 4rem;
`

const ProfileImg = styled.img`
    height: 7rem;
    margin-top: 3rem;
`
const ProfileName = styled.h1`
    font-size: 1.4rem;
    font-weight: 400;
    padding-top: 1rem;
    color: 'light-grey';
	text-align: center;
`

const Profile = () => {
    return (
        <Container>
            <ProfileImg src={Image} />
            <ProfileName>{JSON.parse(window.localStorage.getItem('userObject'))['username']}</ProfileName>
        </Container>
    )
}

export default Profile
