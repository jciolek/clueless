import { createReducer } from '@reduxjs/toolkit';
import createMockStore from '@/test/createMockStore';
import createUndoableEnhancer from './undoable';

describe('undoable enhancer', () => {
  let reducer;
  let store;
  let dispatch;

  function createUndoableStore(props) {
    reducer = jest.fn(
      createReducer(
        { counter: 0 },
        {
          ACTION: (state) => {
            // eslint-disable-next-line no-param-reassign
            state.counter += 1;
          },
        }
      )
    );
    store = createMockStore(createUndoableEnhancer(props)(reducer));
    ({ dispatch } = store);
  }

  beforeEach(() => {
    createUndoableStore();
  });

  it('should call the original reducer', () => {
    expect(reducer).toHaveBeenCalledOnce;
    expect(reducer).toHaveBeenCalledWith(undefined, {});
  });

  it('should add its property to the state', () => {
    expect(store.getState()).toEqual({
      counter: 0,
      undoable: {
        past: [],
        future: [],
      },
    });
  });

  it('should use "stateProp" parameter as the state property', () => {
    createUndoableStore({
      stateProp: 'customUndoableProp',
    });

    expect(store.getState()).toEqual({
      counter: 0,
      customUndoableProp: {
        past: [],
        future: [],
      },
    });
  });

  it('should add previous state when meta.isUndoable === true', () => {
    dispatch({ type: 'ACTION', meta: { isUndoable: true } });
    expect(store.getState()).toEqual({
      counter: 1,
      undoable: {
        past: [{ counter: 0 }],
        future: [],
      },
    });
  });

  it('should not add previous state when meta.isUndoable !== true', () => {
    dispatch({ type: 'ACTION' });
    expect(store.getState()).toEqual({
      counter: 1,
      undoable: {
        past: [],
        future: [],
      },
    });
  });

  it('should store up to undoLevels previous states', () => {
    createUndoableStore({ undoLevels: 3 });
    dispatch({ type: 'ACTION', meta: { isUndoable: true } });
    dispatch({ type: 'ACTION', meta: { isUndoable: true } });
    dispatch({ type: 'ACTION', meta: { isUndoable: true } });
    dispatch({ type: 'ACTION', meta: { isUndoable: true } });

    expect(store.getState()).toEqual({
      counter: 4,
      undoable: {
        past: [{ counter: 3 }, { counter: 2 }, { counter: 1 }],
        future: [],
      },
    });
  });

  it('should undo', () => {
    dispatch({ type: 'ACTION', meta: { isUndoable: true } });
    dispatch({ type: 'ACTION', meta: { isUndoable: true } });
    dispatch({ type: 'UNDO' });

    expect(store.getState()).toEqual({
      counter: 1,
      undoable: {
        past: [{ counter: 0 }],
        future: [{ counter: 2 }],
      },
    });
  });

  it('should ignore undo if there is nothing to be undone', () => {
    dispatch({ type: 'ACTION' });
    dispatch({ type: 'UNDO' });

    expect(store.getState()).toEqual({
      counter: 1,
      undoable: {
        past: [],
        future: [],
      },
    });
  });

  it('should redo', () => {
    dispatch({ type: 'ACTION', meta: { isUndoable: true } });
    dispatch({ type: 'ACTION', meta: { isUndoable: true } });
    dispatch({ type: 'UNDO' });
    dispatch({ type: 'UNDO' });
    dispatch({ type: 'REDO' });

    expect(store.getState()).toEqual({
      counter: 1,
      undoable: {
        past: [{ counter: 0 }],
        future: [{ counter: 2 }],
      },
    });
  });

  it('should ignore redo if there is nothing to be re-done', () => {
    dispatch({ type: 'ACTION', meta: { isUndoable: true } });
    dispatch({ type: 'ACTION', meta: { isUndoable: true } });
    dispatch({ type: 'REDO' });

    expect(store.getState()).toEqual({
      counter: 2,
      undoable: {
        past: [{ counter: 1 }, { counter: 0 }],
        future: [],
      },
    });
  });

  it('should use "undoType" and "redoType" params for action types', () => {
    createUndoableStore({
      undoType: 'CUSTOM_UNDO',
      redoType: 'CUSTOM_REDO',
    });
    dispatch({ type: 'ACTION', meta: { isUndoable: true } });
    dispatch({ type: 'CUSTOM_UNDO' });

    expect(store.getState()).toEqual({
      counter: 0,
      undoable: {
        past: [],
        future: [{ counter: 1 }],
      },
    });

    dispatch({ type: 'CUSTOM_REDO' });

    expect(store.getState()).toEqual({
      counter: 1,
      undoable: {
        past: [{ counter: 0 }],
        future: [],
      },
    });
  });
});
