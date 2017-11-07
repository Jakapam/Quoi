import React from 'react'
import Radium from 'radium'

const style = {
  color: '#C0C0C0',
  ':hover': {
    color: '#ffffff'
  }
};

const StyledSpan = (props) => {
  return (
    <span style={style}>
      {props.text}
    </span>
  );
};

export default Radium(StyledSpan);
