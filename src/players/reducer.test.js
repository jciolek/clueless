import reducer from './reducer';
import Player from './player';
import actions from '../redux-store/actions';
import createMockStore from '../../test/reducer-utils';

describe('players reducer', () => {
  let store = null;
  let dispatch = null;
  let players = null;

  beforeEach(() => {
    store = createMockStore(reducer);
    ({ dispatch } = store);

    const payloads = [{ id: '1', name: 'Shrek' }, { id: '2', name: 'Fiona' }];
    players = {
      table: Player({ id: 'table', name: 'Table', isProtected: true }),
      shrek: Player(payloads[0]),
      fiona: Player(payloads[1])
    };
    dispatch(actions.players.add(payloads[0]));
    dispatch(actions.players.add(payloads[1]));
  });

  it('should return just the table in the list of players', () => {
    store = createMockStore(reducer);
    expect(store.getState()).toEqual([players.table]);
  });

  it('should allow to add a player', () => {
    expect(store.getState()).toHaveLength(3);
    expect(store.getState()).toEqual([
      players.table,
      players.shrek,
      players.fiona
    ]);
  });

  it('should allow to remove a player', () => {
    dispatch(actions.players.remove({ id: '1' }));
    expect(store.getState()).toHaveLength(2);
    expect(store.getState()).toEqual([players.table, players.fiona]);
  });

  it('should not allow to remove protected player', () => {
    dispatch(actions.players.remove({ id: 'table' }));
    expect(store.getState()).toHaveLength(3);
    expect(store.getState()).toEqual([
      players.table,
      players.shrek,
      players.fiona
    ]);
  });

  it('should allow to rename a player', () => {
    dispatch(actions.players.rename({ id: '1', name: 'Donkey' }));
    expect(store.getState()).toEqual([
      players.table,
      { ...players.shrek, name: 'Donkey' },
      players.fiona
    ]);
  });

  it('should allow to rename a protected player', () => {
    dispatch(actions.players.rename({ id: 'table', name: 'Donkey' }));
    expect(store.getState()).toEqual([
      { ...players.table, name: 'Donkey' },
      players.shrek,
      players.fiona
    ]);
  });

  it('should allow to set piece status for a player', () => {
    dispatch(
      actions.players.update({
        id: '1',
        pieceId: 'weapons.wrench',
        status: false
      })
    );
    expect(store.getState()).toEqual([
      players.table,
      {
        ...players.shrek,
        pieces: { 'weapons.wrench': false }
      },
      players.fiona
    ]);
  });
});
