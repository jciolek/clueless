import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import {
  createAutoIdMiddleware,
  createValidatorMiddleware,
  createPersistentMiddleware,
} from './middleware';
import { getPersistedState } from './middleware/persistent';
import createUndoableEnhancer from './reducer-enhancers/undoable';
import saga from './saga';
import reducer from './reducer';
import validator from './validator';
import { types } from './actions';

let store = null;

function createStore() {
  const sagaMiddleware = createSagaMiddleware();
  const newStore = configureStore({
    reducer: createUndoableEnhancer({
      undoType: types.UNDOABLE.UNDO,
      redoType: types.UNDOABLE.REDO,
    })(reducer),
    middleware: [
      createAutoIdMiddleware(),
      createValidatorMiddleware(validator),
      createPersistentMiddleware(),
      sagaMiddleware,
    ],
    devTools: true,
    preloadedState: getPersistedState(),
  });

  sagaMiddleware.run(saga);

  return newStore;
}

function getStore() {
  if (!store) {
    store = createStore();
  }

  return store;
}

export { getStore, createStore };
export { default as actions } from './actions';
