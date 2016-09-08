import React from 'react';

const userInfo = {
  email: 'benjamin.schnelle@gmail.com',
  name: 'Benjamin Schnelle',
  phone: '618.303.6355'
};

const connectUserInfo = (WrappedComponent) => () => <WrappedComponent userInfo={userInfo} />;

export default connectUserInfo;
