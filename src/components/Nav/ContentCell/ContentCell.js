import React, { PropTypes } from 'react';
import Cell from '../Cell/Cell';
import classes from './ContentCell.scss';

const ContentCell = (props) => {
  let className = classes.contentCell;
  if (props.className) className += ` ${props.className}`;
  if (props.clickable) className += ` ${classes.clickable}`;

  return <Cell className={className}>{props.children}</Cell>;
};

ContentCell.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  clickable: PropTypes.bool
};

export default ContentCell;
