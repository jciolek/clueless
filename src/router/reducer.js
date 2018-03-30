import { handleActions } from 'redux-actions';
import { types } from '../redux-store/actions';

const reducer = handleActions(
  {
    [types.ROUTER.NAVIGATE](state, action) {
      const { route } = action.payload;

      return {
        ...state,
        activeRoute: route
      };
    }
  },
  {
    activeRoute: '/'
  }
);

export default reducer;
