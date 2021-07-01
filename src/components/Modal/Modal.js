import React from 'react'
import styled from 'styled-components'

const ModalFlexContainer = styled.div`
position: absolute;
top: 18vh;
width: 100vw;
display: flex;
flex-direction: row;
justify-content: center;
box-sizing: border-box;

`;

const ModalContainer = styled.div`
    position: absolute;
    left: 0;
    top: 2vh;
    width: 90vw;
    background-color: rgba(100, 100, 255, 1.0);
    position: relative;
    padding: 1.2rem;
    // padding-right: 1.2rem;
    // padding-left: 1.2rem;
    // padding-top: 1.2rem;
    box-sizing: border-box;
    border-radius: 0.3rem;
    border: 1px solid rgba(200, 200, 200, 0.3);
    z-index: 20;
`;

const Modal = ({children}) => {
    console.log(children);
    return ( 
        <ModalFlexContainer>
            <ModalContainer> 
                {children}
            </ModalContainer>
        </ModalFlexContainer>

     );
}
 
export default Modal;
