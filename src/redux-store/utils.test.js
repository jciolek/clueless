import { createTypes, metaCreator, createActionMap } from './utils';

describe('redux-store utils', () => {
  describe('createActionMap', () => {
    it('should return actionMap with default meta creator from an array with type ids', () => {
      const actionMap = createActionMap(['ADD', 'RENAME']);
      expect(actionMap).toEqual({
        ADD: [undefined, metaCreator],
        RENAME: [undefined, metaCreator],
      });
    });

    it('should return actionMap with default meta creator from type ids array with objects', () => {
      const customPayloadCreator = jest.fn();
      const actionMap = createActionMap([
        { ADD: customPayloadCreator },
        'RENAME',
      ]);
      expect(actionMap).toEqual({
        ADD: [customPayloadCreator, metaCreator],
        RENAME: [undefined, metaCreator],
      });
    });

    it('should return actionMap with overridden default meta creator if meta creator is specified', () => {
      const customPayloadCreator = jest.fn();
      const customMetaCreator = jest.fn();

      const actionMap = createActionMap([
        {
          ADD: customPayloadCreator,
          REMOVE: [customPayloadCreator, customMetaCreator],
        },
        'RENAME',
      ]);
      expect(actionMap).toEqual({
        ADD: [customPayloadCreator, metaCreator],
        REMOVE: [customPayloadCreator, customMetaCreator],
        RENAME: [undefined, metaCreator],
      });
    });
  });

  describe('createTypes', () => {
    it('should return types from flat actionMap', () => {
      const actionMap = createActionMap(['ADD', 'RENAME']);
      const types = createTypes(actionMap);
      expect(types).toEqual({
        ADD: 'ADD',
        RENAME: 'RENAME',
      });
    });

    it('should return types from nested actionMap', () => {
      const actionMap = {
        PLAYERS: createActionMap(['ADD', 'RENAME']),
      };
      const types = createTypes(actionMap);
      expect(types).toEqual({
        PLAYERS: {
          ADD: 'PLAYERS/ADD',
          RENAME: 'PLAYERS/RENAME',
        },
      });
    });

    it('should return types from actionMap with arrays', () => {
      const actionMap = {
        PLAYERS: createActionMap([{ ADD: [undefined, metaCreator] }, 'RENAME']),
      };
      const types = createTypes(actionMap);
      expect(types).toEqual({
        PLAYERS: {
          ADD: 'PLAYERS/ADD',
          RENAME: 'PLAYERS/RENAME',
        },
      });
    });
  });
});
