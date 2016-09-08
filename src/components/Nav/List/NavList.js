import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import IconButton from '../../IconButton/IconButton';
import userInfo from '../../userInfo/userInfo';
import classes from './NavList.scss';

const NavList = (props) => {
  const { email, github, name, phone } = props.userInfo;

  return (
    <div className={classes.navList}>
      <div className={classes.header}>
        <h2>{name}</h2>
      </div>

      <div className={classes.body}>
        <ul>
          <li><Link to="home">home.</Link></li>
          <li><Link to="blog">blog.</Link></li>
        </ul>
      </div>

      <div className={classes.footer}>
        <div className={classes.info}>
          <span>{phone}</span>
          <span>{email}</span>
        </div>
        <div className={classes.social}>
          <IconButton className={classes.github} href={github} icon="github" size="2x" />
        </div>
      </div>
    </div>
  );
};

NavList.propTypes = {
  userInfo: PropTypes.object.isRequired
};

export default userInfo(NavList);
