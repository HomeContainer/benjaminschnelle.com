import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Profile from './Profile';
import classes from './Profile.scss';

describe('Profile', () => {
  it('renders an h2 and 4 paragraphs', () => {
    const wrapper = shallow(<Profile />);
    expect(wrapper.find('h2')).to.have.length(1);
    expect(wrapper.find('p')).to.have.length(4);
  });

  it('root element has a class of .profile', () => {
    const wrapper = shallow(<Profile />);
    expect(wrapper.find(`.${classes.profile}`)).to.have.length(1);
  });
});
