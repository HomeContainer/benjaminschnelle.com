import React, { PropTypes } from 'react';
import Footer from '../Footer/Footer';
import Nav from '../Nav/Nav';
import classes from './Layout.scss';

const Layout = (props) => (
  <div className={classes.layout}>
    <div>
      <div>{props.children}</div>
      <Nav />
    </div>
    <Footer />
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
