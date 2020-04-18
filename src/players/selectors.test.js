import {
  getPlayersIds,
  getPlayersById,
  getPlayersPiecesByPlayerId,
  getPlayersPiecesByPieceId,
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

    expect(state.players).toHaveLength(5);
  });

  describe('getPlayersIds', () => {
    it('should return an array [playerId, ...]', () => {
      expect(getPlayersIds(state)).toEqual(['table', 'me', '1', '2', '3']);
    });
  });

  describe('getPlayersById', () => {
    it('should return an object { [playerId]: <Player>, ...}', () => {
      const players = clone(state.players);

      expect(getPlayersById(state)).toEqual({
        table: players[0],
        me: players[1],
        1: players[2],
        2: players[3],
        3: players[4],
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
        me: players[1].pieces,
        1: players[2].pieces,
        2: players[3].pieces,
        3: players[4].pieces,
      });
    });
  });

  describe('getPlayersPiecesByPieceId', () => {
    it('should return an object { [pieceId]: [boolean, ...], ... } ', () => {
      const { update } = actions.players;

      dispatch(
        update({ id: 'table', pieceId: 'weapons.dagger', status: true })
      );
      dispatch(update({ id: 'me', pieceId: 'weapons.rope', status: true }));
      dispatch(update({ id: 'me', pieceId: 'weapons.wrench', status: false }));
      dispatch(update({ id: '1', pieceId: 'weapons.wrench', status: true }));
      dispatch(update({ id: '1', pieceId: 'suspects.white', status: false }));
      dispatch(update({ id: '2', pieceId: 'weapons.wrench', status: false }));
      dispatch(update({ id: '1', pieceId: 'location.study', status: false }));
      dispatch(update({ id: '2', pieceId: 'weapons.dagger', status: false }));
      dispatch(
        update({ id: '2', pieceId: 'locations.bathroom', status: false })
      );
      dispatch(update({ id: '2', pieceId: 'suspects.white', status: false }));

      // The first two values in each array always represent table an me players.
      // Please note, that if table has a piece and me does not,
      // the order for the two will be reversed.
      expect(getPlayersPiecesByPieceId(state)).toEqual({
        'weapons.wrench': [false, false, true, false],
        'weapons.rope': [false, true],
        'location.study': [false, false, false],
        'weapons.dagger': [false, true, false],
        'locations.bathroom': [false, false, false],
        'suspects.white': [false, false, false, false],
      });
    });
  });
});
