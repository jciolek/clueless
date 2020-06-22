import { combineReducers } from 'redux';
import questions from '@/questions/reducer';
import players from '@/players/reducer';
import { reducer as pieces } from '@/pieces/slice';
import { reducer as game } from '@/game/slice';

const reducer = combineReducers({
  questions,
  players,
  pieces,
  game,
});

export default reducer;
