import createPersistentMiddleware, { getPersistedState } from './persistent';
import createMockStore from '../../../test/reducer-utils';

describe('persistent middleware', () => {
  let storage;

  beforeEach(() => {
    storage = {
      setItem: jest.fn(),
      getItem: jest.fn(() => '{"prop": "value"}')
    };
  });

  describe('createPersistentMiddleware', () => {
    let store;
    let middleware;
    let next;

    beforeEach(() => {
      store = createMockStore(() => ({ prop: 'value' }));
      middleware = createPersistentMiddleware({ storage });
      next = jest.fn(() => ({ type: 'RESULT' }));
    });

    it('should pass through an action and return result', () => {
      const action = { type: 'ACTION' };
      const result = middleware(store)(next)(action);

      expect(next).toHaveBeenCalledWith(action);
      expect(result).toEqual({ type: 'RESULT' });
    });

    it('should call setItem() on storage passed as a prop', () => {
      middleware(store)(next)({});

      expect(storage.setItem).toHaveBeenCalledWith(
        'state',
        JSON.stringify(store.getState())
      );
    });

    it('should use localStorage by default if available', () => {
      const localStorage = Object.getOwnPropertyDescriptor(
        window,
        'localStorage'
      );
      Object.defineProperty(window, 'localStorage', {
        ...localStorage,
        get: () => storage
      });

      middleware = createPersistentMiddleware();
      middleware(store)(next)({});

      expect(storage.setItem).toHaveBeenCalledWith(
        'state',
        JSON.stringify(store.getState())
      );

      Object.defineProperty(window, 'localStorage', localStorage);
    });

    it('should store state *after* passing the action through', () => {
      next = (action) => {
        expect(storage.setItem).not.toHaveBeenCalled();
        return action;
      };

      middleware(store)(next)({});

      expect(storage.setItem).toHaveBeenCalledWith(
        'state',
        JSON.stringify(store.getState())
      );
    });

    it('should not throw if there is no localStorage', () => {
      const action = { type: 'ACTION' };
      const localStorage = Object.getOwnPropertyDescriptor(
        window,
        'localStorage'
      );
      delete window.localStorage;

      middleware = createPersistentMiddleware();

      expect(() => middleware(store)(next)(action)).not.toThrow();
      expect(next).toHaveBeenCalledWith(action);

      Object.defineProperty(window, 'localStorage', localStorage);
    });
  });

  describe('getPersistedState', () => {
    it('should return undefined if there is no localStorage', () => {
      const localStorage = Object.getOwnPropertyDescriptor(
        window,
        'localStorage'
      );
      delete window.localStorage;

      expect(getPersistedState()).toBe(undefined);
      Object.defineProperty(window, 'localStorage', localStorage);
    });

    it('should use localStorage "state" key', () => {
      const localStorage = Object.getOwnPropertyDescriptor(
        window,
        'localStorage'
      );
      Object.defineProperty(window, 'localStorage', {
        ...localStorage,
        get: () => storage
      });

      expect(getPersistedState()).toEqual({
        prop: 'value'
      });
      expect(storage.getItem).toHaveBeenCalledWith('state');

      Object.defineProperty(window, 'localStorage', localStorage);
    });

    it('should use given storage', () => {
      expect(getPersistedState(storage)).toEqual({
        prop: 'value'
      });
      expect(storage.getItem).toHaveBeenCalledWith('state');
    });

    it('should return undefined if the state has not been stored', () => {
      storage.getItem = () => null;

      expect(getPersistedState(storage)).toBe(undefined);
    });
  });
});
