import { runSaga, Saga, stdChannel } from 'redux-saga';
import type { Reducer, AnyAction } from 'redux';
import type { SagaMockStoreType } from './types';

function createSagaMockStore<R extends Reducer = Reducer>(
  reducer: R,
  saga: Saga,
  initialState?: ReturnType<R>
): SagaMockStoreType<R> {
  let state = reducer(initialState, { type: undefined });
  const output: Array<AnyAction> = [];
  const channel = stdChannel();
  const getState = () => state;
  const runner = runSaga(
    {
      channel,
      dispatch(action: AnyAction) {
        output.push(action);
      },
      getState,
    },
    saga
  );

  return {
    dispatch(action) {
      state = reducer(state, action);
      channel.put(action);
      return action;
    },
    getState,
    output,
    runner,
  };
}

export default createSagaMockStore;
