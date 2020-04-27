import { createActions } from 'redux-actions';
import QUESTIONS from '@/questions/action-map';
import PLAYERS from '@/players/action-map';
import PIECES from '@/pieces/action-map';
import GAME from '@/game/action-map';
import { createTypes, createActionMap } from './utils';

const actionMap = {
  QUESTIONS,
  PLAYERS,
  PIECES,
  GAME,
  UNDOABLE: createActionMap(['UNDO', 'REDO']),
};

const types = createTypes(actionMap);
const actions = createActions(actionMap);

export default actions;
export { types };
