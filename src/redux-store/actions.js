import { createActions } from 'redux-actions';
import { createTypes } from './utils';
import QUESTIONS from '../questions/action-map';
import PLAYERS from '../players/action-map';
import PIECES from '../pieces/action-map';
import GAME from '../game/action-map';

const actionMap = {
  QUESTIONS,
  PLAYERS,
  PIECES,
  GAME
};

const types = createTypes(actionMap);
const actions = createActions(actionMap);

export default actions;
export { types };
