import { handleAction } from 'redux-actions';
import { combineReducers } from 'redux';
import { types } from '../redux-store/actions';

const isStarted = handleAction(types.GAME.START, () => true, false);

const reducer = combineReducers({
  isStarted
});

export default reducer;
