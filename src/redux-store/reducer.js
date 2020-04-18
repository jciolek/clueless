import { combineReducers } from 'redux';
import questions from '../questions/reducer';
import players from '../players/reducer';
import pieces from '../pieces/reducer';
import game from '../game/reducer';
import router from '../router/reducer';

const reducer = combineReducers({
  questions,
  players,
  pieces,
  game,
  router,
});

export default reducer;
