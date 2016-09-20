import types from '../constants';
import fetch from 'isomorphic-fetch';

let fetchUrl = '/fetch?symbol=';
if (process.env.NODE_ENV === 'test') {
  fetchUrl = 'http://data.benzinga.com/rest/richquoteDelayed?symbols=';
}

export function setState(state) {
  return {
    type: types.SET_STATE,
    state
  };
}

export function findSymbol(input) {
  return (dispatch) => {
    fetch(fetchUrl + input)
      .then(response => {
        if (response.status >= 400) {
          dispatch({
            type: types.SYMBOL_FETCHING_ERROR
          });
        }
        return response.json();
      })
      .then(response => {
        const symbols = Object.keys(response);
        if (symbols.length) {
          if (typeof response.null !== 'undefined') {
            dispatch({
              type: types.SYMBOL_FETCHING_ERROR,
              error: response.null.error
            });
          } else {
            dispatch(setSymbol(response[symbols[0]]));
          }
        }
      });

    dispatch({
      type: types.SYMBOL_FETCHING
    });
  };
}

export function setSymbol(symbol) {
  return {
    type: types.SET_SYMBOL,
    symbol
  };
}

function stockAction(type, symbol, quantity) {
  return (dispatch) => {
    fetch(fetchUrl + symbol)
      .then(response => {
        if (response.status >= 400) {
          dispatch({
            type: types.SYMBOL_FETCHING_ERROR
          });
        }
        return response.json();
      })
      .then(response => {
        const symbols = Object.keys(response);
        if (symbols.length) {
          if (typeof response.null !== 'undefined') {
            dispatch({
              type: types.SYMBOL_FETCHING_ERROR,
              error: response.null.error
            });
          } else {
            dispatch({
              type,
              symbol: response[symbols[0]],
              quantity
            });
          }
        }
      });

    dispatch({
      type: types.SYMBOL_FETCHING
    });
  };
}

export function buyStock(symbol, quantity) {
  return stockAction(types.BUY_STOCK, symbol, quantity);
}

export function sellStock(symbol, quantity) {
  return stockAction(types.SELL_STOCK, symbol, quantity);
}
