import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import Cell from '../Cell/Cell';
import ContentCell from '../ContentCell/ContentCell';
import { NavGrid } from './NavGrid';

const userInfo = { name: 'Rick', email: 'rick@world.com', phone: '1234567890' };

describe('NavGrid', () => {
  describe('screen is', () => {
    let wrapper;

    describe('small', () => {
      beforeEach(() => {
        wrapper = shallow(<NavGrid screen="small" userInfo={userInfo} />);
      });

      it('renders 4 ContentCells', () => {
        expect(wrapper.find(ContentCell)).to.have.length(4);
      });

      it('renders 4 Cells', () => {
        expect(wrapper.find(Cell)).to.have.length(4);
      });
    });

    describe('medium', () => {
      beforeEach(() => {
        wrapper = shallow(<NavGrid screen="medium" userInfo={userInfo} />);
      });

      it('renders 4 ContentCells', () => {
        expect(wrapper.find(ContentCell)).to.have.length(4);
      });

      it('renders 8 Cells', () => {
        expect(wrapper.find(Cell)).to.have.length(8);
      });
    });

    describe('other', () => {
      beforeEach(() => {
        wrapper = shallow(<NavGrid screen="large" userInfo={userInfo} />);
      });

      it('renders 4 ContentCells', () => {
        expect(wrapper.find(ContentCell)).to.have.length(4);
      });

      it('renders 12 Cells', () => {
        expect(wrapper.find(Cell)).to.have.length(12);
      });
    });
  });

  describe('ContentCells', () => {
    it('clicking home/blog links calls router.push with route and context.toggleMenu', () => {
      const router = { push: sinon.stub() };
      const context = { toggleMenu: sinon.stub() };
      const wrapper = shallow(<NavGrid router={router} userInfo={userInfo} />, { context });
      wrapper.find(ContentCell).forEach((cell) => {
        if (cell.prop('onClick')) cell.prop('onClick')();
      });
      expect(router.push).to.have.been.calledWith('/');
      expect(router.push).to.have.been.calledWith('/blog');
      expect(context.toggleMenu).to.have.been.calledTwice;
    });
  });
});
