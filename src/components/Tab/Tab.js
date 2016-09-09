import React, { PropTypes } from 'react';
import classes from './Tab.scss';

const Tab = (props) => (
  <div className={classes.tab} onClick={props.onClick}>
    <span>{props.label}</span>
    <span />
  </div>
);

Tab.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Tab;
