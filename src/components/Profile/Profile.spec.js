import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Profile from './Profile';
import classes from './Profile.scss';

describe('Profile', () => {
  it('renders an image, h2, and a paragraph', () => {
    const wrapper = shallow(<Profile />);
    expect(wrapper.containsAllMatchingElements([
      <img src="/images/me.png" alt="Ben" />,
      <h1>Benjamin Schnelle</h1>,
      <p>CPA gone software developer</p>
    ])).to.be.true;
  });

  it('root element has a class of .profile', () => {
    const wrapper = shallow(<Profile />);
    expect(wrapper.find(`.${classes.profile}`)).to.have.length(1);
  });
});
