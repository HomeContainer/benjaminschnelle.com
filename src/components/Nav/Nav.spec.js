import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import Nav from './Nav';
import NavList from './List/NavList';
import NavGrid from './Grid/NavGrid';
import classes from './Nav.scss';

describe('Nav', () => {
  it('renders a NavList when screen === "extraSmall"', () => {
    const screen = 'extraSmall';
    const wrapper = shallow(<Nav screen={screen} />);
    expect(wrapper.contains(<NavList />)).to.be.true;
  });

  it('renders a NavGrid otherwise', () => {
    const screen = 'small';
    const wrapper = shallow(<Nav screen={screen} />);
    expect(wrapper.contains(<NavGrid screen={screen} />)).to.be.true;
  });

  it('renders a nav element with a .nav class', () => {
    const wrapper = shallow(<Nav />);
    const foundElements = wrapper.find(`.${classes.nav}`);
    expect(foundElements).to.have.length(1);
    expect(foundElements.first().type()).to.equal('nav');
  });

  it('adds a .open class to the nav element when props.open is true', () => {
    const wrapper = shallow(<Nav />);
    expect(wrapper.find(`.${classes.open}`)).to.have.length(0);
    wrapper.setProps({ open: true });
    expect(wrapper.find(`.${classes.open}`)).to.have.length(1);
  });

  it('adds style.backgroundImage with props.image.urls.custom if props.image is passed', () => {
    const image = fromJS({ urls: { custom: '/images/myimage.png' } });
    const wrapper = shallow(<Nav image={image} />);
    const bgImg = wrapper.prop('style').backgroundImage;
    expect(bgImg).to.equal(`url(${image.getIn(['urls', 'custom'])})`);
  });
});
