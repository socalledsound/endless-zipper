import React from 'react';
import styled from 'styled-components'


const NavbarEl = styled.nav`
  margin: auto;
  width: 100%;
  background-color: rgba(150, 10, 150, 1.0);
  z-index: 10;
`

const NavbarList = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  margin: auto;
 

`


const Navbar = ({children}) => {
    return ( 
        <NavbarEl>
           <NavbarList>{children}</NavbarList>
        </NavbarEl>
     );
}
 
export default Navbar;
