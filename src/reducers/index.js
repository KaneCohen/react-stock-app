import types from '../constants';

const initialState = {
  fetchingSymbol: false,
  fetchingError: false,
  stockAction: false,
  cash: 100000,
  symbol: null,
  portfolio: [],
  error: null
};

function saveState(state) {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem('state', JSON.stringify(state));
  }
  return state;
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_STATE:
      return Object.assign({}, state, action.state, {fetchingSymbol: false});

    case types.STOCK_ACTION:
      return {...state, fetchingSymbol: true, fetchingError: false, stockAction: true};

    case types.SYMBOL_FETCHING:
      return {...state, fetchingSymbol: true};

    case types.SYMBOL_FETCHING_ERROR:
      return {...state, fetchingError: true, fetchingSymbol: false, symbol: null};

    case types.SET_SYMBOL: {
      return saveState({...state, symbol: action.symbol, fetchingSymbol: false, fetchingError: false});
    }
    case types.BUY_STOCK: {
      if (isNaN(action.quantity) ||
        action.quantity < 1 ||
        typeof action.symbol.askPrice === 'undefined' ||
        typeof action.symbol.bidPrice === 'undefined'
      ) {
        return saveState({...state, fetchingSymbol: false, stockAction: false});
      }

      let portfolio;
      let quantity = Math.min(action.quantity, action.symbol.volume);
      let symbol = {...action.symbol, quantity};
      const existing = state.portfolio.filter(stock => stock.symbol === symbol.symbol);

      if (existing.length) {
        symbol.quantity += existing[0].quantity;
        portfolio = state.portfolio.map(stock => {
          if (stock.symbol === symbol.symbol) {
            return symbol;
          } else {
            return stock;
          }
        });
      } else {
        portfolio = [...state.portfolio, symbol];
      }

      const cash = state.cash - (quantity * action.symbol.askPrice);

      if (cash < 0) {
        return saveState({...state, fetchingSymbol: false, stockAction: false});
      }

      return saveState({...state, portfolio, fetchingSymbol: false, stockAction: false, cash});
    }
    case types.SELL_STOCK: {
      if (isNaN(action.quantity) ||
        action.quantity < 1 ||
        typeof action.symbol.askPrice === 'undefined' ||
        typeof action.symbol.bidPrice === 'undefined'
      ) {
        return saveState({...state, fetchingSymbol: false, stockAction: false});
      }
      let portfolio;
      const existing = state.portfolio.filter(stock => stock.symbol === action.symbol.symbol);

      if (existing.length) {
        let symbol = {...existing[0]};
        let quantity = Math.min(action.quantity, symbol.quantity);
        symbol.quantity -= quantity;
        if (symbol.quantity === 0) {
          portfolio = state.portfolio.filter(stock => stock.symbol !== symbol.symbol);
        } else {
          portfolio = state.portfolio.map(stock => {
            if (stock.symbol === symbol.symbol) {
              return symbol;
            } else {
              return stock;
            }
          });
        }
        const cash = state.cash + (quantity * action.symbol.bidPrice);

        return saveState({...state, portfolio, fetchingSymbol: false, stockAction: false, cash});
      }
      return saveState({...state, fetchingSymbol: false, stockAction: false});
    }
    default:
      return state;
  }
}
