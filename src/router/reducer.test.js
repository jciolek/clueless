import reducer from './reducer';
import actions from '../redux-store/actions';
import createMockStore from '../../test/reducer-utils';

describe('router reducer', () => {
  let store = null;
  let dispatch = null;

  beforeEach(() => {
    store = createMockStore(reducer);
    ({ dispatch } = store);
  });

  it("should return activeRoute === '/'", () => {
    expect(store.getState()).toEqual({
      path: '/'
    });
  });

  it('should allow to navigate to another route', () => {
    dispatch(actions.router.navigate({ path: '/hello' }));

    expect(store.getState()).toHaveProperty('path', '/hello');
  });
});
