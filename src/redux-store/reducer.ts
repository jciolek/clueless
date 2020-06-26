import { combineReducers } from 'redux';
import questions from '@/questions/reducer';
import { reducer as pieces } from '@/pieces/slice';
import { reducer as game } from '@/game/slice';
import { reducer as players } from '@/players/slice';

const reducer = combineReducers({
  questions,
  players,
  pieces,
  game,
});

export default reducer;
