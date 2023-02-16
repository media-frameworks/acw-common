import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";

import {CoolStyles} from 'common/ui/CoolImports';
import CoolSplitter, {SPLITTER_TYPE_VERTICAL} from "common/ui/CoolSplitter";
import {HEADER_BAR_HEIGHT_REM} from "common/app/AppHeaderBar";

import AppHeaderBar from 'common/app/AppHeaderBar';

const SPLITTER_WIDTH_PX = 5;

const PageWrapper = styled.div`
    position: absolute;
    font-family: Arial;
    font-size: 1rem;
    overflow: hidden;
    height: 100%;
    margin: 0;
    top: 0;
    left: 0;
    right: 0;
    background-color: #fafafa;
    overflow-y: auto;
`;

const ContentWrapper = styled(CoolStyles.Block)`
    ${CoolStyles.fixed}
    right: 0;
    left: 0;
    top: ${HEADER_BAR_HEIGHT_REM}rem;
    bottom: 0;
    background-color: #f8f8f8;
`;

const RightSideWrapper = styled(CoolStyles.InlineBlock)`
   ${CoolStyles.fixed}
   background-color: lightcoral;
   top: ${HEADER_BAR_HEIGHT_REM}rem;
   bottom: 0;
   right: 0;
`;

const LeftSideWrapper = styled(CoolStyles.InlineBlock)`
   ${CoolStyles.fixed}
   background-color: lightsalmon;
   top: ${HEADER_BAR_HEIGHT_REM}rem;
   bottom: 0;
   left: 0;
`;

export class AppPageMain extends Component {

   static propTypes = {
      app_name: PropTypes.string.isRequired,
      on_resize: PropTypes.func.isRequired,
      content_left: PropTypes.array.isRequired,
      content_right: PropTypes.array.isRequired,
   }

   state = {
      wrapper_ref: React.createRef(),
      content_bounds: {},
      splitter_position: 0,
   };

   componentDidMount() {
      window.addEventListener("resize", this.resize_wrapper);
      this.resize_wrapper();
      this.resize_panes(200);
   }

   componentWillUnmount() {
      window.removeEventListener("resize", this.resize_wrapper);
   }

   resize_wrapper = (e) => {
      const {wrapper_ref, splitter_position} = this.state;
      const wrapper = wrapper_ref.current;
      if (wrapper) {
         const content_bounds = wrapper.getBoundingClientRect();
         this.setState({
            content_bounds: content_bounds,
            splitter_position: splitter_position ? splitter_position : content_bounds.height / 2,
         });
      }
   }

   resize_panes = (splitter_position) => {
      const {wrapper_ref} = this.state;
      const {on_resize} = this.props;
      const wrapper = wrapper_ref.current;
      if (wrapper) {
         const content_bounds = wrapper.getBoundingClientRect();
         const right_side_width = content_bounds.width - splitter_position - SPLITTER_WIDTH_PX + 2;
         const left_side_width = splitter_position;
         on_resize(left_side_width, right_side_width)
         this.setState({
            splitter_position: splitter_position,
            right_side_width: right_side_width,
            left_side_width: left_side_width,
         })
      }
   }

   render() {
      const {wrapper_ref, content_bounds, splitter_position, left_side_width, right_side_width} = this.state
      const {app_name, content_left, content_right} = this.props;
      return <PageWrapper ref={wrapper_ref}>
         <AppHeaderBar app_name={app_name}/>,
         <ContentWrapper>
            <LeftSideWrapper style={{width: left_side_width}}>
               {content_left}
            </LeftSideWrapper>
            <CoolSplitter
               type={SPLITTER_TYPE_VERTICAL}
               name={`${app_name}-splitter`}
               bar_width_px={SPLITTER_WIDTH_PX}
               container_bounds={content_bounds}
               position={splitter_position}
               on_change={pos => this.resize_panes(pos)}
            />
            <RightSideWrapper style={{width: right_side_width}}>
               {content_right}
            </RightSideWrapper>
         </ContentWrapper>
      </PageWrapper>
   }
}

export default AppPageMain;
