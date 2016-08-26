import React, { PropTypes } from 'react';

const IconButton = (props) => {
  const { className, href, icon, onClick } = props;
  const iconElement = <span className={`fa fa-${icon}`} />;

  if (props.href) {
    return <a className={className} href={href}>{iconElement}</a>;
  }
  return <button className={className} onClick={onClick}>{iconElement}</button>;
};

IconButton.propTypes = {
  className: PropTypes.string,
  href: PropTypes.string,
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

export default IconButton;
