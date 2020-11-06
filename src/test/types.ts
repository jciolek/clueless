import type { Reducer, AnyAction, Dispatch } from 'redux';
import type { Task } from 'redux-saga';

export type MockStoreType<R extends Reducer = Reducer> = {
  dispatch: Dispatch;
  getState: () => ReturnType<R>;
};

export type SagaMockStoreType<R extends Reducer = Reducer> = MockStoreType<
  R
> & {
  output: Array<AnyAction>;
  runner: Task;
};
