import reducer from './reducer';
import createMockStore from '../../test/reducer-utils';
import actions from '../redux-store/actions';

describe('game reducer', () => {
  let store;
  let dispatch;

  beforeEach(() => {
    store = createMockStore(reducer);
    ({ dispatch } = store);
  });

  it('should allow to start the game', () => {
    expect(store.getState()).toHaveProperty('isStarted', false);

    dispatch(actions.game.start());
    expect(store.getState()).toHaveProperty('isStarted', true);
  });
});
