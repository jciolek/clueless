import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import App from '@/app/app.component';
import { getStore } from '@/redux-store';
import { Router } from '@/router';

import '../scss/foundation.scss';
import '../scss/font-awesome.scss';

const store = getStore();

ReactDOM.render(
  <ReduxProvider store={store}>
    <Router>
      <App />
    </Router>
  </ReduxProvider>,
  document.getElementById('app')
);
