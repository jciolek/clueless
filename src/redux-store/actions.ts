import { createActions } from 'redux-actions';
import QUESTIONS from '@/questions/action-map';
import PLAYERS from '@/players/action-map';
import PIECES from '@/pieces/action-map';
import { actions as game } from '@/game/slice';
import { createTypes, createActionMap } from './utils';

const actionMap = {
  QUESTIONS,
  PLAYERS,
  PIECES,
  UNDOABLE: createActionMap(['UNDO', 'REDO']),
};

const types = createTypes(actionMap);
const actions = {
  ...createActions(actionMap),
  game,
};

export default actions;
export { types };
