import React from 'react';
import styled from "styled-components";

import {useGoogleLogin} from '@react-oauth/google';

import logo from './logo.jpg';

const LOGO_HEIGHT_PX = 75;

const TitleBlock = styled.div`
   display: block;
   text-align: center;
   padding-top: 15vh;
   font-size: 1.5rem;
   letter-spacing: 1.5rem;
   text-shadow: 0.5rem 0.5rem 1rem rgba(0,0,0,0.35);
   color: #666666;
   text-transform: uppercase;
   background-color: white;
   align-items: center;
   justify-content: center;
   font-family: Arial;
`;

const TitleSpan = styled.span`
   margin-left: 1rem;
`;

const LogoBlock = styled.div`
   display: block;
   height: ${LOGO_HEIGHT_PX}px;
   width: fit-content;
   margin: 2rem auto 25vh;
`;

const HSL_COOL_BLUE = 'hsla(200, 90%, 50%, 85%)';

const ButtonBlock = styled.button`
   display: block;
   padding: 0.5rem 2rem;
   margin: 0 auto;
   background-color: ${HSL_COOL_BLUE};
   color: white;
   font-size: 1.25rem;
   font-weight: bold;
   border-radius: 0.25rem;
   letter-spacing: 0.25rem;
   text-transform: uppercase;
   border: 0.15rem solid #888888;
   box-shadow: 0.5rem 0.5rem 1rem rgba(0,0,0,0.5);
   cursor: pointer;
`;

export function AppLoginPage(props) {
   const login = useGoogleLogin({
      onSuccess: codeResponse => console.log(codeResponse)
   });
   return [
      <TitleBlock><TitleSpan>{props.app_name}</TitleSpan></TitleBlock>,
      <LogoBlock>
         <img src={logo} alt="am chill whale" height={LOGO_HEIGHT_PX}/>
      </LogoBlock>,
      <ButtonBlock onClick={() => login()}>Begin</ButtonBlock>
   ]
}

export default AppLoginPage;