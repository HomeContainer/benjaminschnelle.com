import React from 'react';
import IconButton from '../IconButton/IconButton';
import classes from './Footer.scss';

const Footer = () => (
  <div className={classes.footer}>
    <IconButton href="https://github.com/bschnelle" icon="github" />
  </div>
);

export default Footer;
