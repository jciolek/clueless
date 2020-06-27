import { combineReducers } from 'redux';
import { reducer as pieces } from '@/pieces/slice';
import { reducer as game } from '@/game/slice';
import { reducer as players } from '@/players/slice';
import { reducer as questions } from '@/questions/slice';

const reducer = combineReducers({
  questions,
  players,
  pieces,
  game,
});

export default reducer;
