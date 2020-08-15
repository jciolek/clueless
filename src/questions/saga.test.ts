import reducer from '@/redux-store/reducer';
import createSagaMockStore from '@/test/createSagaMockStore';
import type { SagaMockStoreType } from '@/test/types';
import type { Dispatch } from 'redux';
import createMockStore from '@/test/createMockStore';
import { actions as playerActions } from '@/players/slice';
import { watchQuestionsUpdate, watchQuestionsAdd } from './saga';
import { actions as questionActions } from './slice';

type ReducerType = typeof reducer;
const { add: addPlayer, update: updatePlayer } = playerActions;
const {
  add: addQuestion,
  update: updateQuestion,
  remove: removeQuestion,
} = questionActions;

describe('questions saga', () => {
  let store: SagaMockStoreType<ReducerType>;
  let dispatch: Dispatch;
  let initialState: ReturnType<ReducerType>;

  beforeEach(() => {
    const tempStore = createMockStore(reducer);
    const { dispatch: tempDispatch } = tempStore;

    tempDispatch(addPlayer({ id: '1', name: 'Shrek' }));
    tempDispatch(addPlayer({ id: '2', name: 'Fiona' }));
    tempDispatch(addPlayer({ id: '3', name: 'Donkey' }));
    tempDispatch(
      addQuestion({
        id: '1',
        playerId: '1',
        pieces: ['weapons.dagger', 'locations.study', 'suspects.white'],
        answer: 1,
      })
    );
    tempDispatch(
      addQuestion({
        id: '2',
        playerId: '2',
        pieces: ['weapons.wrench', 'locations.bathroom', 'suspects.white'],
        answer: 1,
      })
    );

    initialState = tempStore.getState();

    expect(initialState.questions).toHaveLength(2);
  });

  describe('watchQuestionsUpdate', () => {
    beforeEach(() => {
      store = createSagaMockStore(reducer, watchQuestionsUpdate, initialState);
      ({ dispatch } = store);
    });

    it('should do nothing if the question does not exist', () => {
      dispatch(updateQuestion({ id: '123', pieceId: 'weapons.dagger' }));
      store.runner.cancel();

      expect(store.output).toHaveLength(0);
    });

    it('should do nothing if there is more then one piece left in the question', () => {
      dispatch(updateQuestion({ id: '1', pieceId: 'weapons.dagger' }));
      store.runner.cancel();

      expect(store.output).toHaveLength(0);
    });

    it('should update the player and remove the question if there is only one piece left in it', () => {
      dispatch(updateQuestion({ id: '1', pieceId: 'weapons.dagger' }));
      dispatch(updateQuestion({ id: '1', pieceId: 'suspects.white' }));
      store.runner.cancel();

      expect(store.output).toEqual([
        removeQuestion({ id: '1' }),
        updatePlayer({
          id: '1',
          pieceId: 'locations.study',
          status: true,
        }),
      ]);
    });
  });

  describe('watchQuestionsAdd', () => {
    beforeEach(() => {
      store = createSagaMockStore(reducer, watchQuestionsAdd, initialState);
      ({ dispatch } = store);
    });

    it('should update the player if the answer === pieceId', () => {
      dispatch(
        addQuestion({
          id: '3',
          playerId: '2',
          pieces: ['weapons.dagger', 'locations.bathroom', 'suspects.green'],
          answer: 'weapons.dagger',
        })
      );
      store.runner.cancel();

      expect(store.output).toEqual([
        updatePlayer({
          id: '2',
          pieceId: 'weapons.dagger',
          status: true,
        }),
      ]);
    });

    it('should update the player for each piece if the answer === 0', () => {
      dispatch(
        addQuestion({
          id: '3',
          playerId: '2',
          pieces: ['weapons.dagger', 'locations.bathroom', 'suspects.green'],
          answer: 0,
        })
      );
      store.runner.cancel();

      expect(store.output).toEqual([
        updatePlayer({
          id: '2',
          pieceId: 'weapons.dagger',
          status: false,
        }),
        updatePlayer({
          id: '2',
          pieceId: 'locations.bathroom',
          status: false,
        }),
        updatePlayer({
          id: '2',
          pieceId: 'suspects.green',
          status: false,
        }),
      ]);
    });

    it('should remove the question if and the answer === 1 and the player has any of the pieces', () => {
      dispatch(
        updatePlayer({
          id: '2',
          pieceId: 'weapons.rope',
          status: true,
        })
      );
      dispatch(
        addQuestion({
          id: '3',
          playerId: '2',
          pieces: ['weapons.rope', 'locations.bathroom', 'suspects.green'],
          answer: 1,
        })
      );
      store.runner.cancel();

      expect(store.output).toEqual([removeQuestion({ id: '3' })]);
    });

    it("should update the question for each of the player's missing pieces if and the answer === 1", () => {
      dispatch(
        updatePlayer({
          id: '2',
          pieceId: 'suspects.green',
          status: false,
        })
      );
      dispatch(
        updatePlayer({
          id: '2',
          pieceId: 'locations.bathroom',
          status: false,
        })
      );
      dispatch(
        addQuestion({
          id: '3',
          playerId: '2',
          pieces: ['weapons.rope', 'locations.bathroom', 'suspects.green'],
          answer: 1,
        })
      );
      store.runner.cancel();

      expect(store.output).toEqual([
        updateQuestion({ id: '3', pieceId: 'locations.bathroom' }),
        updateQuestion({ id: '3', pieceId: 'suspects.green' }),
      ]);
    });
  });
});
