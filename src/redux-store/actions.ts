import { createActions } from 'redux-actions';
import { actions as pieces } from '@/pieces/slice';
import { actions as game } from '@/game/slice';
import { actions as players } from '@/players/slice';
import { actions as questions } from '@/questions/slice';
import { createTypes, createActionMap } from './utils';

const actionMap = {
  UNDOABLE: createActionMap(['UNDO', 'REDO']),
};

const types = createTypes(actionMap);
const actions = {
  ...createActions(actionMap),
  game,
  pieces,
  players,
  questions,
};

export default actions;
export { types };
