import React from 'react';
import { expect } from 'chai';
import { fromJS } from 'immutable';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { BlogPostList } from './BlogPostList';
import Post from '../Post/Post';
import classes from './BlogPostList.scss';

describe('BlogPostList', () => {
  it('renders a root div with a .blogPostList class', () => {
    const posts = fromJS([{ id: '0' }]);
    const router = {};
    const wrapper = shallow(<BlogPostList posts={posts} router={router} />);
    expect(wrapper.type()).to.equal('div');
    expect(wrapper.is(`.${classes.blogPostList}`)).to.be.true;
  });

  it('renders an h1 and a Post component for every props.posts item', () => {
    const posts = fromJS([{ id: '0' }, { id: '1' }]);
    const router = {};
    const wrapper = shallow(<BlogPostList posts={posts} router={router} />);
    expect(wrapper.contains(<h1>Blog.</h1>)).to.be.true;
    expect(wrapper.find(Post)).to.have.length(2);
  });

  it('clicking a Post calls props.router.push with /blog/:post_slug', () => {
    const posts = fromJS([{ id: '0', slug: 'test-post' }]);
    const router = { push: sinon.stub() };
    const wrapper = shallow(<BlogPostList posts={posts} router={router} />);
    wrapper.find(Post).simulate('click');
    expect(router.push).to.have.been.calledWith(`/blog/${posts.getIn(['0', 'slug'])}`);
  });
});
