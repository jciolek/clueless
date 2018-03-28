import {
  getPlayersIds,
  getPlayersById,
  getPlayersPiecesByPlayerId,
  getPlayersPiecesByPieceId
} from './selectors';
import reducer from '../redux-store/reducer';
import actions from '../redux-store/actions';

describe('players selectors', () => {
  let state;

  function dispatch(action) {
    state = reducer(state, action);
  }

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  beforeEach(() => {
    const { add } = actions.players;

    state = undefined;
    dispatch({});
    dispatch(add({ id: '1', name: 'Shrek' }));
    dispatch(add({ id: '2', name: 'Fiona' }));
    dispatch(add({ id: '3', name: 'Donkey' }));

    expect(state.players).toHaveLength(4);
  });

  describe('getPlayersIds', () => {
    it('should return an array [playerId, ...]', () => {
      expect(getPlayersIds(state)).toEqual(['table', '1', '2', '3']);
    });
  });

  describe('getPlayersById', () => {
    it('should return an object { [playerId]: <Player>, ...}', () => {
      const players = clone(state.players);

      expect(getPlayersById(state)).toEqual({
        table: players[0],
        1: players[1],
        2: players[2],
        3: players[3]
      });
    });
  });

  describe('getPlayersPiecesByPlayerId', () => {
    it('should return an object { [playerId]: [pieceId, ...] }', () => {
      const { update } = actions.players;

      dispatch(update({ id: '1', pieceId: 'weapons.wrench', status: true }));
      dispatch(update({ id: '1', pieceId: 'location.study', status: true }));
      dispatch(update({ id: '2', pieceId: 'weapons.dagger', status: false }));
      dispatch(
        update({ id: '2', pieceId: 'locations.bathroom', status: false })
      );
      dispatch(update({ id: '2', pieceId: 'suspects.white', status: false }));

      const players = clone(state.players);

      expect(getPlayersPiecesByPlayerId(state)).toEqual({
        table: players[0].pieces,
        1: players[1].pieces,
        2: players[2].pieces,
        3: players[3].pieces
      });
    });
  });

  describe('getPlayersPiecesByPieceId', () => {
    it('should return an object { [pieceId]: [boolean, ...], ... } ', () => {
      const { update } = actions.players;

      dispatch(
        update({ id: 'table', pieceId: 'weapons.dagger', status: true })
      );
      dispatch(update({ id: '1', pieceId: 'weapons.wrench', status: true }));
      dispatch(update({ id: '1', pieceId: 'suspects.white', status: false }));
      dispatch(update({ id: '2', pieceId: 'weapons.wrench', status: false }));
      dispatch(update({ id: '1', pieceId: 'location.study', status: false }));
      dispatch(update({ id: '2', pieceId: 'weapons.dagger', status: false }));
      dispatch(
        update({ id: '2', pieceId: 'locations.bathroom', status: false })
      );
      dispatch(update({ id: '2', pieceId: 'suspects.white', status: false }));

      expect(getPlayersPiecesByPieceId(state)).toEqual({
        'weapons.wrench': [false, true, false],
        'location.study': [false, false],
        'weapons.dagger': [true, false],
        'locations.bathroom': [false, false],
        'suspects.white': [false, false, false]
      });
    });
  });
});
