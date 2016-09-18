import React from 'react';
import { expect } from 'chai';
// import { fromJS } from 'immutable';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import Blog from './Blog';
import BlogPostList from '../BlogPostList/BlogPostList';
import Loader from '../Loader/Loader';
import classes from './Blog.scss';

describe('Blog', () => {
  describe('componentWillMount()', () => {
    it('calls this.props.setMenuColor', () => {
      const screen = 'small';
      const setMenuColor = sinon.stub();
      shallow(<Blog screen={screen} setMenuColor={setMenuColor} />);
      expect(setMenuColor).to.have.been.calledOnce;
    });
  });

  describe('componentWillReceiveProps()', () => {
    it('calls setMenuColor with nextProps.screen if props.screen !== nextProps.screen', () => {
      const screen = 'small';
      const setMenuColor = sinon.stub();
      const nextProps = { screen: 'medium' };
      const wrapper = shallow(<Blog screen={screen} setMenuColor={setMenuColor} />);
      const instance = wrapper.instance();
      instance.setMenuColor = sinon.stub();
      instance.componentWillReceiveProps(nextProps);

      expect(instance.setMenuColor).to.have.been.calledWith(nextProps.screen);
    });
  });

  describe('componentWillUnmount()', () => {
    it('calls setMenuColor with false', () => {
      const screen = 'small';
      const setMenuColor = sinon.stub();
      const wrapper = shallow(<Blog screen={screen} setMenuColor={setMenuColor} />);
      const instance = wrapper.instance();
      instance.setMenuColor = sinon.stub();
      instance.componentWillUnmount();

      expect(instance.setMenuColor).to.have.been.calledWith(false);
    });
  });

  describe('setMenuColor()', () => {
    describe('screen argument is one of extraSmall, small, or medium', () => {
      it('calls props.setMenuColor with true', () => {
        const screen = 'small';
        const setMenuColor = sinon.stub();
        const wrapper = shallow(<Blog screen={screen} setMenuColor={setMenuColor} />);
        const instance = wrapper.instance();
        instance.setMenuColor('extraSmall');
        instance.setMenuColor('medium');

        expect(setMenuColor.withArgs(true)).to.have.been.calledThrice;
      });
    });

    describe('screen argument is something else', () => {
      it('calls props.setMenuColor with false', () => {
        const screen = 'large';
        const setMenuColor = sinon.stub();
        shallow(<Blog screen={screen} setMenuColor={setMenuColor} />);

        expect(setMenuColor).to.have.been.calledWith(false);
      });
    });
  });

  describe('render()', () => {
    it('renders a root div with a .wrapper class', () => {
      const screen = 'small';
      const setMenuColor = sinon.stub();
      const wrapper = shallow(<Blog screen={screen} setMenuColor={setMenuColor} />);
      expect(wrapper.type()).to.equal('div');
      expect(wrapper.is(`.${classes.wrapper}`)).to.be.true;
    });

    it('renders props.children, if defined', () => {
      const screen = 'small';
      const setMenuColor = sinon.stub();
      const child = <div>child</div>;
      const wrapper = shallow(<Blog screen={screen} setMenuColor={setMenuColor}>{child}</Blog>);
      expect(wrapper.contains(child)).to.be.true;
    });

    it('renders a loader if props.children is undefined and props.fetchingPosts is true', () => {
      const screen = 'small';
      const setMenuColor = sinon.stub();
      const wrapper = shallow(<Blog fetchingPosts screen={screen} setMenuColor={setMenuColor} />);
      expect(wrapper.contains(<Loader />)).to.be.true;
    });

    it('renders a BlogPostList otherwise', () => {
      const posts = [];
      const screen = 'small';
      const setMenuColor = sinon.stub();
      const wrapper = shallow(<Blog posts={posts} screen={screen} setMenuColor={setMenuColor} />);
      expect(wrapper.contains(<BlogPostList posts={posts} />)).to.be.true;
    });
  });
});
