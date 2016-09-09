import React, { PropTypes } from 'react';
import classes from './Tab.scss';

const Tab = (props) => (
  <div className={classes.tab}>
    <span>{props.label}</span>
    <span />
  </div>
);

Tab.propTypes = {
  label: PropTypes.string.isRequired
};

export default Tab;
