import React, { PropTypes } from 'react';
import Tab from '../Tab/Tab';
import userInfo from '../userInfo/userInfo';
import classes from './Home.scss';

const Home = (props) => (
  <div>
    <div className={classes.home}>
      <div className={classes.welcome}>
        <h1>{props.userInfo.name}</h1>
        <h6>{props.userInfo.slogan}</h6>
      </div>
      <div className={classes.tabs}>
        <Tab label="About me" onClick={() => console.log('.....')} />
        <Tab label="This site" onClick={() => console.log('.....')} />
      </div>
    </div>
  </div>
);

Home.propTypes = {
  userInfo: PropTypes.object.isRequired
};

export default userInfo(Home);
