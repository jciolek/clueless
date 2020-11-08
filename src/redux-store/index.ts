import { configureStore } from '@reduxjs/toolkit';
import type { EnhancedStore } from '@reduxjs/toolkit';
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
import actions from './actions';
import type { UndoableStateType } from './reducer-enhancers/types';
import type { StateType } from './types';

type StoreType = EnhancedStore<UndoableStateType<StateType>>;

let store: StoreType;

function createStore(): StoreType {
  const sagaMiddleware = createSagaMiddleware();
  const newStore = configureStore({
    reducer: createUndoableEnhancer({
      undoType: actions.undoable.undo.type,
      redoType: actions.undoable.redo.type,
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

function getStore(): StoreType {
  if (!store) {
    store = createStore();
  }

  return store;
}

export { getStore, createStore };
export { default as actions } from './actions';
