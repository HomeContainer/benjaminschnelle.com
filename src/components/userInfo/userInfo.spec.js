import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import userInfo from './userInfo';

describe('[HOC] UserInfo', () => {
  it('wraps the passed component and passes a "userInfo" prop', () => {
    const Comp = () => <div />;
    Comp.propTypes = { userInfo: React.PropTypes.object };
    const WrappedComp = userInfo(Comp);
    const wrapper = shallow(<WrappedComp />);

    expect(wrapper.type()).to.equal(Comp);
    expect(wrapper.prop('userInfo')).to.exist;
  });

  it('passes any other props down to wrapped component as well', () => {
    const Comp = () => <div />;
    Comp.propTypes = { thing: React.PropTypes.string };
    const WrappedComp = userInfo(Comp);
    const thing = 'thing';
    const wrapper = shallow(<WrappedComp thing={thing} />);

    expect(wrapper.prop('thing')).to.equal(thing);
  });
});
