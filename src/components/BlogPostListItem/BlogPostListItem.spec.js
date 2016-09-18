import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { fromJS } from 'immutable';
import { shallow } from 'enzyme';
import BlogPostListItem from './BlogPostListItem';

describe('BlogPostListItem', () => {
  it('calls props.onClick when clicked', () => {
    const post = fromJS({ id: '1' });
    const onClick = sinon.stub();
    const wrapper = shallow(<BlogPostListItem onClick={onClick} post={post} />);
    wrapper.simulate('click');
    expect(onClick).to.have.been.calledOnce;
  });
});
