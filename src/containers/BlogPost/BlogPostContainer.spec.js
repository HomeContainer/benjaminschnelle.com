import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import sinon from 'sinon';
import { BlogPostContainer, stateToProps } from './BlogPostContainer';
import BlogPost from '../../components/BlogPost/BlogPost';
import Loader from '../../components/Loader/Loader';
import blogService from '../../services/blog/blogService';

describe('BlogPostContainer', () => {
  const params = { slug: 'slug' };

  describe('componentWillMount()', () => {
    it('calls props.getPost with props.params.slug if props.post is undefined', () => {
      const getPost = sinon.stub();
      shallow(<BlogPostContainer getPost={getPost} params={params} />);
      expect(getPost).to.have.been.calledWith(params.slug);
    });

    it('calls props.getPost if props.post.content is undefined', () => {
      const getPost = sinon.stub();
      const post = fromJS({ id: '1' });
      shallow(<BlogPostContainer getPost={getPost} params={params} post={post} />);
      expect(getPost).to.have.been.calledWith(params.slug);
    });
  });

  describe('render()', () => {
    it('renders a BlogPost component if props.post && !props.fetchingPost', () => {
      const getPost = sinon.stub();
      const post = fromJS({});
      const wrapper = shallow(
        <BlogPostContainer getPost={getPost} params={params} post={post} />
      );
      expect(wrapper.type()).to.equal(BlogPost);
    });

    it('renders a Loader if !props.post', () => {
      const getPost = sinon.stub();
      const wrapper = shallow(
        <BlogPostContainer params={params} getPost={getPost} />
      );
      expect(wrapper.type()).to.equal(Loader);
    });

    it('renders a Loader if props.fetchingPost is true', () => {
      const getPost = sinon.stub();
      const post = fromJS({});
      const wrapper = shallow(
        <BlogPostContainer params={params} post={post} fetchingPost getPost={getPost} />
      );
      expect(wrapper.type()).to.equal(Loader);
    });
  });

  describe('stateToProps()', () => {
    beforeEach(() => sinon.stub(blogService, 'selectPost'));
    afterEach(() => blogService.selectPost.restore());

    it('maps state.blog.fetchingPost to props.fetchingPosts', () => {
      const state = {
        blog: fromJS({ fetchingPost: true })
      };
      const props = { params: { slug: 'slug' } };
      expect(stateToProps(state, props).fetchingPost).to.equal(state.blog.get('fetchingPost'));
    });

    it('maps blogService.selectPost(state.blog, props.params.slug) to props.post', () => {
      const post = {};
      blogService.selectPost.returns(post);
      const state = { blog: fromJS({}) };
      const props = { params: { slug: 'slug' } };
      expect(stateToProps(state, props).post).to.equal(post);
    });
  });
});
