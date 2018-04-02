import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { types } from '../redux-store/actions';

const defaultIsStarted = false;

const isStarted = handleActions(
  {
    [types.GAME.START]() {
      return true;
    },
    [types.GAME.FINISH]() {
      return false;
    }
  },
  defaultIsStarted
);

const reducer = combineReducers({
  isStarted
});

export default reducer;
