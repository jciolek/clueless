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
      window.localStorage = storage;

      middleware = createPersistentMiddleware();
      middleware(store)(next)({});

      expect(storage.setItem).toHaveBeenCalledWith(
        'state',
        JSON.stringify(store.getState())
      );

      delete window.localStorage;
    });

    it('should store state *after* passing the action though', () => {
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

      middleware = createPersistentMiddleware();

      expect(() => middleware(store)(next)(action)).not.toThrow();
      expect(next).toHaveBeenCalledWith(action);
    });
  });

  describe('getPersistedState', () => {
    it('should return undefined if there is no localStorage', () => {
      expect(getPersistedState()).toBe(undefined);
    });

    it('should use localStorage "state" key', () => {
      window.localStorage = storage;

      expect(getPersistedState()).toEqual({
        prop: 'value'
      });
      expect(storage.getItem).toHaveBeenCalledWith('state');

      delete window.localStorage;
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
