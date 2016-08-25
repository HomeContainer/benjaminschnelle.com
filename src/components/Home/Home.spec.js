import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Link } from 'react-router';
import Home from './Home';

describe('Home', () => {
  it('renders a Link with "Go to Counter!"', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper.contains(<Link to="/counter">Go to Counter!</Link>)).to.be.true;
  });
});
