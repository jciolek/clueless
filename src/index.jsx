import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { hot } from 'react-hot-loader';
import { getStore } from './redux-store';
import App from './app/app.component';
import { Router } from './router';

import '../scss/foundation.scss';
import '../scss/font-awesome.scss';

const store = getStore();
const HotApp = hot(module)(App);

ReactDOM.render(
  <ReduxProvider store={store}>
    <Router>
      <HotApp />
    </Router>
  </ReduxProvider>,
  document.getElementById('app')
);
