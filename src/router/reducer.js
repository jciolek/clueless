import { handleActions } from 'redux-actions';
import { types } from '../redux-store/actions';

const reducer = handleActions(
  {
    [types.ROUTER.NAVIGATE](state, action) {
      const { path } = action.payload;

      return {
        ...state,
        path,
      };
    },
  },
  {
    path: '/',
  }
);

export default reducer;
