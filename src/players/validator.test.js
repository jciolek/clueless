import validator from './validator';
import actions from '../redux-store/actions';
import reducer from '../redux-store/reducer';
import errors from '../redux-store/errors';
import { createError } from '../redux-store/middleware/validator';
import createMockStore from '../../test/reducer-utils';

describe('players validator', () => {
  const { add, rename, remove, update } = actions.players;
  let store;
  let dispatch;

  beforeEach(() => {
    store = createMockStore(reducer);
    ({ dispatch } = store);
  });

  describe('ADD', () => {
    it('should return the same action if it is valid', () => {
      const action = add({ id: '1', name: 'Douglas' });

      expect(validator(store.getState(), action)).toEqual(action);
    });

    it('should return an error when the game is in progress', () => {
      const action = add({ id: '1', name: 'Douglas' });
      dispatch(actions.game.start());

      expect(validator(store.getState(), action)).toEqual(
        createError(action, errors.PLAYERS.GENERAL.GAME_IS_STARTED)
      );
    });

    it('should return an error if the name is not a string', () => {
      const action = add({ id: '1', name: null });

      expect(validator(store.getState(), action)).toEqual(
        createError(action, errors.PLAYERS.PARAMS.INVALID_NAME_TYPE)
      );
    });

    it('should return an error if the name is an empty string', () => {
      const action = add({ id: '1', name: '' });

      expect(validator(store.getState(), action)).toEqual(
        createError(action, errors.PLAYERS.PARAMS.INVALID_NAME_VALUE)
      );
    });

    it('should return an error if player id already exists', () => {
      const action = add({ id: '1', name: 'Snape' });
      dispatch(action);

      expect(validator(store.getState(), action)).toEqual(
        createError(action, errors.PLAYERS.ADD.EXISTING_ID)
      );
    });

    it('should return an error if id is missing from the payload', () => {
      const action = add({ name: 'Anakin' });

      expect(validator(store.getState(), action)).toEqual(
        createError(action, errors.PLAYERS.PARAMS.INVALID_ID_TYPE)
      );
    });
  });

  describe('RENAME', () => {
    beforeEach(() => {
      dispatch(add({ id: '1', name: 'Doug' }));
    });

    it('should return the same action if it is valid', () => {
      const action = rename({ id: '1', name: 'Douglas' });

      expect(validator(store.getState(), action)).toEqual(action);
    });

    it('should return the same action if the game is in progress', () => {
      const action = rename({ id: '1', name: 'Douglas' });
      dispatch(actions.game.start());

      expect(validator(store.getState(), action)).toEqual(action);
    });

    it('should return an error if the name is not a string', () => {
      const action = rename({ id: '1', name: null });

      expect(validator(store.getState(), action)).toEqual(
        createError(action, errors.PLAYERS.PARAMS.INVALID_NAME_TYPE)
      );
    });

    it('should return an error if the name is an empty string', () => {
      const action = rename({ id: '1', name: '' });

      expect(validator(store.getState(), action)).toEqual(
        createError(action, errors.PLAYERS.PARAMS.INVALID_NAME_VALUE)
      );
    });

    it('should return an error if player id does not exists', () => {
      const action = rename({ id: '2', name: 'Vitas' });

      expect(validator(store.getState(), action)).toEqual(
        createError(action, errors.PLAYERS.PARAMS.INVALID_ID)
      );
    });
  });

  describe('REMOVE', () => {
    beforeEach(() => {
      dispatch(add({ id: '1', name: 'Doug' }));
    });

    it('should return the same action if it is valid', () => {
      const action = remove({ id: '1' });

      expect(validator(store.getState(), action)).toEqual(action);
    });

    it('should return an error when the game is in progress', () => {
      const action = remove({ id: '1' });
      dispatch(actions.game.start());

      expect(validator(store.getState(), action)).toEqual(
        createError(action, errors.PLAYERS.GENERAL.GAME_IS_STARTED)
      );
    });

    it('should return an error if player id does not exists', () => {
      const action = remove({ id: '2' });

      expect(validator(store.getState(), action)).toEqual(
        createError(action, errors.PLAYERS.PARAMS.INVALID_ID)
      );
    });
  });

  describe('UPDATE', () => {
    beforeEach(() => {
      dispatch(add({ id: '1', name: 'Doug' }));
    });

    it('should return the same action if it is valid', () => {
      const action = update({
        id: '1',
        pieceId: 'weapons.dagger',
        status: false,
      });
      dispatch(actions.game.start());

      expect(validator(store.getState(), action)).toEqual(action);
    });

    it('should return an error if the game is not in progress', () => {
      const action = update({
        id: '1',
        pieceId: 'weapons.dagger',
        status: false,
      });

      expect(validator(store.getState(), action)).toEqual(
        createError(action, errors.PLAYERS.GENERAL.GAME_NOT_STARTED)
      );
    });

    it('should return an error if player id does not exist', () => {
      const action = update({
        id: '2',
        pieceId: 'weapons.dagger',
        status: false,
      });
      dispatch(actions.game.start());

      expect(validator(store.getState(), action)).toEqual(
        createError(action, errors.PLAYERS.PARAMS.INVALID_ID)
      );
    });

    it('should return an error if piece id does not exist', () => {
      const action = update({
        id: '1',
        pieceId: 'magic.avadaKedavra',
        status: false,
      });
      dispatch(actions.game.start());

      expect(validator(store.getState(), action)).toEqual(
        createError(action, errors.PLAYERS.PARAMS.INVALID_PIECE_ID)
      );
    });

    it('should return an error if piece status is not boolean', () => {
      const action = update({
        id: '1',
        pieceId: 'weapons.dagger',
        status: null,
      });
      dispatch(actions.game.start());

      expect(validator(store.getState(), action)).toEqual(
        createError(action, errors.PLAYERS.PARAMS.INVALID_STATUS)
      );
    });
  });
});
