import createMockStore from '@/test/createMockStore';
import type { MockStoreType } from '@/test/types';
import type { Dispatch } from 'redux';
import { reducer, actions } from './slice';
import Player from './player';
import type { PlayerType } from './types';

const { add, update, remove, rename, reset } = actions;

type ReducerType = typeof reducer;

describe('players reducer', () => {
  let store: MockStoreType<ReducerType>;
  let dispatch: Dispatch;
  let players: {
    [id: string]: PlayerType;
  };

  beforeEach(() => {
    store = createMockStore(reducer);
    ({ dispatch } = store);

    const payloads = [
      { id: '1', name: 'Shrek' },
      { id: '2', name: 'Fiona' },
    ];
    players = {
      table: Player({ id: 'table', name: 'Table', isProtected: true }),
      me: Player({ id: 'me', name: 'Me', isProtected: true }),
      shrek: Player(payloads[0]),
      fiona: Player(payloads[1]),
    };
    dispatch(add(payloads[0]));
    dispatch(add(payloads[1]));
  });

  it('should return just the table and me players', () => {
    store = createMockStore(reducer);
    expect(store.getState()).toEqual([players.table, players.me]);
  });

  it('should allow to add a player', () => {
    expect(store.getState()).toHaveLength(4);
    expect(store.getState()).toEqual([
      players.table,
      players.me,
      players.shrek,
      players.fiona,
    ]);
  });

  it('should allow to remove a player', () => {
    dispatch(remove({ id: '1' }));
    expect(store.getState()).toHaveLength(3);
    expect(store.getState()).toEqual([
      players.table,
      players.me,
      players.fiona,
    ]);
  });

  it('should not allow to remove protected player', () => {
    dispatch(remove({ id: 'table' }));
    expect(store.getState()).toHaveLength(4);
    expect(store.getState()).toEqual([
      players.table,
      players.me,
      players.shrek,
      players.fiona,
    ]);
  });

  it('should allow to rename a player', () => {
    dispatch(rename({ id: '1', name: 'Donkey' }));
    expect(store.getState()).toEqual([
      players.table,
      players.me,
      { ...players.shrek, name: 'Donkey' },
      players.fiona,
    ]);
  });

  it('should allow to rename a protected player', () => {
    dispatch(rename({ id: 'table', name: 'Donkey' }));
    expect(store.getState()).toEqual([
      { ...players.table, name: 'Donkey' },
      players.me,
      players.shrek,
      players.fiona,
    ]);
  });

  it('should allow to set piece status for a player', () => {
    dispatch(update({ id: '1', pieceId: 'weapons.wrench', status: false }));
    expect(store.getState()).toEqual([
      players.table,
      players.me,
      {
        ...players.shrek,
        pieces: { 'weapons.wrench': false },
      },
      players.fiona,
    ]);
  });

  it('should allow to reset all players', () => {
    dispatch(update({ id: '1', pieceId: 'weapons.wrench', status: false }));
    dispatch(update({ id: '1', pieceId: 'weapons.dagger', status: true }));
    dispatch(update({ id: '2', pieceId: 'weapons.dagger', status: false }));
    dispatch(reset());

    expect(store.getState()).toEqual([
      players.table,
      players.me,
      players.shrek,
      players.fiona,
    ]);
  });
});
