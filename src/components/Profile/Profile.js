import React from 'react';
import classes from './Profile.scss';

const Profile = () => (
  <div className={classes.profile}>
    <img src="/images/me.png" alt="Ben" />
    <h2>Hi! I'm Ben.</h2>
    <p>
      Once upon a time I was a CPA, but now
      I'm a software developer and life is groovy.
    </p>
    <p>
      My focus is on the JavaScript ecosystem -
      primarily React, Redux, Webpack, Node.js, and
      AWS.
    </p>
    <p>
      I created this site as a learning experience for myself and
      anyone who happens to end up here.  The plan is to learn stuff,
      then blog about it.
    </p>
    <p>Thanks for visiting!</p>
  </div>
);

export default Profile;
