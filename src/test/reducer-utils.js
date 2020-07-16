function createMockStore(reducer, initialState = undefined) {
  let state = reducer(initialState, {});

  return {
    getState() {
      return state;
    },
    dispatch(action) {
      state = reducer(state, action);
    },
  };
}

export default createMockStore;
