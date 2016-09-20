import chai from 'chai';
import { createStore } from 'redux';
import actions from '../../src/actions';
import types from '../../src/constants';
import reducers from '../../src/reducers';
import configureStore from '../../src/store';

const expect = chai.expect;

describe('Stock Reducer', () => {

  let store;

  before(() => {
    store = createStore(reducers);
  });

  it('should be instantiated', () => {
    const state = store.getState();

    expect(state)
      .to.be.an('object');
  });

  it('should have initial state set', () => {
    const state = store.getState();

    expect(state)
      .to.be.an('object');

    expect(state.cash)
      .to.be.equal(100000);
  });

  it('should set state from external source', () => {
    const action = actions.setState({cash: 20});
    store.dispatch(action);
    const state = store.getState();

    expect(state.cash)
      .to.be.equal(20);
  });

  it('should find stock set via input', (done) => {
    store = configureStore();

    store.subscribe(() => {
      const state = store.getState();

      if (state.fetchingSymbol === false) {
        expect(state.symbol)
          .to.be.an('object');

        expect(state.symbol.symbol)
          .to.be.equal('AAPL');

        expect(state.symbol.name)
          .to.be.equal('Apple');

        done();
      }
    });

    const action = actions.findSymbol('AAPL');
    store.dispatch(action);
  });

  it('should add stock into portfolio', (done) => {
    store = configureStore();

    store.subscribe(() => {
      const state = store.getState();

      if (state.fetchingSymbol === false) {
        expect(state.portfolio.length)
          .to.be.equal(1);

        expect(state.portfolio[0].symbol)
          .to.be.equal('AAPL');

        expect(state.portfolio[0].quantity)
          .to.be.equal(100);

        expect(state.cash)
          .to.be.lt(100000);

        done();
      }
    });

    const action = actions.buyStock('AAPL', 100);
    store.dispatch(action);
  });

  it('should update stock in portfolio on buy', (done) => {
    store = configureStore();
    let action = actions.setState({portfolio: [{
      symbol: 'AAPL',
      quantity: 100,
      bidPrice: 15
    }]});
    store.dispatch(action);

    store.subscribe(() => {
      const state = store.getState();

      if (state.fetchingSymbol === false) {
        expect(state.portfolio.length)
          .to.be.equal(1);

        expect(state.portfolio[0].symbol)
          .to.be.equal('AAPL');

        expect(state.portfolio[0].quantity)
          .to.be.equal(200);

        expect(state.cash)
          .to.be.lt(100000);

        done();
      }
    });

    action = actions.buyStock('AAPL', 100);
    store.dispatch(action);
  });

  it('should sell stock from portfolio', (done) => {
    store = configureStore();
    let action = actions.setState({portfolio: [{
      symbol: 'AAPL',
      quantity: 100,
      bidPrice: 15
    }]});
    store.dispatch(action);

    store.subscribe(() => {
      const state = store.getState();

      if (state.fetchingSymbol === false) {
        expect(state.portfolio.length)
          .to.be.equal(1);

        expect(state.portfolio[0].symbol)
          .to.be.equal('AAPL');

        expect(state.portfolio[0].quantity)
          .to.be.equal(90);

        expect(state.cash)
          .to.be.gt(100000);

        done();
      }
    });

    action = actions.sellStock('AAPL', 10);
    store.dispatch(action);
  });

  it('should not sell missing stock from portfolio', (done) => {
    store = configureStore();
    let action = actions.setState({portfolio: [{
      symbol: 'AAPL',
      quantity: 100,
      bidPrice: 15
    }]});
    store.dispatch(action);

    store.subscribe(() => {
      const state = store.getState();

      if (state.fetchingSymbol === false) {
        expect(state.portfolio.length)
          .to.be.equal(1);

        expect(state.portfolio[0].symbol)
          .to.be.equal('AAPL');

        expect(state.cash)
          .to.be.equal(100000);

        done();
      }
    });

    action = actions.sellStock('F', 10);
    store.dispatch(action);
  });


  it('should remove sold stock from portfolio', (done) => {
    store = configureStore();
    let action = actions.setState({portfolio: [{
      symbol: 'AAPL',
      quantity: 100,
      bidPrice: 15
    }]});
    store.dispatch(action);

    store.subscribe(() => {
      const state = store.getState();

      if (state.fetchingSymbol === false) {
        expect(state.portfolio.length)
          .to.be.equal(0);

        expect(state.cash)
          .to.be.gt(100000);

        done();
      }
    });

    action = actions.sellStock('AAPL', 100);
    store.dispatch(action);
  });
});
