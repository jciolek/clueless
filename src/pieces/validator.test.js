import validator from './validator';
import actions from '../redux-store/actions';
import reducer from '../redux-store/reducer';
import errors from '../redux-store/errors';
import { createError } from '../redux-store/middleware/validator';
import createMockStore from '../../test/reducer-utils';

describe('pieces validator', () => {
  const { add, replace, remove } = actions.pieces;
  let store;
  let dispatch;

  beforeEach(() => {
    store = createMockStore(reducer);
    ({ dispatch } = store);
  });

  describe('ADD', () => {
    it('should return the same action if it is valid', () => {
      const action = add({ groupId: 'weapons', name: 'pen' });

      expect(validator(store.getState(), action)).toEqual(action);
    });

    it('should return an error when the game is in progress', () => {
      const action = add({ groupId: 'weapons', name: 'pen' });
      dispatch(actions.game.start());

      expect(validator(store.getState(), action)).toEqual(
        createError(action, errors.PIECES.GENERAL.GAME_IS_STARTED)
      );
    });

    it('should return an error if the group id is incorrect', () => {
      const action = add({ groupId: 'animals', name: 'scruffy' });

      expect(validator(store.getState(), action)).toEqual(
        createError(action, errors.PIECES.PARAMS.INVALID_GROUP)
      );
    });

    it('should return an error if the name is not a string', () => {
      const action = add({ groupId: 'weapons', name: null });

      expect(validator(store.getState(), action)).toEqual(
        createError(action, errors.PIECES.PARAMS.INVALID_NAME_TYPE)
      );
    });

    it('should return an error if the name is an empty string', () => {
      const action = add({ groupId: 'weapons', name: '' });

      expect(validator(store.getState(), action)).toEqual(
        createError(action, errors.PIECES.PARAMS.INVALID_NAME_VALUE)
      );
    });

    it('should return an error if there is already a piece with the same id', () => {
      const action = add({ groupId: 'weapons', name: 'baseball bat' });
      dispatch(add({ groupId: 'weapons', name: 'Baseball bat' }));

      expect(validator(store.getState(), action)).toEqual(
        createError(action, errors.PIECES.PARAMS.INVALID_ID_AVAILABLE)
      );
    });
  });

  describe('REPLACE', () => {
    it('should return the same action if it is valid', () => {
      const action = replace({
        id: 'weapons.dagger',
        name: 'Pen',
      });

      expect(validator(store.getState(), action)).toEqual(action);
    });

    it('should return an error when the game is in progress', () => {
      dispatch(actions.game.start());
      const action = replace({
        id: 'weapons.dagger',
        name: 'Pen',
      });

      expect(validator(store.getState(), action)).toEqual(
        createError(action, errors.PIECES.GENERAL.GAME_IS_STARTED)
      );
    });

    it('should return an error if the name is not a string', () => {
      const action = replace({ id: 'weapons.dagger', name: null });

      expect(validator(store.getState(), action)).toEqual(
        createError(action, errors.PIECES.PARAMS.INVALID_NAME_TYPE)
      );
    });

    it('should return an error if the name is an empty string', () => {
      const action = replace({ id: 'weapons.dagger', name: '' });

      expect(validator(store.getState(), action)).toEqual(
        createError(action, errors.PIECES.PARAMS.INVALID_NAME_VALUE)
      );
    });

    it('should return an error if id is not valid', () => {
      const action = replace({
        id: 'magic.expelliarmus',
        name: 'Avada Kedavra',
      });

      expect(validator(store.getState(), action)).toEqual(
        createError(action, errors.PIECES.PARAMS.INVALID_ID)
      );
    });
  });

  describe('REMOVE', () => {
    it('should return the same action if it is valid', () => {
      const action = remove({
        id: 'weapons.dagger',
      });

      expect(validator(store.getState(), action)).toEqual(action);
    });

    it('should return an error when the game is in progress', () => {
      dispatch(actions.game.start());
      const action = remove({
        id: 'weapons.dagger',
      });

      expect(validator(store.getState(), action)).toEqual(
        createError(action, errors.PIECES.GENERAL.GAME_IS_STARTED)
      );
    });

    it('should return an error if id is not valid', () => {
      const action = remove({
        id: 'magic.expelliarmus',
      });

      expect(validator(store.getState(), action)).toEqual(
        createError(action, errors.PIECES.PARAMS.INVALID_ID)
      );
    });
  });
});
