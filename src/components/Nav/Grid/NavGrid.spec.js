import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
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
});
