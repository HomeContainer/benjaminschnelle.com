import React from 'react';
import classes from './Profile.scss';

const Profile = () => (
  <div className={classes.profile}>
    <div>
      <h2>Hello.</h2>
      <p>
        Once upon a time I was a CPA, but now
        I'm a software developer and life is groovy.
      </p>
      <p>
        Right now, my focus is on React, Redux, Webpack, Node.js, and AWS.
      </p>
      <p>
        This site was created as a learning experience for myself and
        anyone who happens to end up here.  The plan is to over-engineer this
        web app and blog about my experiences doing so.
      </p>
      <p>Thanks for visiting!</p>
    </div>
  </div>
);

export default Profile;
