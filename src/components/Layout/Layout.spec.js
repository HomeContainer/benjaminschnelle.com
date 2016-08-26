import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Footer from '../Footer/Footer';
import Layout from './Layout';
import Nav from '../Nav/Nav';

describe('Layout', () => {
  it('renders a Nav, a Footer, and its children', () => {
    const child = <div>Some child</div>;
    const wrapper = shallow(<Layout>{child}</Layout>);
    expect(wrapper.containsAllMatchingElements([
      <div>
        <div>{child}</div>
        <Nav />
      </div>,
      <Footer />
    ])).to.be.true;
  });
});
