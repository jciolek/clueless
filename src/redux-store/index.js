/* global window */
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import saga from './saga';
import reducer from './reducer';
import { createAutoIdMiddleware } from './middleware';

let store = null;

const reduxDevtoolsExtensionCompose = '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__';
const composeEnhancers =
  typeof window === 'object' &&
  window[reduxDevtoolsExtensionCompose] &&
  process.env.NODE_ENV === 'development'
    ? window[reduxDevtoolsExtensionCompose]
    : compose;

function createCustomStore() {
  const sagaMiddleware = createSagaMiddleware();
  const middlewareList = [createAutoIdMiddleware(), sagaMiddleware];
  const newStore = createStore(
    reducer,
    composeEnhancers(applyMiddleware(...middlewareList))
  );
  sagaMiddleware.run(saga);

  return newStore;
}

function getStore() {
  if (!store) {
    store = createCustomStore();
  }

  return store;
}

export { getStore, createCustomStore as createStore };
export { default as actions } from './actions';
