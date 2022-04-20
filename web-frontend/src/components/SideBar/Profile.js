import React from 'react'
import styled from 'styled-components'
import Image from '../../assets/images/git2.png'

const Container = styled.div`
    margin-top: 5rem;
`

const ProfileImg = styled.img`
    height: 5rem;
`
const ProfileName = styled.h1`
    font-size: 1rem;
    font-weight: 300;
    padding-top: 1rem;
    color: #585280;
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
