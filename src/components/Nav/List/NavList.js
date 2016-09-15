import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import IconButton from '../../IconButton/IconButton';
import userInfo from '../../userInfo/userInfo';
import classes from './NavList.scss';

/**
 * Nav component for mobile
 */
export const NavList = (props, context) => {
  const { email, github, name } = props.userInfo;
  let bodyClassName = classes.body;
  if (context.navOpen) bodyClassName += ` ${classes.open}`;

  return (
    <div className={classes.navList}>
      <div className={classes.header}>
        <h2>{name}</h2>
      </div>

      <div className={bodyClassName}>
        <ul>
          <li><Link onClick={context.toggleMenu} to="/">home.</Link></li>
          <li><Link onClick={context.toggleMenu} to="/blog">blog.</Link></li>
        </ul>
      </div>

      <div className={classes.footer}>
        <div className={classes.info}>
          <span>{email}</span>
        </div>
        <div className={classes.social}>
          <IconButton className={classes.github} href={github} icon="github" size="2x" />
        </div>
      </div>
    </div>
  );
};

NavList.contextTypes = {
  navOpen: PropTypes.bool,
  toggleMenu: PropTypes.func.isRequired
};

NavList.propTypes = {
  userInfo: PropTypes.object.isRequired
};

export default userInfo(NavList);
