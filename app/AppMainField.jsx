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

const HeaderButton = styled(CoolStyles.InlineBlock)`
   ${CoolStyles.noselect}
   ${CoolStyles.uppercase}
   ${CoolStyles.align_center}
   ${CoolStyles.bold}
   ${CoolStyles.pointer}
   ${CoolStyles.ellipsis}
   color: #666666;
   letter-spacing: 0.125rem;
   font-size: 0.85rem;
   padding: 0.125rem 0.75rem 0;
   margin: 0.25rem 0 0 0.25rem;
   border: 0.125rem solid #666666;
   background-color: #bbbbbb;
`;

const StatsWrapper = styled(CoolStyles.InlineBlock)`
   ${CoolStyles.italic}
   ${CoolStyles.align_middle}
   color: #55555;
   margin-left: 0.25rem;
   font-size: 0.9rem;
   line-height: 1.5rem;
`;

export class AppMainField extends Component {

   static propTypes = {
      width_px: PropTypes.number.isRequired,
      selected_field: PropTypes.object.isRequired,
      field_tabs: PropTypes.array,
   }

   static defaultProps = {
      field_tabs: [],
   }

   state = {
      selected_tab_index: -1
   };

   componentDidMount() {
      this.initialize_field()
   }

   componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
      const {selected_field} = this.props
      if (selected_field.field_indicator !== prevProps.selected_field.field_indicator) {
         this.initialize_field()
      }
   }

   initialize_field = () =>{
      const {selected_field} = this.props
      const storage_key = `field_tab_${selected_field.field_indicator}`
      const tab_index_str = localStorage.getItem(storage_key)
      if (tab_index_str) {
         this.setState({selected_tab_index: parseInt(tab_index_str, 10)})
      }
      else {
         this.setState({selected_tab_index: 0})
      }
   }

   render_field = () => {
      const {selected_tab_index} = this.state
      const {field_tabs, width_px, selected_field} = this.props
      if (selected_tab_index < 0) {
         return []
      }
      const selected_tab = field_tabs[selected_tab_index]
      return selected_tab.render_fn(width_px, selected_field.field_indicator)
   }

   render_stats_bar = () => {
      return <CoolStyles.Block>
         <StatsWrapper>{"stats bar"}</StatsWrapper>
      </CoolStyles.Block>
   }

   on_tab_select = (tab_index) => {
      const {selected_field} = this.props
      this.setState({selected_tab_index: tab_index})
      const storage_key = `field_tab_${selected_field.field_indicator}`
      localStorage.setItem(storage_key, `${tab_index}`)
   }

   render_button_bar = () => {
      const {selected_tab_index} = this.state
      const {width_px, field_tabs} = this.props;
      const button_width = `${(width_px - 150) / 10}px`;
      const button_style = {width: button_width}
      const selected_style = {
         backgroundColor: "white",
         border: "0",
         height: "1.5rem",
         borderTopLeftRadius: "0.25rem",
         borderTopRightRadius: "0.25rem",
         textDecoration: "underline",
         width: button_width,
         fontSize: "1.125rem"
      }
      return field_tabs.map((tab, i) => {
         return <HeaderButton
            key={`HeaderButton-${tab.name}`}
            onClick={e => this.on_tab_select(i)}
            style={selected_tab_index === i ? selected_style : button_style}>
            {tab.name}
         </HeaderButton>
      })
   }

   render_header = () => {
      const {selected_field} = this.props;
      const stats_bar = this.render_stats_bar()
      const button_bar = this.render_button_bar()
      return <TitleBar>
         <FieldTitle>{selected_field.field_title}</FieldTitle>
         <CoolStyles.InlineBlock>
            {stats_bar}
            {button_bar}
         </CoolStyles.InlineBlock>
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
