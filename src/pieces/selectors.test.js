import reducer from '@/redux-store/reducer';
import actions from '@/redux-store/actions';
import createMockStore from '@/test/createMockStore';
import {
  getPiecesIds,
  getPiecesGroupIds,
  getPiecesIdsByGroup,
  getPiecesNumberPerPlayer,
  getPiecesNumberForTable,
  getPiecesForMurdererById,
} from './selectors';

describe('pieces selectors', () => {
  let store;
  let dispatch;

  beforeEach(() => {
    store = createMockStore(reducer);
    ({ dispatch } = store);
  });

  describe('getPiecesIds', () => {
    it('should return an array [id, ...]', () => {
      const state = {
        pieces: [
          {
            id: 'weapons',
            items: [{ id: 'weapons.wrench' }, { id: 'weapons.dagger' }],
          },
          {
            id: 'suspects',
            items: [{ id: 'suspects.white' }, { id: 'suspects.green' }],
          },
        ],
      };
      expect(getPiecesIds(state)).toEqual([
        'weapons.wrench',
        'weapons.dagger',
        'suspects.white',
        'suspects.green',
      ]);
    });
  });

  describe('getPiecesGroupIds', () => {
    it('should return an array [groupId, ...]', () => {
      const state = {
        pieces: [
          {
            id: 'weapons',
            items: [{ id: 'weapons.wrench' }, { id: 'weapons.dagger' }],
          },
          {
            id: 'suspects',
            items: [{ id: 'suspects.white' }, { id: 'suspects.green' }],
          },
        ],
      };
      expect(getPiecesGroupIds(state)).toEqual(['weapons', 'suspects']);
    });
  });

  describe('getPiecesIdsByGroup', () => {
    it('should return an array [[groupId.pieceId, ... ], ... ]', () => {
      const state = {
        pieces: [
          {
            id: 'weapons',
            items: [{ id: 'weapons.wrench' }, { id: 'weapons.dagger' }],
          },
          {
            id: 'suspects',
            items: [{ id: 'suspects.white' }, { id: 'suspects.green' }],
          },
        ],
      };
      expect(getPiecesIdsByGroup(state)).toEqual([
        ['weapons.wrench', 'weapons.dagger'],
        ['suspects.white', 'suspects.green'],
      ]);
    });
  });

  describe('getPiecesNumberPerPlayer', () => {
    it('should return number of pieces per player, excluding table', () => {
      const { add } = actions.players;
      // We exclude 3 pieces from the envelope as well.
      const piecesLength = getPiecesIds(store.getState()).length - 3;

      dispatch(add({ id: '1', name: 'Fiona' }));
      expect(getPiecesNumberPerPlayer(store.getState())).toBe(
        Math.floor(piecesLength / 2)
      );

      dispatch(add({ id: '2', name: 'Shrek' }));
      expect(getPiecesNumberPerPlayer(store.getState())).toBe(
        Math.floor(piecesLength / 3)
      );

      dispatch(add({ id: '3', name: 'Donkey' }));
      expect(getPiecesNumberPerPlayer(store.getState())).toBe(
        Math.floor(piecesLength / 4)
      );
    });
  });

  describe('getPiecesNumberForTable', () => {
    it('should return number of pieces per player, excluding table', () => {
      const { add } = actions.players;
      // We exclude 3 pieces from the envelope as well.
      const piecesLength = getPiecesIds(store.getState()).length - 3;

      dispatch(add({ id: '1', name: 'Fiona' }));
      expect(getPiecesNumberForTable(store.getState())).toBe(
        Math.floor(piecesLength % 2)
      );

      dispatch(add({ id: '2', name: 'Shrek' }));
      expect(getPiecesNumberForTable(store.getState())).toBe(
        Math.floor(piecesLength % 3)
      );

      dispatch(add({ id: '3', name: 'Donkey' }));
      expect(getPiecesNumberForTable(store.getState())).toBe(
        Math.floor(piecesLength % 4)
      );
    });
  });

  describe('getPiecesForMurdererById', () => {
    const { add, update } = actions.players;

    beforeEach(() => {
      dispatch(add({ id: '1', name: 'Shrek' }));
      dispatch(add({ id: '2', name: 'Fiona' }));
      dispatch(add({ id: '3', name: 'Donkey' }));

      dispatch(
        update({ id: '1', pieceId: 'weapons.candlestick', status: true })
      );
      dispatch(update({ id: '1', pieceId: 'weapons.dagger', status: true }));
      dispatch(update({ id: '1', pieceId: 'weapons.wrench', status: false }));
      dispatch(update({ id: '1', pieceId: 'weapons.rope', status: false }));
      dispatch(update({ id: '1', pieceId: 'weapons.leadPipe', status: false }));
      dispatch(update({ id: '1', pieceId: 'weapons.pistol', status: false }));

      dispatch(
        update({ id: '2', pieceId: 'weapons.candlestick', status: false })
      );
      dispatch(update({ id: '2', pieceId: 'weapons.dagger', status: false }));
      dispatch(update({ id: '2', pieceId: 'weapons.wrench', status: true }));
      dispatch(update({ id: '2', pieceId: 'weapons.rope', status: true }));
      dispatch(update({ id: '2', pieceId: 'weapons.leadPipe', status: false }));

      dispatch(
        update({ id: '3', pieceId: 'weapons.candlestick', status: false })
      );
      dispatch(update({ id: '3', pieceId: 'weapons.dagger', status: false }));
      dispatch(update({ id: '3', pieceId: 'weapons.wrench', status: false }));
      dispatch(update({ id: '3', pieceId: 'weapons.rope', status: false }));
      dispatch(update({ id: '3', pieceId: 'weapons.leadPipe', status: true }));
    });

    it('should mark the murder piece if the players have all but one from a group', () => {
      expect(getPiecesForMurdererById(store.getState())).toEqual({
        'weapons.candlestick': false,
        'weapons.dagger': false,
        'weapons.wrench': false,
        'weapons.rope': false,
        'weapons.leadPipe': false,
        'weapons.pistol': true,
      });
    });

    it('should mark the murder piece if none of the players have the piece', () => {
      dispatch(update({ id: '1', pieceId: 'weapons.dagger', status: false }));
      expect(getPiecesForMurdererById(store.getState())).toEqual({
        'weapons.candlestick': false,
        'weapons.dagger': true,
        'weapons.wrench': false,
        'weapons.rope': false,
        'weapons.leadPipe': false,
      });
    });
  });
});
