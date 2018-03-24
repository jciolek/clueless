import { runSaga } from 'redux-saga';

function createMockStore(reducer, saga, initialState) {
  let state = reducer(initialState, {});
  const output = [];
  const subscriptions = [];
  const getState = () => state;
  const runner = runSaga(
    {
      subscribe(callback) {
        subscriptions.push(callback);
        return () => {
          const i = subscriptions.indexOf(callback);

          if (i !== -1) {
            subscriptions.splice(i, 1);
          }
        };
      },
      dispatch(action) {
        output.push(action);
      },
      getState
    },
    saga
  );

  return {
    dispatch(action) {
      state = reducer(state, action);
      subscriptions.forEach((subscription) => subscription(action));
    },
    getState,
    output,
    runner
  };
}

export default createMockStore;
