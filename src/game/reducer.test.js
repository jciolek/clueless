import reducer from './reducer';
import createMockStore from '../../test/reducer-utils';
import actions from '../redux-store/actions';

describe('game reducer', () => {
  const { start, finish } = actions.game;
  let store;
  let dispatch;

  beforeEach(() => {
    store = createMockStore(reducer);
    ({ dispatch } = store);
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
});
