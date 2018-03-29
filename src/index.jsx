import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { getStore } from './redux-store';
import App from './app/app.component';

import '../scss/foundation.scss';
import '../scss/font-awesome.scss';

const store = getStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
