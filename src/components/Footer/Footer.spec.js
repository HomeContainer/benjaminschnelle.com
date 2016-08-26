import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Footer from './Footer';
import IconButton from '../IconButton/IconButton';
import classes from './Footer.scss';

describe('Footer', () => {
  it('renders an IconButton to GitHub', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.contains(
      <IconButton href="https://github.com/bschnelle" icon="github" />
    )).to.be.true;
  });

  it('has a .footer class applied', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.is(`.${classes.footer}`)).to.be.true;
  });
});
