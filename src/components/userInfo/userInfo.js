import React from 'react';

const userInfo = {
  email: 'benjamin.schnelle@gmail.com',
  github: 'https://github.com/bschnelle',
  name: 'Benjamin Schnelle',
  phone: '618.303.6355',
  slogan: 'CPA gone SOFTWARE DEVELOPER'
};

const connectUserInfo = (WrappedComponent) => (props) =>
  <WrappedComponent userInfo={userInfo} {...props} />;

export default connectUserInfo;
