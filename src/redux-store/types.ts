import type { AnyAction } from 'redux';
import reducer from './reducer';

export type ReducerType = typeof reducer;

export type StateType = ReturnType<ReducerType>;

export type ErrorActionType<A = AnyAction> = A & {
  error: true;
  payload: Error;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ValidatorType<S = any, A = AnyAction> = (
  state: S,
  action: A
) => ErrorActionType | A;

export type ValidatorMapType<S> = {
  [actionType: string]: ValidatorType<S>;
};
