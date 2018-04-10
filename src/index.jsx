import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader';
import { getStore } from './redux-store';
import AppContainer from './app/app.container';

import '../scss/foundation.scss';
import '../scss/font-awesome.scss';

const store = getStore();
const HotAppContainer = hot(module)(AppContainer);

ReactDOM.render(
  <Provider store={store}>
    <HotAppContainer />
  </Provider>,
  document.getElementById('app')
);
