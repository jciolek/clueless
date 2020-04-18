function getDefaultStorage() {
  return typeof window !== 'undefined' && window.localStorage
    ? window.localStorage
    : {
        setItem: () => undefined,
        getItem: () => null,
      };
}

function createPersistentMiddleware({ storage = getDefaultStorage() } = {}) {
  return (store) => (next) => (action) => {
    const result = next(action);
    const serializedState = JSON.stringify(store.getState());

    storage.setItem('state', serializedState);

    return result;
  };
}

function getPersistedState(storage = getDefaultStorage()) {
  const serializedState = storage.getItem('state');

  return serializedState ? JSON.parse(serializedState) : undefined;
}

export default createPersistentMiddleware;
export { getPersistedState };
