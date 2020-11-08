import type { Middleware } from 'redux';
import type { StorageType } from './types';

function getDefaultStorage(): StorageType {
  return typeof window !== 'undefined' && window.localStorage
    ? window.localStorage
    : {
        setItem: () => undefined,
        getItem: () => null,
      };
}

function createPersistentMiddleware({
  storage = getDefaultStorage(),
} = {}): Middleware {
  return (store) => (next) => (action) => {
    const result = next(action);
    const serializedState = JSON.stringify(store.getState());

    storage.setItem('state', serializedState);

    return result;
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getPersistedState(storage = getDefaultStorage()): any {
  const serializedState = storage.getItem('state');

  try {
    if (serializedState) {
      return JSON.parse(serializedState);
    }
  } catch (err) {
    return undefined;
  }

  return undefined;
}

export default createPersistentMiddleware;
export { getPersistedState };
