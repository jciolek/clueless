import type { Reducer, AnyAction } from 'redux';
import type { Task } from 'redux-saga';

export type DispatchType = (action: AnyAction) => AnyAction;

export type MockStoreType<R extends Reducer = Reducer> = {
  dispatch: DispatchType;
  getState: () => ReturnType<R>;
};

export type SagaMockStoreType<R extends Reducer = Reducer> = MockStoreType & {
  output: Array<AnyAction>;
  runner: Task;
};
