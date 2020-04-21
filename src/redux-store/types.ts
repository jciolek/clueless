import reducer from './reducer';

export type ReducerType = typeof reducer;
export type StateType = NonNullable<Parameters<ReducerType>[0]>;
