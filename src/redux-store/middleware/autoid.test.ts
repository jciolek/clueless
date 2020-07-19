import { Dispatch, Middleware } from 'redux';
import { MockStoreType } from '@/test/types';
import createMockStore from '@/test/createMockStore';
import createAutoIdMiddleware from './autoid';

describe('autoid middleware', () => {
  let store: MockStoreType;
  let middleware: Middleware;
  let next: jest.MockedFunction<Dispatch>;

  beforeEach(() => {
    store = createMockStore(() => ({}));
    middleware = createAutoIdMiddleware();
    next = jest.fn();
  });

  it('should pass through an action with no meta', () => {
    const action = { type: undefined };
    middleware(store)(next)(action);
    expect(next).toHaveBeenCalledWith(action);
  });

  it('should pass through an action with no meta.autoid', () => {
    const action = { type: undefined, payload: {}, meta: {} };
    middleware(store)(next)(action);
    expect(next).toHaveBeenCalledWith(action);
  });

  it('should pass through an action with meta.autoid === false', () => {
    const action = {
      type: undefined,
      payload: { id: 'hello' },
      meta: { autoid: false },
    };
    middleware(store)(next)(action);
    expect(next).toHaveBeenCalledWith(action);
  });

  it('should pass through an action with meta.autoid === true and payload.id !== undefined', () => {
    const action = {
      type: undefined,
      payload: { id: 'hello' },
      meta: { autoid: true },
    };
    middleware(store)(next)(action);
    expect(next).toHaveBeenCalledWith(action);
  });

  it('should create a sequential id:string by default if meta.autoid === true', () => {
    const action = { type: undefined, meta: { autoid: true } };
    middleware(store)(next)(action);
    let [[result]] = next.mock.calls;
    expect(result).not.toBe(action);
    expect(result).toHaveProperty('payload.id', '1');
    middleware(store)(next)(action);
    [, [result]] = next.mock.calls;
    expect(result).not.toBe(action);
    expect(result).toHaveProperty('payload.id', '2');
  });

  it('should take custom id iterator', () => {
    const action = { type: undefined, meta: { autoid: true } };
    const idIterator = ['hello'].values();

    middleware = createAutoIdMiddleware({ idIterator });

    middleware(store)(next)(action);
    const result = next.mock.calls[0][0];
    expect(result).toHaveProperty('payload.id', 'hello');
  });
});
