import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";

import {CoolStyles} from "./CoolImports";

const TabsWrapper = styled(CoolStyles.Block)`
   margin: 0;
`;

const CardWrapper = styled(CoolStyles.Block)`
   border: 0.15rem solid #aaaaaa;
   border-radius: 0 0.25rem 0.25rem 0.25rem;
   min-height: 12.25rem;
   min-width: 20rem;
   margin-top: -2px;
   padding: 0.5rem
`;

const TabSpan = styled(CoolStyles.InlineBlock)`
   ${CoolStyles.bold}
   ${CoolStyles.pointer}
   color: #eeeeee;
   background-color: #bbbbbb;
   padding: 0 0.5rem;
`;

const TabSpanSelected = styled(CoolStyles.InlineBlock)`
   ${CoolStyles.bold}
   color: #444444;
   padding: 0 0.5rem;
   border: 0.15rem solid #aaaaaa;
   border-radius: 0.25rem 0.25rem 0 0;
   border-bottom: 0;
   background-color: white;
   z-index: 100;
`;

export class CoolTabs extends Component {

   static propTypes = {
      labels: PropTypes.array.isRequired,
      tab_index: PropTypes.number.isRequired,
      on_tab_select: PropTypes.func.isRequired,
      selected_content: PropTypes.array.isRequired,
      style: PropTypes.object,
   }

   static defaultProps = {
      style: {},
   }

   state = {}

   render() {
      const {labels, style, tab_index, on_tab_select, selected_content} = this.props;
      const all_tabs = labels.map((label, i) => {
         return i !== tab_index ?
            <TabSpan key={`${label}_tab`} onClick={e => on_tab_select(i)}>{label}</TabSpan> :
            <TabSpanSelected key={`${label}_tab`}>{label}</TabSpanSelected>
      })
      return [
         <TabsWrapper key={"tab_wrapper"} style={style}>{all_tabs}</TabsWrapper>,
         <CardWrapper key={"card_wrapper"} style={style}>{selected_content}</CardWrapper>
      ]
   }
}

export default CoolTabs;
