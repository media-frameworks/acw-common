import React from 'react';
import styled from "styled-components";

import {useGoogleLogin} from '@react-oauth/google';

import {CoolStyles, CoolColors} from 'common/ui/CoolImports';

import logo from './logo.jpg';

const LOGO_HEIGHT_PX = 75;

const TitleBlock = styled(CoolStyles.Block)`
   ${CoolStyles.align_center}
   ${CoolStyles.uppercase}
   padding-top: 15vh;
   font-size: 1.5rem;
   letter-spacing: 1.5rem;
   text-shadow: 0.5rem 0.5rem 1rem rgba(0,0,0,0.35);
   color: #666666;
   background-color: white;
   font-family: Arial;
`;

const TitleSpan = styled.span`
   margin-left: 1rem;
`;

const LogoBlock = styled(CoolStyles.Block)`
   height: ${LOGO_HEIGHT_PX}px;
   width: fit-content;
   margin: 2rem auto 25vh;
`;

const ButtonBlock = styled.button`
   ${CoolStyles.bold}
   ${CoolStyles.pointer}
   ${CoolStyles.uppercase}
   ${CoolStyles.medium_box_shadow}
   ${CoolStyles.narrow_border_radius}
   padding: 0.5rem 2rem;
   background-color: ${CoolColors.cool_blue};
   color: white;
   font-size: 1.25rem;
   letter-spacing: 0.25rem;
   border: 0.15rem solid #888888;
   font-family: Arial;
`;

const Wrapper = styled(CoolStyles.Block)`
   ${CoolStyles.align_center}
`

function user_verified(response) {
   console.log("user_verified", response);
}

export function AppLoginPage(props) {
   const login = useGoogleLogin({onSuccess: r => user_verified(r)});
   return [
      <TitleBlock><TitleSpan>{props.app_name}</TitleSpan></TitleBlock>,
      <LogoBlock>
         <img src={logo} alt="am chill whale" height={LOGO_HEIGHT_PX}/>
      </LogoBlock>,
      <Wrapper>
         <ButtonBlock onClick={() => login()}>Begin</ButtonBlock>
      </Wrapper>
   ]
}

export default AppLoginPage;