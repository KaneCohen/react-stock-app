import chai from 'chai';
import React from 'react';
import jsdom from 'mocha-jsdom';
import { createStore } from 'redux';
import ReactTestUtils from 'react-addons-test-utils';

import reducers from '../../src/reducers';
import StockExchange from '../../src/components/StockExchange';

const expect = chai.expect;
const store = createStore(reducers);

describe('Editor Component', () => {

  jsdom();

  let getRenderer, getProps;

  before(() => {
    getRenderer = () => {
      return ReactTestUtils.createRenderer();
    };
    getProps = () => {
      return {
        state: {toolbar: store.getState()},
        actions: {}
      };
    };
  });

  it('should be available', () => {
    expect(StockExchange)
      .to.be.a('function');
  });
});
