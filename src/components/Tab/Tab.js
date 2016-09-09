import React, { PropTypes } from 'react';
import classes from './Tab.scss';

const Tab = (props) => {
  let className = classes.tab;
  if (props.active) className += ` ${classes.active}`;

  return (
    <div className={className} onClick={props.onClick}>
      <span>{props.label}</span>
      <span />
    </div>
  );
};

Tab.propTypes = {
  active: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Tab;
