import reducer from './reducer';
import actions from '../redux-store/actions';
import createMockStore from '../../test/reducer-utils';

describe('pieces reducer', () => {
  let store = null;
  let dispatch = null;

  beforeEach(() => {
    store = createMockStore(reducer);
    ({ dispatch } = store);
  });

  it('should return 3 groups', () => {
    expect(store.getState()).toHaveLength(3);
  });

  it('should allow to add an item to a group', () => {
    const [{ id: groupId, items }] = store.getState();

    dispatch(actions.pieces.add({ groupId, name: 'Baseball bat' }));

    const state = store.getState();
    expect(state[0].items.length).toBe(items.length + 1);
  });

  it('should allow to remove an item from a group', () => {
    const [, { id: groupId, items }] = store.getState();
    const [{ id: pieceId }] = items;

    dispatch(actions.pieces.remove({ id: `${groupId}.${pieceId}` }));

    const state = store.getState();
    expect(state[1].items.length).toBe(items.length - 1);
    expect(state[1].items.some((item) => item.id === pieceId)).toBe(false);
  });

  it('should allow to replace an item in a group', () => {
    const [, , { id: groupId, items }] = store.getState();
    const [, { id: pieceId }] = items;

    dispatch(
      actions.pieces.replace({
        id: `${groupId}.${pieceId}`,
        name: 'Baseball bat'
      })
    );

    const state = store.getState();
    expect(state[2].items.length).toBe(items.length);
    expect(state[2].items.some((item) => item.id === pieceId)).toBe(false);
    expect(state[2].items[1].id).not.toBe(pieceId);
    expect(state[2].items[1].name).toBe('Baseball bat');
  });
});
