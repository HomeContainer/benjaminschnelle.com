import React, { Component, PropTypes } from 'react';
import Profile from '../Profile/Profile';
import TabbedDrawer from '../TabbedDrawer/TabbedDrawer';
import userInfo from '../userInfo/userInfo';
import classes from './Home.scss';

export class Home extends Component {
  static propTypes = {
    userInfo: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.tabs = [{ label: 'About', content: <Profile /> }];
  }

  render() {
    const { name, slogan } = this.props.userInfo;

    return (
      <div className={classes.wrapper}>
        <TabbedDrawer tabs={this.tabs} />

        <div className={classes.home}>
          <div className={classes.welcome}>
            <h1>{name}</h1>
            <h6>{slogan}</h6>
          </div>
        </div>
      </div>
    );
  }
}

export default userInfo(Home);
