import reducer from '@/redux-store/reducer';
import actions from '@/redux-store/actions';
import createSagaMockStore from '@/test/createSagaMockStore';
import type { SagaMockStoreType } from '@/test/types';
import type { ReducerType } from '@/redux-store/types';
import type { Dispatch } from 'redux';
import { watchGameFinish } from './saga';

describe('game saga', () => {
  let store: SagaMockStoreType<ReducerType>;
  let dispatch: Dispatch;

  describe('watchGameFinish', () => {
    beforeEach(() => {
      store = createSagaMockStore(reducer, watchGameFinish);
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
