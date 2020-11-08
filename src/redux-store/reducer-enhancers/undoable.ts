import type { AnyAction, Reducer } from 'redux';
import type { UndoableEnhancerProps, UndoableStateType } from './types';

function createUndoableEnhancer({
  stateProp = 'undoable',
  undoType = 'UNDO',
  redoType = 'REDO',
  undoLevels = 5,
}: UndoableEnhancerProps = {}) {
  return <R extends Reducer = Reducer>(reducer: R) => (
    state: UndoableStateType<ReturnType<R>> | undefined,
    action: AnyAction
  ): UndoableStateType<ReturnType<R>> => {
    if (!state) {
      return {
        ...reducer(state, action),
        [stateProp]: {
          past: [],
          future: [],
        },
      };
    }

    let {
      [stateProp]: { past, future },
      ...currState
    } = state;

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
        future,
      },
    };
  };
}

export default createUndoableEnhancer;
