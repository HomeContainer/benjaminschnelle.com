import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Home } from './Home';
import TabbedDrawer from '../TabbedDrawer/TabbedDrawer';

describe('Home', () => {
  it('renders a TabbedDrawer', () => {
    const userInfo = { name: 'Doge', slogan: 'So wow' };
    const wrapper = shallow(<Home userInfo={userInfo} />);
    expect(wrapper.find(TabbedDrawer)).to.have.length(1);
  });
});
