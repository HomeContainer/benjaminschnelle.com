import React, { PropTypes } from 'react';
import classes from './Layout.scss';

const Layout = (props) => (
  <div className={classes.layout}>
    <div>
      <h1>React Starter Kit</h1>
      {props.children}
    </div>
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
