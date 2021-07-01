import React from 'react';
import styled from 'styled-components'


const NavbarEl = styled.nav`
  margin: auto;
  width: 100%;
  background-color: rgba(50, 50, 50, 0.5)

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
