import { createActions } from 'redux-actions';
import QUESTIONS from '@/questions/action-map';
import PLAYERS from '@/players/action-map';
import { actions as pieces } from '@/pieces/slice';
import { actions as game } from '@/game/slice';
import { createTypes, createActionMap } from './utils';

const actionMap = {
  QUESTIONS,
  PLAYERS,
  UNDOABLE: createActionMap(['UNDO', 'REDO']),
};

const types = createTypes(actionMap);
const actions = {
  ...createActions(actionMap),
  game,
  pieces,
};

export default actions;
export { types };
