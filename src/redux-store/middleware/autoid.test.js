import createAutoIdMiddleware from './autoid';

describe('autoid middleware', () => {
  let middleware = null;
  let next = null;

  beforeEach(() => {
    middleware = createAutoIdMiddleware();
    next = jest.fn();
  });

  it('should pass through an action with no meta', () => {
    const action = {};
    middleware()(next)(action);
    expect(next).toHaveBeenCalledWith(action);
  });

  it('should pass through an action with no meta.autoid', () => {
    const action = { payload: {}, meta: {} };
    middleware()(next)(action);
    expect(next).toHaveBeenCalledWith(action);
  });

  it('should pass through an action with meta.autoid === false', () => {
    const action = { payload: { id: 'hello' }, meta: { autoid: false } };
    middleware()(next)(action);
    expect(next).toHaveBeenCalledWith(action);
  });

  it('should pass through an action with meta.autoid === true and payload.id !== undefined', () => {
    const action = { payload: { id: 'hello' }, meta: { autoid: true } };
    middleware()(next)(action);
    expect(next).toHaveBeenCalledWith(action);
  });

  it('should create a sequential id:string by default if meta.autoid === true', () => {
    const action = { meta: { autoid: true } };
    middleware()(next)(action);
    let [[result]] = next.mock.calls;
    expect(result).not.toBe(action);
    expect(result).toHaveProperty('payload.id', '1');
    middleware()(next)(action);
    [, [result]] = next.mock.calls;
    expect(result).not.toBe(action);
    expect(result).toHaveProperty('payload.id', '2');
  });

  it('should take custom id iterator', () => {
    const action = { meta: { autoid: true } };
    const idIterator = {
      next() {
        return { value: 'hello' };
      }
    };
    middleware = createAutoIdMiddleware({ idIterator });

    middleware()(next)(action);
    const result = next.mock.calls[0][0];
    expect(result).toHaveProperty('payload.id', 'hello');
  });
});
