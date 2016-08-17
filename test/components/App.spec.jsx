import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Link } from 'react-router';
import App from '../../src/components/App';

describe('App', () => {
  it('contains a Link to "/blog"', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.contains(<Link to="/blog">Go to Blog</Link>)).to.be.true;
  });
});
