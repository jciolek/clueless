import { watchPlayersUpdate } from './saga';
import reducer from '../redux-store/reducer';
import actions from '../redux-store/actions';
import createMockStore from '../../test/saga-utils';

describe('players saga', () => {
  let store = null;
  let dispatch = null;

  beforeEach(() => {
    store = createMockStore(reducer, watchPlayersUpdate);
    ({ dispatch } = store);

    dispatch(actions.players.add({ id: '1', name: 'Shrek' }));
    dispatch(actions.players.add({ id: '2', name: 'Fiona' }));
    dispatch(actions.players.add({ id: '3', name: 'Donkey' }));
    dispatch(
      actions.questions.add({
        id: '1',
        playerId: '1',
        pieces: ['weapons.pistol', 'suspects.white'],
        answer: 1
      })
    );
    dispatch(
      actions.questions.add({
        id: '2',
        playerId: '1',
        pieces: ['locations.study', 'suspects.green'],
        answer: 1
      })
    );
    dispatch(
      actions.questions.add({
        id: '3',
        playerId: '1',
        pieces: ['weapons.pistol', 'locations.courtyard'],
        answer: 1
      })
    );
    dispatch(
      actions.questions.add({
        id: '4',
        playerId: '2',
        pieces: ['weapons.pistol', 'locations.bedroom'],
        answer: 1
      })
    );

    const { questions, players } = store.getState();
    expect(players).toHaveLength(5);
    expect(questions).toHaveLength(4);
  });

  describe('watchPlayersUpdate', () => {
    it("should remove player's related questions and update other players if status === true", () => {
      dispatch(
        actions.players.update({
          id: '1',
          pieceId: 'weapons.pistol',
          status: true
        })
      );
      store.runner.cancel();

      expect(store.output).toEqual([
        actions.questions.remove({
          id: '1'
        }),
        actions.questions.remove({
          id: '3'
        }),
        actions.players.update({
          id: 'table',
          pieceId: 'weapons.pistol',
          status: false
        }),
        actions.players.update({
          id: 'me',
          pieceId: 'weapons.pistol',
          status: false
        }),
        actions.players.update({
          id: '2',
          pieceId: 'weapons.pistol',
          status: false
        }),
        actions.players.update({
          id: '3',
          pieceId: 'weapons.pistol',
          status: false
        })
      ]);
    });

    it("should only update other players if status === true and there aren't related questions", () => {
      dispatch(
        actions.players.update({
          id: '1',
          pieceId: 'weapons.wrench',
          status: true
        })
      );
      store.runner.cancel();

      expect(store.output).toEqual([
        actions.players.update({
          id: 'table',
          pieceId: 'weapons.wrench',
          status: false
        }),
        actions.players.update({
          id: 'me',
          pieceId: 'weapons.wrench',
          status: false
        }),
        actions.players.update({
          id: '2',
          pieceId: 'weapons.wrench',
          status: false
        }),
        actions.players.update({
          id: '3',
          pieceId: 'weapons.wrench',
          status: false
        })
      ]);
    });

    it("should update player's related questions if status === false", () => {
      dispatch(
        actions.players.update({
          id: '1',
          pieceId: 'weapons.pistol',
          status: false
        })
      );
      store.runner.cancel();

      expect(store.output).toEqual([
        actions.questions.update({
          id: '1',
          pieceId: 'weapons.pistol'
        }),
        actions.questions.update({
          id: '3',
          pieceId: 'weapons.pistol'
        })
      ]);
    });
  });
});
