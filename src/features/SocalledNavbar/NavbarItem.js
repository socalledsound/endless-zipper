import React from 'react';
// import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const Button = styled.button`

background-color: #505050;
color: #FAFAFA;
border: 1px solid #000;
text-decoration: none;
border-radius: 0.3rem;
font-size: 0.9rem;
width: 5rem;
vertical-align: middle;
box-sizing: border-box;

&:hover{
    background-color: #aaaaaa;
}

`;



const NavItem = ({Content, toggleModal}) => {
    return ( 
            <Button  onClick={() => toggleModal(Content)}>
                {<Content />}
            </Button>
        
     );
}
 
export default NavItem;