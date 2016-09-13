import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import HomeContainer from './HomeContainer';
import Home from '../../components/Home/Home';

describe('HomeContainer', () => {
  it('renders a Home component', () => {
    const wrapper = shallow(<HomeContainer />);
    expect(wrapper.type()).to.equal(Home);
  });
});
