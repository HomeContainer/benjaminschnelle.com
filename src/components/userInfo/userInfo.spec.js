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
});
