import { watchGameFinish } from './saga';
import reducer from '../redux-store/reducer';
import actions from '../redux-store/actions';
import createMockStore from '../../test/saga-utils';

describe('game saga', () => {
  let store = null;
  let dispatch = null;

  describe('watchGameFinish', () => {
    beforeEach(() => {
      store = createMockStore(reducer, watchGameFinish);
      ({ dispatch } = store);
    });

    it('should reset players and questions', () => {
      dispatch(actions.game.finish());

      expect(store.output).toEqual([
        actions.players.reset(),
        actions.questions.reset(),
      ]);
    });
  });
});
