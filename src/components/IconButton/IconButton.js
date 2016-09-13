import React, { PropTypes } from 'react';
import classes from './IconButton.scss';

const IconButton = (props) => {
  const { className, href, icon, onClick, size } = props;
  let wrapperClassName = `${classes.link} ${className || ''}`;
  let iconClassName = `fa fa-${icon}`;
  if (size) iconClassName += ` fa-${size}`;
  const iconElement = <span className={iconClassName} />;

  if (props.href) {
    return <a className={wrapperClassName} href={href}>{iconElement}</a>;
  }
  return <button className={wrapperClassName} onClick={onClick}>{iconElement}</button>;
};

IconButton.propTypes = {
  className: PropTypes.string,
  href: PropTypes.string,
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  size: PropTypes.string
};

export default IconButton;
