import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import Tab from '../Tab/Tab';
import TabbedDrawer from './TabbedDrawer';

describe('TabbedDrawer', () => {
  let tabs;

  beforeEach(() => {
    tabs = [
      { label: 'Tab 1' },
      { label: 'Tab 2' }
    ];
  });

  describe('constructor()', () => {
    it('initializing state.open to false', () => {
      const wrapper = shallow(<TabbedDrawer tabs={tabs} />);
      expect(wrapper.state('open')).to.be.false;
    });

    it('sets this.tabs', () => {
      const wrapper = shallow(<TabbedDrawer tabs={tabs} />);
      expect(wrapper.instance().tabs).to.be.truthy;
    });
  });

  describe('componentWillReceiveProps()', () => {
    it('sets this.tabs to the return value of this.mapsTabs(nextProps.tabs)', () => {
      const wrapper = shallow(<TabbedDrawer tabs={tabs} />);
      const instance = wrapper.instance();
      instance.mapTabs = sinon.stub().withArgs(tabs).returns(tabs);
      instance.componentWillReceiveProps({ tabs });
      expect(instance.tabs).to.equal(tabs);
    });
  });

  describe('onTabClick()', () => {
    it('returns a function', () => {
      const wrapper = shallow(<TabbedDrawer tabs={tabs} />);
      expect(typeof wrapper.instance().onTabClick).to.equal('function');
    });

    describe('return function', () => {
      describe('this.state.open is true and this.state.activeTab = tab argument', () => {
        it('it sets state.activeTab to tab argument and state.open to false', () => {
          const wrapper = shallow(<TabbedDrawer tabs={tabs} />);
          wrapper.setState({ activeTab: tabs[0], open: true });
          wrapper.instance().onTabClick(tabs[0])();
          expect(wrapper.state('activeTab')).to.equal(tabs[0]);
          expect(wrapper.state('open')).to.be.false;
        });
      });

      describe('else', () => {
        it('it sets state.activeTab to tab argument and state.open to true', () => {
          const wrapper = shallow(<TabbedDrawer tabs={tabs} />);
          wrapper.instance().onTabClick(tabs[0])();
          expect(wrapper.state('activeTab')).to.equal(tabs[0]);
          expect(wrapper.state('open')).to.be.true;
        });
      });
    });
  });

  describe('closeDrawer()', () => {
    it('sets state.open to false', () => {
      const wrapper = shallow(<TabbedDrawer tabs={tabs} />);
      wrapper.setState({ open: true });
      wrapper.instance().closeDrawer();
      expect(wrapper.state('open')).to.be.false;
    });
  });

  describe('mapTabs()', () => {
    it('adds an onClick prop to each tab item by calling this.onTabClick(tab)', () => {
      const wrapper = shallow(<TabbedDrawer tabs={tabs} />);
      const instance = wrapper.instance();
      const onClick = sinon.stub();
      instance.onTabClick = () => onClick;
      const mappedTabs = instance.mapTabs(tabs);
      mappedTabs.forEach((tab) => {
        expect(tab.onClick).to.equal(onClick);
      });
    });
  });

  describe('render()', () => {
    it('renders a Tab component for each object in props.tabs', () => {
      const wrapper = shallow(<TabbedDrawer tabs={tabs} />);
      expect(wrapper.find(Tab)).to.have.length(2);
    });
  });
});
