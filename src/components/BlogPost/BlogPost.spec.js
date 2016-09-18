import React from 'react';
import { expect } from 'chai';
import { fromJS } from 'immutable';
import { shallow } from 'enzyme';
import BlogPost from './BlogPost';
import classes from './BlogPost.scss';

describe('BlogPost', () => {
  it('renders a root div with a .blogPost class', () => {
    const post = fromJS({ title: 'Title' });
    const wrapper = shallow(<BlogPost post={post} />);
    expect(wrapper.type()).to.equal('div');
    expect(wrapper.is(`.${classes.blogPost}`)).to.be.true;
  });

  it('renders an h1 with props.post.title', () => {
    const post = fromJS({ title: 'Title' });
    const wrapper = shallow(<BlogPost post={post} />);
    expect(wrapper.contains(<h1>{post.get('title')}</h1>)).to.be.true;
  });

  describe('body div', () => {
    it('renders has a .markdown-body class', () => {
      const post = fromJS({ title: 'Title' });
      const wrapper = shallow(<BlogPost post={post} />);
      expect(wrapper.find('.markdown-body')).to.have.length(1);
    });

    it('has prop.dangerouslySetInnerHTML set to props.post.content', () => {
      const post = fromJS({ content: 'this is my content', title: 'Title' });
      const wrapper = shallow(<BlogPost post={post} />);
      // eslint-disable-next-line
      const html = wrapper.find('.markdown-body').prop('dangerouslySetInnerHTML').__html;
      expect(html).to.equal(post.get('content'));
    });
  });
});
