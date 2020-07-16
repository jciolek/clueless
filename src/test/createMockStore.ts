import { Reducer, AnyAction } from 'redux';
import { MockStoreType } from './types';

function createMockStore<R extends Reducer = Reducer>(
  reducer: R,
  initialState = undefined
): MockStoreType<R> {
  let state = reducer(initialState, { type: undefined });

  return {
    getState() {
      return state;
    },
    dispatch(action: AnyAction) {
      state = reducer(state, action);
      return action;
    },
  };
}

export default createMockStore;
