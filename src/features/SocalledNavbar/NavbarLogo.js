import React from 'react'
// import { NavLink } from 'react-router-dom'
import FlexContainer from './FlexContainer'
import styled from 'styled-components'

const NavbarLink = styled.div`
height: 5rem;
width : 5rem;
vertical-align: middle;
box-sizing: border-box;

// margin-left: 0.4rem;
// margin-right: 0.4rem;
// /* padding-left: 1rem;
// padding-right: 1rem;
// padding-top: 0.7rem; */

// padding: 2rem;
// padding-top: 1rem;

/* padding-bottom: 1.2rem; */
/* background-color: #7c7c7c; */
// background-color: #fedeff;
// background-color: rgba(0, 0, 100, 0.3);
// color: #202020;
// border: 1px solid #000;
text-decoration: none;
// border-radius: 0.3rem;
font-size: 0.9rem;


`;



const NavbarLogo = ({Logo}) => {
    return ( 
        <FlexContainer>
        <NavbarLink  >
            {<Logo />}
        </NavbarLink >    
        </FlexContainer>
     );
}
 
export default NavbarLogo;