function createUndoableEnhancer({
  stateProp = 'undoable',
  undoType = 'UNDO',
  redoType = 'REDO',
  undoLevels = 5
} = {}) {
  return (reducer) => (state, action) => {
    if (!state) {
      return {
        ...reducer(state, action),
        [stateProp]: {
          past: [],
          future: []
        }
      };
    }

    let currState = { ...state };
    delete currState[stateProp];
    let { past, future } = state[stateProp];

    if (action.type === undoType && state[stateProp].past.length) {
      future = [currState, ...future];
      [currState] = state[stateProp].past;
      past = past.slice(1);
    }

    if (action.type === redoType && state[stateProp].future.length) {
      past = [currState, ...past];
      [currState] = state[stateProp].future;
      future = future.slice(1);
    }

    if (action.type !== redoType && action.type !== undoType) {
      future = [];

      if (action.meta && action.meta.isUndoable) {
        past = [currState, ...past].slice(0, undoLevels);
      }
    }

    return {
      ...reducer(currState, action),
      [stateProp]: {
        past,
        future
      }
    };
  };
}

export default createUndoableEnhancer;
