import React, {Component} from 'react';
import PropTypes from 'prop-types';
// import styled from "styled-components";
//
// import {CoolStyles} from 'common/ui/CoolImports';

import AppPageMain from './AppPageMain';
import AppSidebar from './AppSidebar';
import AppMainField from './AppMainField';

export class AppPageLayout extends Component {

   static propTypes = {
      app_name: PropTypes.string.isRequired,
      app_fields_list: PropTypes.array.isRequired,
      selected_field_index: PropTypes.number.isRequired,
      app_field_tabs: PropTypes.array,
      on_resized: PropTypes.func,
      on_selected: PropTypes.func,
   }

   static defaultProps = {
      app_field_tabs: [],
      on_resized: null,
      on_selected: null,
   }

   state = {
      left_width: 0,
      right_width: 0,
   };

   on_resize = (left_width, right_width) => {
      const {on_resized} = this.props
      on_resized(left_width, right_width)
      this.setState({
         left_width: left_width,
         right_width: right_width
      })
   }

   on_field_select = (field_index) => {
      const {on_selected} = this.props
      on_selected(field_index)
   }

   render_content_left = (width_px) => {
      const {left_width} = this.state
      const {app_fields_list, selected_field_index} = this.props
      return <AppSidebar
         width_px={left_width}
         fields_list={app_fields_list}
         selected_field_index={selected_field_index}
         on_field_select={field_index => this.on_field_select(field_index)}
      />
   }

   render_content_right = (width_px) => {
      const {right_width} = this.state
      const {app_fields_list, app_field_tabs, selected_field_index} = this.props
      return <AppMainField
         width_px={right_width}
         selected_field={app_fields_list[selected_field_index]}
         field_tabs={app_field_tabs}
      />
   }

   render() {
      const {left_width, right_width} = this.state;
      const {app_name} = this.props;
      const content_left = this.render_content_left(left_width);
      const content_right = this.render_content_right(right_width);
      return <AppPageMain
         app_name={app_name}
         on_resize={(left_width, right_width) => this.on_resize(left_width, right_width)}
         content_left={content_left}
         content_right={content_right}
      />
   }
}

export default AppPageLayout;
