import {Component} from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";

import {CoolStyles} from 'common/ui/CoolImports';

const FieldTypeWrapper = styled(CoolStyles.Block)`
   ${CoolStyles.noselect}
`;

const FieldTypeName = styled(CoolStyles.InlineBlock)`
   ${CoolStyles.uppercase}
   ${CoolStyles.align_middle}
   ${CoolStyles.pointer}
   font-size: 1.125rem;
   color: #666666;
   line-height: 1.5rem;
`;

const Dot = styled(CoolStyles.InlineBlock)`
   ${CoolStyles.align_middle}
   ${CoolStyles.pointer}
   height: 0.5rem;
   width: 0.5rem;
   border-radius: 0.25rem;
   background-color: #888888;
   cursor: pointer;
   line-height: 1.5rem;
   margin-right: 0.5rem;
`;

const Not = styled(CoolStyles.InlineBlock)`
   height: 0.5rem;
   width: 1rem;
   line-height: 1.5rem;
`;

const SidebarWrapper = styled(CoolStyles.Block)`
   margin: 0.5rem;
`;

export class AppSidebar extends Component {

   static propTypes = {
      width_px: PropTypes.number.isRequired,
      fields_list: PropTypes.array,
      selected_field_index: PropTypes.number.isRequired,
      on_field_select: PropTypes.func.isRequired,
   }

   state = {};

   select_field = (field_type) => {
      const {on_tool_specify} = this.props;
      const most_recent = on_tool_specify(field_type);
      console.log("most_recent", field_type, most_recent)
   }

   render() {
      const {fields_list, on_field_select, selected_field_index} = this.props;
      const sidebar_list = fields_list.map((field, i) => {
         const is_selected = selected_field_index === i
         const marker = is_selected ? <Dot/> : <Not/>
         const extra_style = is_selected ? {fontWeight: 'bold'} : {}
         return <FieldTypeWrapper
            key={`sidebar-${i}`}
            onClick={e => on_field_select(i)}>
            {marker}
            <FieldTypeName style={extra_style}>{field.name}</FieldTypeName>
         </FieldTypeWrapper>
      })
      return <SidebarWrapper>
         {sidebar_list}
      </SidebarWrapper>;
   }
}

export default AppSidebar;
