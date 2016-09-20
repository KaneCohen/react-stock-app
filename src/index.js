import React from 'react';
import RedBox from 'redbox-react';
import App from './containers/App';
import { render } from 'react-dom';
import configureStore from './store';
import { Provider } from 'react-redux';
import { setToken } from './actions/index';

const store = configureStore();
const root = document.getElementById('app');

if (process.env.NODE_ENV === 'development') {
  try {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
      root
    );
  } catch (e) {
    render(<RedBox error={e} />, root);
  }
} else {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    root
  );
}
