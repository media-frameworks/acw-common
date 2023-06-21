import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";

import ReactSlider from 'react-slider'
import CoolStyles from "./CoolStyles";

const StyledSlider = styled(ReactSlider)`
   vertical-align: middle;
   height: 1rem;
   width: inherit;
`;

const StyledVerticalSlider = styled(ReactSlider)`
   margin: auto;
   width: 2rem;
   height: inherit;
`;

const StyledThumb = styled.div`
   ${CoolStyles.align_center}
   height: 1rem;
   width: 2rem;
   line-height: 1rem;
   text-align: center;
   font-size: 0.85rem;
   background-color: #333;
   color: #fff;
   cursor: grab;
`;

const StyledTrack = styled.div`
   top: 0;
   bottom: 0;
   background-color: ${props => props.index === 2 ? '#f00' : props.index === 1 ? '#ddd' : '#888'};
   border-radius: 0.25rem;
`;

const StyledVerticalTrack = styled.div`
   left: 0;
   right: 0;
   background-color: ${props => props.index === 2 ? '#f00' : props.index === 1 ? '#888' : '#ddd'};
   border-radius: 0.25rem;
`;

export class CoolSlider extends Component {

   static propTypes = {
      value: PropTypes.number.isRequired,
      min: PropTypes.number.isRequired,
      max: PropTypes.number.isRequired,
      on_change: PropTypes.func.isRequired,
      step_count: PropTypes.number,
      is_vertical: PropTypes.bool
   }

   static defaultProps = {
      step_count: 100,
      is_vertical: true,
   }

   render() {
      const {value, min, max, on_change, step_count, is_vertical} = this.props;
      const Thumb = (props, state) => <StyledThumb {...props}>{state.valueNow}</StyledThumb>;
      const Track = (props, state) => !is_vertical ? <StyledTrack {...props} index={state.index}/> :
         <StyledVerticalTrack {...props} index={state.index}/>;
      return !is_vertical ? <StyledSlider
         max={max}
         min={min}
         step={(max - min) / step_count}
         value={value}
         renderTrack={Track}
         renderThumb={Thumb}
         onChange={on_change}
         orientation={"horizontal"}
      /> : <StyledVerticalSlider
         max={max}
         min={min}
         step={(max - min) / step_count}
         value={value}
         renderTrack={Track}
         renderThumb={Thumb}
         onChange={on_change}
         orientation={"vertical"}
      />
   }
}

export default CoolSlider;
