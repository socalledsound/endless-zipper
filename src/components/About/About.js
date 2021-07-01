import React from 'react'
import styled from 'styled-components'

const AboutDiv = styled.div`
background-color: rgba(200,90,90,0.6);
color: #FFF;
font-weight: 600;
font-size: 3rem;
padding: 3rem;
margin-top: 2rem;
min-height: 50vh;
`;

const About = () => {
    return ( 
        <AboutDiv>
           <p>just a zipper made out of zippers.  ¯\_(ツ)_/¯  </p>
           <p>more projects like this at <a href='www.socalledsound.com'>www.socalledsound.com</a></p>
           
        </AboutDiv>
     );
}
 
export default About;
