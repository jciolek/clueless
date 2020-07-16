import createMockStore from '@/test/reducer-utils';
import createValidatorMiddleware, {
  createValidator,
  combineValidators,
  createError,
} from './validator';

describe('validator middleware', () => {
  let passValidator;
  let failValidator;

  beforeEach(() => {
    passValidator = jest.fn((state, action) => action);
    failValidator = jest.fn((state, action) => createError(action));
  });

  describe('createValidatorMiddleware', () => {
    let store;
    let middleware;
    let next;

    beforeEach(() => {
      store = createMockStore(() => ({}));
      middleware = createValidatorMiddleware(passValidator);
      next = jest.fn();
    });

    it('should pass through an action with no error', () => {
      const action = { type: 'HELLO', payload: '' };
      middleware(store)(next)(action);

      expect(passValidator).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith(action);
    });

    it('should not pass through an action with an error', () => {
      const action = {
        type: 'HELLO',
        error: true,
        payload: 'some error',
      };
      middleware(store)(next)(action);

      expect(passValidator).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledTimes(0);
    });

    it('should pass state and action to the validator', () => {
      const action = { type: 'HELLO', payload: '' };
      middleware(store)(next)(action);

      expect(passValidator).toHaveBeenCalledWith(store.getState(), action);
    });
  });

  describe('createValidator', () => {
    it('should create a pass-through validator from an empty map', () => {
      const action = { type: 'HELLO', payload: 'world' };
      const validator = createValidator({});

      expect(validator({}, action)).toBe(action);
    });

    it('should create a validator checking only action types from the map', () => {
      const actionHello = { type: 'HELLO' };
      const actionWorld = { type: 'WORLD' };
      const validator = createValidator({
        HELLO: passValidator,
        WORLD: passValidator,
      });
      const state = {};
      validator(state, actionHello);
      validator(state, { type: 'BYE' });
      validator(state, actionWorld);

      expect(passValidator).toHaveBeenCalledTimes(2);
      expect(passValidator.mock.calls).toEqual([
        [state, actionHello],
        [state, actionWorld],
      ]);
    });
  });

  describe('combineValidators', () => {
    it('should create a pass-through validator from an empty list', () => {
      const action = { type: 'HELLO' };
      const validator = combineValidators();

      expect(validator({}, action)).toEqual(action);
    });

    it('should run all the validators from the list', () => {
      const action = { type: 'HELLO' };
      const state = {};
      const validator = combineValidators(passValidator, passValidator);

      expect(validator(state, action)).toEqual(action);
      expect(passValidator).toHaveBeenCalledTimes(2);
      expect(passValidator.mock.calls).toEqual([
        [state, action],
        [state, action],
      ]);
    });

    it('should stop running validators on the first error and return the error', () => {
      const action = { type: 'HELLO' };
      const state = {};
      const validator = combineValidators(
        passValidator,
        failValidator,
        passValidator
      );

      expect(validator(state, action)).toEqual(createError(action));
      expect(passValidator).toHaveBeenCalledTimes(1);
      expect(passValidator).toHaveBeenCalledWith(state, action);
      expect(failValidator).toHaveBeenCalledTimes(1);
      expect(failValidator).toHaveBeenCalledWith(state, action);
    });
  });

  describe('createError', () => {
    let action;

    beforeEach(() => {
      action = {
        type: 'HELLO',
        payload: 'world',
        meta: { isCool: true },
      };
    });

    it('should return an error action from a given action and a message', () => {
      const error = createError(action, 'oops');

      expect(error).toEqual({
        type: 'HELLO',
        payload: new Error('oops'),
        meta: { isCool: true },
        error: true,
      });
    });

    it('should not change the action passed to it', () => {
      createError(action, 'oops');

      const actionClone = JSON.parse(JSON.stringify(action));
      expect(action).toEqual(actionClone);
    });
  });
});
