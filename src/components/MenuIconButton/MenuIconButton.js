import React, { PropTypes } from 'react';
import classes from './MenuIconButton.scss';

const MenuIconButton = (props) => {
  let className = classes.menu;
  if (props.className) className += ` ${props.className}`;
  if (props.invertColor && !props.open) className += ` ${classes.invertColor}`;
  if (props.open) className += ` ${classes.open}`;

  return (
    <button className={className} onClick={props.onClick}>
      <span />
      <span />
      <span />
    </button>
  );
};

MenuIconButton.propTypes = {
  className: PropTypes.string,
  invertColor: PropTypes.bool,
  onClick: PropTypes.func,
  open: PropTypes.bool
};

export default MenuIconButton;
