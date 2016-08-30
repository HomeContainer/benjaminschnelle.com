import React from 'react';
import classes from './Profile.scss';

const Profile = () => (
  <div className={classes.profile}>
    <img src="/images/me.png" alt="Ben" />
    <h1>Benjamin Schnelle</h1>
    <p>CPA gone software developer</p>
  </div>
);

export default Profile;
