import { createActions } from 'redux-actions';
import QUESTIONS from '@/questions/action-map';
import { actions as pieces } from '@/pieces/slice';
import { actions as game } from '@/game/slice';
import { actions as players } from '@/players/slice';
import { createTypes, createActionMap } from './utils';

const actionMap = {
  QUESTIONS,
  UNDOABLE: createActionMap(['UNDO', 'REDO']),
};

const types = createTypes(actionMap);
const actions = {
  ...createActions(actionMap),
  game,
  pieces,
  players,
};

export default actions;
export { types };
