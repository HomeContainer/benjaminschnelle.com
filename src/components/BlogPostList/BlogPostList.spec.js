import React from 'react';
import { expect } from 'chai';
import { fromJS } from 'immutable';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { BlogPostList } from './BlogPostList';
import BlogPostListItem from '../BlogPostListItem/BlogPostListItem';
import classes from './BlogPostList.scss';

describe('BlogPostList', () => {
  it('renders a root div with a .blogPostList class', () => {
    const posts = fromJS([{ id: '0' }]);
    const router = {};
    const wrapper = shallow(<BlogPostList posts={posts} router={router} />);
    expect(wrapper.type()).to.equal('div');
    expect(wrapper.is(`.${classes.blogPostList}`)).to.be.true;
  });

  it('renders an h1 and a BlogPostListItem component for every props.posts item', () => {
    const posts = fromJS([{ id: '0' }, { id: '1' }]);
    const router = {};
    const wrapper = shallow(<BlogPostList posts={posts} router={router} />);
    expect(wrapper.contains(<h1>Blog.</h1>)).to.be.true;
    expect(wrapper.find(BlogPostListItem)).to.have.length(2);
  });

  it('sorts props.posts by date in descending order', () => {
    const posts = fromJS([
      { id: '0', date: new Date(2016, 1, 2) },
      { id: '1', date: new Date(2016, 1, 3) },
      { id: '2', date: new Date(2016, 1, 1) }
    ]);
    const router = {};
    const wrapper = shallow(<BlogPostList posts={posts} router={router} />);
    expect(wrapper.find(BlogPostListItem).first().prop('post').get('id')).to.equal('1');
  });

  it('clicking a BlogPostListItem calls props.router.push with /blog/:post_slug', () => {
    const posts = fromJS([{ id: '0', slug: 'test-post' }]);
    const router = { push: sinon.stub() };
    const wrapper = shallow(<BlogPostList posts={posts} router={router} />);
    wrapper.find(BlogPostListItem).simulate('click');
    expect(router.push).to.have.been.calledWith(`/blog/${posts.getIn(['0', 'slug'])}`);
  });
});
