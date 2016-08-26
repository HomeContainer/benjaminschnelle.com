import React, { PropTypes } from 'react';

const IconButton = (props) => {
  const { className, href, icon, onClick, size } = props;
  let iconClassName = `fa fa-${icon}`;
  if (size) iconClassName += ` fa-${size}`;
  const iconElement = <span className={iconClassName} />;

  if (props.href) {
    return <a className={className} href={href}>{iconElement}</a>;
  }
  return <button className={className} onClick={onClick}>{iconElement}</button>;
};

IconButton.propTypes = {
  className: PropTypes.string,
  href: PropTypes.string,
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  size: PropTypes.string
};

export default IconButton;
