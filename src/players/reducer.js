import { handleActions } from 'redux-actions';
import { types } from '../redux-store/actions';
import Player from './player';

const reducer = handleActions(
  {
    [types.PLAYERS.ADD](state, action) {
      return state.concat(Player(action.payload));
    },
    [types.PLAYERS.RENAME](state, action) {
      const { id, name } = action.payload;

      return state.map(
        (player) =>
          player.id !== id
            ? player
            : {
                ...player,
                name
              }
      );
    },
    [types.PLAYERS.REMOVE](state, action) {
      const { id } = action.payload;

      return state.filter((player) => player.id !== id || player.isProtected);
    },
    [types.PLAYERS.UPDATE](state, action) {
      const { id, pieceId, status } = action.payload;

      return state.map(
        (player) =>
          player.id !== id
            ? player
            : {
                ...player,
                pieces: {
                  ...player.pieces,
                  [pieceId]: status
                }
              }
      );
    }
  },
  [Player({ id: 'table', name: 'Table', isProtected: true })]
);

export default reducer;
