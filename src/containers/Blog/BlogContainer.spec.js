import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import sinon from 'sinon';
import { BlogContainer, stateToProps } from './BlogContainer';
import Blog from '../../components/Blog/Blog';
import uiService from '../../services/ui/uiService';

describe('BlogContainer', () => {
  describe('componentWillMount()', () => {
    it('calls props.getPosts', () => {
      const getPosts = sinon.stub();
      const screen = 'small';
      const setMenuColor = sinon.stub();
      shallow(<BlogContainer getPosts={getPosts} screen={screen} setMenuColor={setMenuColor} />);
      expect(getPosts).to.have.been.calledOnce;
    });
  });

  describe('render()', () => {
    it('renders a Blog component', () => {
      const getPosts = sinon.stub();
      const screen = 'small';
      const setMenuColor = sinon.stub();
      const wrapper = shallow(
        <BlogContainer getPosts={getPosts} screen={screen} setMenuColor={setMenuColor} />
      );
      expect(wrapper.type()).to.equal(Blog);
    });
  });

  describe('stateToProps()', () => {
    beforeEach(() => sinon.stub(uiService, 'getScreen'));
    afterEach(() => uiService.getScreen.restore());

    it('maps state.blog.fetchingPosts to props.fetchingPosts', () => {
      const state = {
        blog: fromJS({ fetchingPosts: true, posts: [] })
      };
      expect(stateToProps(state).fetchingPosts).to.equal(state.blog.get('fetchingPosts'));
    });

    it('maps state.blog.posts to props.posts', () => {
      const state = {
        blog: fromJS({ fetchingPosts: true, posts: [] })
      };
      expect(stateToProps(state).posts).to.equal(state.blog.get('posts'));
    });

    it('maps uiService.getScreen(state.ui) to props.screen', () => {
      const state = {
        blog: fromJS({ fetchingPosts: true, posts: [] }),
        ui: {}
      };
      const screen = 'large';
      uiService.getScreen.returns(screen);
      expect(stateToProps(state).screen).to.equal(screen);
    });
  });
});
