import type { Reducer, AnyAction } from 'redux';
import type { Task } from 'redux-saga';

export type DispatchType = (action: AnyAction) => AnyAction;

export type SagaMockStoreType<R extends Reducer = Reducer> = {
  dispatch: DispatchType;
  getState: () => ReturnType<R>;
  output: Array<AnyAction>;
  runner: Task;
};
