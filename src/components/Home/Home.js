import React from 'react';
import Tab from '../Tab/Tab';
import classes from './Home.scss';

const Home = () => (
  <div>
    <div className={classes.home}>
      <div className={classes.welcome}>
        <h1>Benjamin Schnelle</h1>
        <h6>CPA gone SOFTWARE DEVELOPER</h6>
      </div>
      <div className={classes.tabs}>
        <Tab label="About me" />
        <Tab label="This site" />
      </div>
    </div>
  </div>
);

export default Home;
