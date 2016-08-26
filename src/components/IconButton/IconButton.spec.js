import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import IconButton from './IconButton';

const HREF = 'https://github.com';
const ICON = 'github';

describe('IconButton', () => {
  it('renders an anchor when props.href is set', () => {
    const wrapper = shallow(<IconButton href={HREF} icon="github" />);
    expect(wrapper.type()).to.equal('a');
    expect(wrapper.find({ href: HREF })).to.have.length(1);
  });

  it('renders a button otherwise', () => {
    const wrapper = shallow(<IconButton icon="github" />);
    expect(wrapper.type()).to.equal('button');
  });

  it('passes props.className down to the root element', () => {
    const className = 'myButton';
    const wrapper = shallow(<IconButton className={className} icon="github" />);
    const foundElements = wrapper.find({ className });
    expect(foundElements).to.have.length(1);
    expect(foundElements.first().type()).to.equal('button');
  });

  it('renders a nested span element using "props.icon" to determine className', () => {
    const wrapper = shallow(<IconButton icon={ICON} />);
    expect(wrapper.contains(<span className={`fa fa-${ICON}`} />)).to.be.true;
  });

  it('if props.size is set sizing class is added to span', () => {
    const wrapper = shallow(<IconButton icon={ICON} size="2x" />);
    expect(wrapper.find('.fa-2x')).to.have.length(1);
  });

  it('if props.onClick is set and props.href is not, clicking the button calls onClick', () => {
    const onClick = sinon.stub();
    const wrapper = shallow(<IconButton icon="github" onClick={onClick} />);
    wrapper.simulate('click');
    expect(onClick).to.have.been.calledOnce;
  });
});
