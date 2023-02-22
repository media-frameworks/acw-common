import React from 'react';
import styled from "styled-components";

import {useGoogleLogin} from '@react-oauth/google';

import {CoolStyles, CoolColors} from 'common/ui/CoolImports';
import PageMain from 'pages/PageMain';

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

const FRACTO_PHP_URL_BASE = "http://dev.mikehallstudio.com/fracto/fracto-server";

function user_verified(response) {
   console.log("response.access_token",response.access_token)
   const url = `${FRACTO_PHP_URL_BASE}/google_request.php?access_token=${response.access_token}`;
   fetch(url)
      .then(response => response.json())
      .then(result => {
         console.log("result", response)
         if (result['emailAddresses'][0]['value'] !== "mikehallvideo@gmail.com") {
            console.log("bad user")
         } else {
            console.log("good user")
            localStorage.setItem("credentials", JSON.stringify(result))
            window.location = "/main";
         }
      })
}

export function AppLoginPage(props) {
   const login = useGoogleLogin({onSuccess: r => user_verified(r)});
   const credentials = localStorage.getItem("credentials", null);
   return credentials ? <PageMain app_name={props.app_name}/> : [
      <TitleBlock key={`${props.app_name}_title`}><TitleSpan>{props.app_name}</TitleSpan></TitleBlock>,
      <LogoBlock key={`${props.app_name}_logo`}>
         <img src={logo} alt="am chill whale" height={LOGO_HEIGHT_PX}/>
      </LogoBlock>,
      <Wrapper key={`${props.app_name}_button`}>
         <ButtonBlock onClick={() => login()}>Begin</ButtonBlock>
      </Wrapper>
   ]
}

export default AppLoginPage;