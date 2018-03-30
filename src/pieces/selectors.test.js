import {
  getPiecesGroupIds,
  getPiecesIdsByGroup,
  getPiecesForMurdererById
} from './selectors';
import reducer from '../redux-store/reducer';
import actions from '../redux-store/actions';
import createMockStore from '../../test/reducer-utils';

describe('pieces selectors', () => {
  let store;
  let dispatch;

  beforeEach(() => {
    store = createMockStore(reducer);
    ({ dispatch } = store);
  });

  describe('getPiecesGroupIds', () => {
    it('should return an array [groupId, ...]', () => {
      const state = {
        pieces: [
          {
            id: 'weapons',
            items: [{ id: 'weapons.wrench' }, { id: 'weapons.dagger' }]
          },
          {
            id: 'suspects',
            items: [{ id: 'suspects.white' }, { id: 'suspects.green' }]
          }
        ]
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
            items: [{ id: 'weapons.wrench' }, { id: 'weapons.dagger' }]
          },
          {
            id: 'suspects',
            items: [{ id: 'suspects.white' }, { id: 'suspects.green' }]
          }
        ]
      };
      expect(getPiecesIdsByGroup(state)).toEqual([
        ['weapons.wrench', 'weapons.dagger'],
        ['suspects.white', 'suspects.green']
      ]);
    });
  });

  describe('getPiecesForMurdererById', () => {
    const { add, update } = actions.players;

    beforeEach(() => {
      dispatch({});
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
        'weapons.pistol': true
      });
    });

    it('should mark the murder piece if none of the players have the piece', () => {
      dispatch(update({ id: '1', pieceId: 'weapons.dagger', status: false }));
      expect(getPiecesForMurdererById(store.getState())).toEqual({
        'weapons.candlestick': false,
        'weapons.dagger': true,
        'weapons.wrench': false,
        'weapons.rope': false,
        'weapons.leadPipe': false
      });
    });
  });
});
