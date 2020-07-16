import reducer from '@/redux-store/reducer';
import actions from '@/redux-store/actions';
import createMockStore from '@/test/saga-utils';
import type { SagaMockStoreType, DispatchType } from '@/test/types';
import type { ReducerType } from '@/redux-store/types';
import { watchGameFinish } from './saga';

describe('game saga', () => {
  let store: SagaMockStoreType<ReducerType>;
  let dispatch: DispatchType;

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
