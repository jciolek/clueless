import type { Reducer } from 'redux';
import type { MockStoreType } from './types';

function createMockStore<R extends Reducer = Reducer>(
  reducer: R,
  initialState = undefined
): MockStoreType<R> {
  let state = reducer(initialState, { type: undefined });

  return {
    getState() {
      return state;
    },
    dispatch(action) {
      state = reducer(state, action);
      return action;
    },
  };
}

export default createMockStore;
