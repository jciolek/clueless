import { handleAction, handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { types } from '@/redux-store/actions';

const defaultGame = {
  isStarted: false,
  selectedPlayerId: null,
  selectedPieceIds: {},
};

const isStarted = handleActions(
  {
    [types.GAME.START]() {
      return true;
    },
    [types.GAME.FINISH]() {
      return false;
    },
  },
  defaultGame.isStarted
);

const selectedPlayerId = handleAction(
  [types.GAME.TOGGLE_PLAYER],
  (state, action) => {
    const { id } = action.payload;

    return state === id ? null : id;
  },
  defaultGame.selectedPlayerId
);

const selectedPieceIds = handleActions(
  {
    [types.GAME.TOGGLE_PIECE](state, action) {
      const { id } = action.payload;
      const [groupId] = id.split('.');
      const newState = {
        ...state,
        [groupId]: id,
      };

      if (state[groupId] === id) {
        delete newState[groupId];
      }

      return newState;
    },
    [types.GAME.UNSELECT_ALL_PIECES]() {
      return defaultGame.selectedPieceIds;
    },
  },
  defaultGame.selectedPieceIds
);

const reducer = combineReducers({
  isStarted,
  selectedPlayerId,
  selectedPieceIds,
});

export default reducer;
