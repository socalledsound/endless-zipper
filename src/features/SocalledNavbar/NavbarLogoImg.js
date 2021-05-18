import React from 'react'
// import { NavLink } from 'react-router-dom'
import FlexContainer from './FlexContainer'
import styled from 'styled-components'
import { backgroundLinkHoverColor } from './colorPalette'

const NavbarLogoLink = styled.div`
height: 5rem;
width : 5rem;
vertical-align: middle;
box-sizing: border-box;
text-decoration: none;
font-size: 0.9rem;
border-radius : 0.6rem;
&:hover{
    border: 6px solid ${ backgroundLinkHoverColor };
}
`;

const Img = styled.img`
width: 100%;
height: 100%
`


const NavbarLogo = ({logo}) => {
    return ( 
        <FlexContainer>
        <NavbarLogoLink  >
            {/* {<Logo />} */}
            <Img src={logo} alt="an image of a cloud"/>
        </NavbarLogoLink >    
        </FlexContainer>
     );
}
 
export default NavbarLogo;