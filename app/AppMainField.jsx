import {Component} from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";

import {CoolStyles} from 'common/ui/CoolImports';

const PADDING_PX = 10

const TitleBar = styled(CoolStyles.Block)`
   background: linear-gradient(120deg, white, #999999);
   height: 72px;
   width: 100%;
   overflow-x: noscroll;
`;

const FieldTitle = styled(CoolStyles.InlineBlock)`
   ${CoolStyles.uppercase}
   ${CoolStyles.bold}
   ${CoolStyles.align_center}
   letter-spacing: 0.25rem;
   font-size: 1.75rem;
   line-height: 46px;
   padding: 0.25rem 0.5rem;
   background-color: white;
   height: 46px;
`;

const ToolField = styled(CoolStyles.Block)`
   ${CoolStyles.fixed}
   top: 76px;
   right: 0;
   bottom: 0;
   overflow: auto;
   background-color: white;
   padding: ${PADDING_PX}px;
}`

export class AppMainField extends Component {

   static propTypes = {
      width_px: PropTypes.number.isRequired,
      selected_field: PropTypes.object.isRequired,
   }

   state = {
   };

   componentDidMount() {
   }

   render_field = () => {
      return []
   }

   render_header = () => {
      const {selected_field} = this.props;
      return <TitleBar>
         <FieldTitle>{selected_field.field_title}</FieldTitle>
      </TitleBar>
   }

   render() {
      const {width_px} = this.props;
      const field_rendering = this.render_field()
      const field_style = {width: `${width_px - 2 * PADDING_PX}px`}
      return [
         this.render_header(),
         <ToolField
            key={'ToolField'}
            style={field_style}>
            {field_rendering}
         </ToolField>
      ];
   }
}

export default AppMainField;
