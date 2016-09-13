import React, { PropTypes } from 'react';
import Cell from '../Cell/Cell';
import classes from './ContentCell.scss';

const ContentCell = (props) => {
  let className = classes.contentCell;
  if (props.className) className += ` ${props.className}`;
  if (props.onClick) className += ` ${classes.clickable}`;

  return <Cell className={className} onClick={props.onClick}>{props.children}</Cell>;
};

ContentCell.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func
};

export default ContentCell;
