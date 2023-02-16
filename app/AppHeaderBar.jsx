import {Component} from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";

import {CoolStyles} from 'common/ui/CoolImports';

export const HEADER_BAR_HEIGHT_REM = 1.35;

const HeaderWrapper = styled(CoolStyles.Block)`
   ${CoolStyles.fixed}
   ${CoolStyles.noselect}
   left: 0;
   right: 0;
   top: 0;
   height: ${HEADER_BAR_HEIGHT_REM - 0.1}rem;
   background: linear-gradient(15deg, #edeeef 0%, #fdfeff 50%, #dddedf 90%);
   opacity: 0.8;
   font-family: Arial;
   border-bottom: 0.1rem solid black;
`;

const LogoutLink = styled(CoolStyles.InlineBlock)`
   ${CoolStyles.fixed}
   ${CoolStyles.pointer}
   ${CoolStyles.uppercase}
   right: 0.125rem;
   top: 0.125rem;
   letter-spacing: 0.125rem;
   font-size: 0.75rem;
   color: #888888;
   opacity: 0.5;
   &: hover{
      ${CoolStyles.underline}
      color: white;
      text-shadow: 0 0 0.75rem black;
      opacity: 1;
   }
`;

const AppTitle = styled(CoolStyles.Block)`
   ${CoolStyles.uppercase}
   ${CoolStyles.align_center}
   ${CoolStyles.narrow_text_shadow}
   font-size: 1.125rem;
   margin: 0 auto;
   letter-spacing: 1.25rem;
   color: #999999;
   text-shadow: 0.125rem 0.125rem 0.5rem rgba(0,0,0,0.25);
`;

export class AppHeaderBar extends Component {

   static propTypes = {
      app_name: PropTypes.string.isRequired,
   }

   logout = () => {
      localStorage.removeItem("credentials");
      window.location = "/";
   }

   render() {
      const {app_name} = this.props;
      return [
         <HeaderWrapper>
            <AppTitle>{app_name}</AppTitle>
            <LogoutLink onClick={this.logout}>{"bye now"}</LogoutLink>
         </HeaderWrapper>
      ]
   }
}

export default AppHeaderBar;
