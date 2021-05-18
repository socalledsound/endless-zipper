import React from 'react';
import styled from 'styled-components'

const BlackCircleDiv = styled.div`
float: right;
cursor: pointer;
background-color: black;
width: 3rem;
height: 3rem;
display: inline-block;
border-radius: 3rem;
&:hover{
    background-color: #555;
}
`

const CloseP = styled.p`
padding: 0;
margin: auto;
text-align: center;
font-size: 2rem;
color: white;
line-height: 2.5rem;
`

const CloseModal = ({closeModal}) => {
    return ( 
        <BlackCircleDiv onClick={closeModal}>
            <CloseP >
                x
            </CloseP>
        </BlackCircleDiv>

     );
}
 
export default CloseModal;