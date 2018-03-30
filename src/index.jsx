import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { getStore } from './redux-store';
import AppContainer from './app/app.container';

import '../scss/foundation.scss';
import '../scss/font-awesome.scss';

const store = getStore();

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('app')
);
