import React, { PropTypes } from 'react';
import classes from './Cell.scss';

const Cell = (props, context) => {
  let className = classes.cell;
  if (props.className) className += ` ${props.className}`;
  if (context.navOpen) className += ` ${classes.open}`;

  return <div className={className} onClick={props.onClick}><div>{props.children}</div></div>;
};

Cell.contextTypes = {
  navOpen: PropTypes.bool
};

Cell.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func
};

export default Cell;
