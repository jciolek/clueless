import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader';
import { getStore } from './redux-store';
import App from './app/app.component';
import { Router } from './router';

import '../scss/foundation.scss';
import '../scss/font-awesome.scss';

const store = getStore();
const HotApp = hot(module)(App);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <HotApp />
    </Router>
  </Provider>,
  document.getElementById('app')
);
