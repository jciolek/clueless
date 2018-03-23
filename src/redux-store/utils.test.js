import { createTypes, createActionMap } from './utils';

describe('createActionMap', () => {
  it('should return actionMap from flat type ids array', () => {
    const actionMap = createActionMap(['ADD', 'RENAME']);
    expect(actionMap).toEqual({
      ADD: undefined,
      RENAME: undefined
    });
  });

  it('should return actionMap from type ids array with objects', () => {
    const action = jest.fn();
    const actionMap = createActionMap([{ ADD: action }, 'RENAME']);
    expect(actionMap).toEqual({
      ADD: action,
      RENAME: undefined
    });
  });
});

describe('createTypes', () => {
  it('should return types from flat actionMap', () => {
    const actionMap = createActionMap(['ADD', 'RENAME']);
    const types = createTypes(actionMap);
    expect(types).toEqual({
      ADD: 'ADD',
      RENAME: 'RENAME'
    });
  });

  it('should return types from nested actionMap', () => {
    const actionMap = {
      PLAYERS: createActionMap(['ADD', 'RENAME'])
    };
    const types = createTypes(actionMap);
    expect(types).toEqual({
      PLAYERS: {
        ADD: 'PLAYERS/ADD',
        RENAME: 'PLAYERS/RENAME'
      }
    });
  });

  it('should return types from actionMap with arrays', () => {
    const actionMap = {
      PLAYERS: createActionMap([
        { ADD: [undefined, () => ({ autoid: true })] },
        'RENAME'
      ])
    };
    const types = createTypes(actionMap);
    expect(types).toEqual({
      PLAYERS: {
        ADD: 'PLAYERS/ADD',
        RENAME: 'PLAYERS/RENAME'
      }
    });
  });
});
