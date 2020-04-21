import reducer from '@/redux-store/reducer';
import actions from '@/redux-store/actions';
import { watchQuestionsUpdate, watchQuestionsAdd } from './saga';
import createMockStore from '../../test/saga-utils';

describe('questions saga', () => {
  let initialState;

  beforeEach(() => {
    initialState = undefined;
    function dispatch(action) {
      initialState = reducer(initialState, action);
    }

    dispatch(actions.players.add({ id: '1', name: 'Shrek' }));
    dispatch(actions.players.add({ id: '2', name: 'Fiona' }));
    dispatch(actions.players.add({ id: '3', name: 'Donkey' }));
    dispatch(
      actions.questions.add({
        id: '1',
        playerId: '1',
        pieces: ['weapons.dagger', 'locations.study', 'suspects.white'],
        answer: 1,
      })
    );
    dispatch(
      actions.questions.add({
        id: '2',
        playerId: '2',
        pieces: ['weapons.wrench', 'locations.bathroom', 'suspects.white'],
        answer: 1,
      })
    );
    const { questions } = initialState;
    expect(questions).toHaveLength(2);
  });

  describe('watchQuestionsUpdate', () => {
    let store = null;
    let dispatch = null;

    beforeEach(() => {
      store = createMockStore(reducer, watchQuestionsUpdate, initialState);
      ({ dispatch } = store);
    });

    it('should do nothing if the question does not exist', () => {
      dispatch(
        actions.questions.update({ id: '123', pieceId: 'weapons.dagger' })
      );
      store.runner.cancel();

      expect(store.output).toHaveLength(0);
    });

    it('should do nothing if there is more then one piece left in the question', () => {
      dispatch(
        actions.questions.update({ id: '1', pieceId: 'weapons.dagger' })
      );
      store.runner.cancel();

      expect(store.output).toHaveLength(0);
    });

    it('should update the player and remove the question if there is only one piece left in it', () => {
      dispatch(
        actions.questions.update({ id: '1', pieceId: 'weapons.dagger' })
      );
      dispatch(
        actions.questions.update({ id: '1', pieceId: 'suspects.white' })
      );
      store.runner.cancel();

      expect(store.output).toEqual([
        actions.questions.remove({ id: '1' }),
        actions.players.update({
          id: '1',
          pieceId: 'locations.study',
          status: true,
        }),
      ]);
    });
  });

  describe('watchQuestionsAdd', () => {
    let store = null;
    let dispatch = null;

    beforeEach(() => {
      store = createMockStore(reducer, watchQuestionsAdd, initialState);
      ({ dispatch } = store);
    });

    it('should update the player if the answer === pieceId', () => {
      dispatch(
        actions.questions.add({
          id: '3',
          playerId: '2',
          pieces: ['weapons.dagger', 'locations.bathroom', 'suspects.green'],
          answer: 'weapons.dagger',
        })
      );
      store.runner.cancel();

      expect(store.output).toEqual([
        actions.players.update({
          id: '2',
          pieceId: 'weapons.dagger',
          status: true,
        }),
      ]);
    });

    it('should update the player for each piece if the answer === 0', () => {
      dispatch(
        actions.questions.add({
          id: '3',
          playerId: '2',
          pieces: ['weapons.dagger', 'locations.bathroom', 'suspects.green'],
          answer: 0,
        })
      );
      store.runner.cancel();

      expect(store.output).toEqual([
        actions.players.update({
          id: '2',
          pieceId: 'weapons.dagger',
          status: false,
        }),
        actions.players.update({
          id: '2',
          pieceId: 'locations.bathroom',
          status: false,
        }),
        actions.players.update({
          id: '2',
          pieceId: 'suspects.green',
          status: false,
        }),
      ]);
    });

    it('should remove the question if and the answer === 1 and the player has any of the pieces', () => {
      dispatch(
        actions.players.update({
          id: '2',
          pieceId: 'weapons.rope',
          status: true,
        })
      );
      dispatch(
        actions.questions.add({
          id: '3',
          playerId: '2',
          pieces: ['weapons.rope', 'locations.bathroom', 'suspects.green'],
          answer: 1,
        })
      );
      store.runner.cancel();

      expect(store.output).toEqual([actions.questions.remove({ id: '3' })]);
    });

    it("should update the question for each of the player's missing pieces if and the answer === 1", () => {
      dispatch(
        actions.players.update({
          id: '2',
          pieceId: 'suspects.green',
          status: false,
        })
      );
      dispatch(
        actions.players.update({
          id: '2',
          pieceId: 'locations.bathroom',
          status: false,
        })
      );
      dispatch(
        actions.questions.add({
          id: '3',
          playerId: '2',
          pieces: ['weapons.rope', 'locations.bathroom', 'suspects.green'],
          answer: 1,
        })
      );
      store.runner.cancel();

      expect(store.output).toEqual([
        actions.questions.update({ id: '3', pieceId: 'locations.bathroom' }),
        actions.questions.update({ id: '3', pieceId: 'suspects.green' }),
      ]);
    });
  });
});
