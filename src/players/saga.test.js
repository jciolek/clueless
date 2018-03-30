import { watchPlayersUpdate } from './saga';
import reducer from '../redux-store/reducer';
import actions from '../redux-store/actions';
import createMockStore from '../../test/saga-utils';

describe('players saga', () => {
  const { add, update } = actions.players;
  let store = null;
  let dispatch = null;

  beforeEach(() => {
    store = createMockStore(reducer, watchPlayersUpdate);
    ({ dispatch } = store);

    dispatch(add({ id: '1', name: 'Shrek' }));
    dispatch(add({ id: '2', name: 'Fiona' }));
    dispatch(add({ id: '3', name: 'Donkey' }));
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
        update({
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
        update({ id: 'table', pieceId: 'weapons.pistol', status: false }),
        update({ id: 'me', pieceId: 'weapons.pistol', status: false }),
        update({ id: '2', pieceId: 'weapons.pistol', status: false }),
        update({ id: '3', pieceId: 'weapons.pistol', status: false })
      ]);
    });

    it("should only update other players if status === true and there aren't related questions", () => {
      dispatch(update({ id: '1', pieceId: 'weapons.wrench', status: true }));
      store.runner.cancel();

      expect(store.output).toEqual([
        update({ id: 'table', pieceId: 'weapons.wrench', status: false }),
        update({ id: 'me', pieceId: 'weapons.wrench', status: false }),
        update({ id: '2', pieceId: 'weapons.wrench', status: false }),
        update({ id: '3', pieceId: 'weapons.wrench', status: false })
      ]);
    });

    it("should update only player's related questions if status === false", () => {
      dispatch(update({ id: '1', pieceId: 'weapons.pistol', status: false }));
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

    it("should mark false all unmarked player's pieces when status === true and player's hand is known", () => {
      // There are 4 players, exluding table, and there is 21 pieces.
      // That means floor(21 / 4) = 5 pieces per player.
      dispatch(update({ id: '3', pieceId: 'weapons.wrench', status: true }));
      dispatch(update({ id: '3', pieceId: 'weapons.rope', status: true }));
      dispatch(update({ id: '3', pieceId: 'suspects.mustard', status: true }));
      dispatch(update({ id: '3', pieceId: 'suspects.scarlet', status: true }));
      dispatch(update({ id: '3', pieceId: 'suspects.white', status: false }));
      dispatch(update({ id: '3', pieceId: 'suspects.green', status: false }));

      store.output.splice(0);
      dispatch(update({ id: '3', pieceId: 'locations.garage', status: true }));
      store.runner.cancel();

      expect(store.output).toEqual([
        // First, updating all other players.
        update({ id: 'table', pieceId: 'locations.garage', status: false }),
        update({ id: 'me', pieceId: 'locations.garage', status: false }),
        update({ id: '1', pieceId: 'locations.garage', status: false }),
        update({ id: '2', pieceId: 'locations.garage', status: false }),
        // Now updating all pieces not marked.
        update({ id: '3', pieceId: 'weapons.candlestick', status: false }),
        update({ id: '3', pieceId: 'weapons.dagger', status: false }),
        update({ id: '3', pieceId: 'weapons.leadPipe', status: false }),
        update({ id: '3', pieceId: 'weapons.pistol', status: false }),
        update({ id: '3', pieceId: 'suspects.peacock', status: false }),
        update({ id: '3', pieceId: 'suspects.plum', status: false }),
        update({ id: '3', pieceId: 'locations.livingRoom', status: false }),
        update({ id: '3', pieceId: 'locations.diningRoom', status: false }),
        update({ id: '3', pieceId: 'locations.gamesRoom', status: false }),
        update({ id: '3', pieceId: 'locations.courtyard', status: false }),
        update({ id: '3', pieceId: 'locations.bathroom', status: false }),
        update({ id: '3', pieceId: 'locations.bedroom', status: false }),
        update({ id: '3', pieceId: 'locations.kitchen', status: false }),
        update({ id: '3', pieceId: 'locations.study', status: false })
      ]);
    });
  });
});
