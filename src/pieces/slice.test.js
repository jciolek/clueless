import createMockStore from '@/test/reducer-utils';
import { reducer, actions } from './slice';

const { add, remove, replace } = actions;

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

    dispatch(add({ groupId, name: 'Baseball bat' }));

    const state = store.getState();
    expect(state[0].items.length).toBe(items.length + 1);
  });

  it('should allow to remove an item from a group', () => {
    const [, { items }] = store.getState();
    const [{ id }] = items;

    dispatch(remove({ id }));

    const state = store.getState();
    expect(state[1].items.length).toBe(items.length - 1);
    expect(state[1].items.some((item) => item.id === id)).toBe(false);
  });

  it('should allow to replace an item in a group', () => {
    const [, , { items }] = store.getState();
    const [, { id }] = items;

    dispatch(
      replace({
        id,
        name: 'Baseball bat',
      })
    );

    const state = store.getState();
    expect(state[2].items.length).toBe(items.length);
    expect(state[2].items.some((item) => item.id === id)).toBe(false);
    expect(state[2].items[1].id).not.toBe(id);
    expect(state[2].items[1].name).toBe('Baseball bat');
  });
});
