import reducer from './reducer';
import createMockStore from '../../test/reducer-utils';
import actions from '../redux-store/actions';

describe('game reducer', () => {
  const {
    start,
    finish,
    togglePlayer,
    togglePiece,
    unselectAllPieces
  } = actions.game;
  let store;
  let dispatch;

  beforeEach(() => {
    store = createMockStore(reducer);
    ({ dispatch } = store);
  });

  it('should return default state', () => {
    expect(store.getState()).toEqual({
      isStarted: false,
      selectedPlayerId: null,
      selectedPieceIds: {}
    });
  });

  it('should allow to start the game', () => {
    expect(store.getState()).toHaveProperty('isStarted', false);

    dispatch(start());
    expect(store.getState()).toHaveProperty('isStarted', true);
  });

  it('should allow to finish the game', () => {
    dispatch(start());
    dispatch(finish());

    expect(store.getState()).toHaveProperty('isStarted', false);
  });

  it('should allow to toggle player', () => {
    dispatch(togglePlayer({ id: '1' }));

    expect(store.getState()).toHaveProperty('selectedPlayerId', '1');

    dispatch(togglePlayer({ id: '1' }));

    expect(store.getState()).toHaveProperty('selectedPlayerId', null);
  });

  it('should allow to select another player', () => {
    dispatch(togglePlayer({ id: '1' }));
    dispatch(togglePlayer({ id: '2' }));

    expect(store.getState()).toHaveProperty('selectedPlayerId', '2');
  });

  it('should allow to toggle piece', () => {
    dispatch(togglePiece({ id: 'weapons.wrench' }));

    expect(store.getState()).toHaveProperty('selectedPieceIds', {
      weapons: 'weapons.wrench'
    });

    dispatch(togglePiece({ id: 'weapons.wrench' }));

    expect(store.getState()).toHaveProperty('selectedPieceIds', {});
  });

  it('should allow to toggle pieces from different groups independently', () => {
    dispatch(togglePiece({ id: 'weapons.wrench' }));
    dispatch(togglePiece({ id: 'suspects.white' }));

    expect(store.getState()).toHaveProperty('selectedPieceIds', {
      weapons: 'weapons.wrench',
      suspects: 'suspects.white'
    });

    dispatch(togglePiece({ id: 'suspects.white' }));
    expect(store.getState()).toHaveProperty('selectedPieceIds', {
      weapons: 'weapons.wrench'
    });
  });

  it('should allow to unselect all pieces', () => {
    dispatch(togglePiece({ id: 'weapons.wrench' }));
    dispatch(togglePiece({ id: 'suspects.white' }));
    dispatch(unselectAllPieces());

    expect(store.getState()).toHaveProperty('selectedPieceIds', {});
  });
});
