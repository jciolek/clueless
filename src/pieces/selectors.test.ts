import reducer from '@/redux-store/reducer';
import createMockStore from '@/test/createMockStore';
import type { MockStoreType } from '@/test/types';
import type { Dispatch } from 'redux';
import {
  getPiecesIds,
  getPiecesGroupIds,
  getPiecesIdsByGroup,
  getPiecesNumberPerPlayer,
  getPiecesNumberForTable,
  getPiecesForMurdererById,
} from './selectors';
import { actions as playerActions } from '../players/slice';

type ReducerType = typeof reducer;

describe('pieces selectors', () => {
  let store: MockStoreType<ReducerType>;
  let dispatch: Dispatch;

  beforeEach(() => {
    store = createMockStore(reducer);
    ({ dispatch } = store);
  });

  describe('getPiecesIds', () => {
    it('should return an array [id, ...]', () => {
      expect(getPiecesIds(store.getState())).toMatchInlineSnapshot(`
        Array [
          "suspects.white",
          "suspects.green",
          "suspects.mustard",
          "suspects.scarlet",
          "suspects.peacock",
          "suspects.plum",
          "weapons.candlestick",
          "weapons.dagger",
          "weapons.wrench",
          "weapons.rope",
          "weapons.leadPipe",
          "weapons.pistol",
          "locations.livingRoom",
          "locations.diningRoom",
          "locations.gamesRoom",
          "locations.courtyard",
          "locations.bathroom",
          "locations.bedroom",
          "locations.garage",
          "locations.kitchen",
          "locations.study",
        ]
      `);
    });
  });

  describe('getPiecesGroupIds', () => {
    it('should return an array [groupId, ...]', () => {
      expect(getPiecesGroupIds(store.getState())).toMatchInlineSnapshot(`
        Array [
          "suspects",
          "weapons",
          "locations",
        ]
      `);
    });
  });

  describe('getPiecesIdsByGroup', () => {
    it('should return an array [[groupId.pieceId, ... ], ... ]', () => {
      expect(getPiecesIdsByGroup(store.getState())).toMatchInlineSnapshot(`
        Array [
          Array [
            "suspects.white",
            "suspects.green",
            "suspects.mustard",
            "suspects.scarlet",
            "suspects.peacock",
            "suspects.plum",
          ],
          Array [
            "weapons.candlestick",
            "weapons.dagger",
            "weapons.wrench",
            "weapons.rope",
            "weapons.leadPipe",
            "weapons.pistol",
          ],
          Array [
            "locations.livingRoom",
            "locations.diningRoom",
            "locations.gamesRoom",
            "locations.courtyard",
            "locations.bathroom",
            "locations.bedroom",
            "locations.garage",
            "locations.kitchen",
            "locations.study",
          ],
        ]
      `);
    });
  });

  describe('getPiecesNumberPerPlayer', () => {
    it('should return number of pieces per player, excluding table', () => {
      const { add } = playerActions;
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
      const { add } = playerActions;
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
    const { add, update } = playerActions;

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
