import { combineReducers } from 'redux';
import questions from '@/questions/reducer';
import players from '@/players/reducer';
import pieces from '@/pieces/reducer';
import game from '@/game/reducer';

const reducer = combineReducers({
  questions,
  players,
  pieces,
  game,
});

export default reducer;
