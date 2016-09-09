import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Tab from '../Tab/Tab';
import TabbedDrawer from './TabbedDrawer';

describe('TabbedDrawer', () => {
  it('renders a Tab component for each object in props.tabs', () => {
    const tabs = [
      { label: 'Tab 1' },
      { label: 'Tab 2' }
    ];
    const wrapper = shallow(<TabbedDrawer tabs={tabs} />);
    expect(wrapper.find(Tab)).to.have.length(2);
  });
});
