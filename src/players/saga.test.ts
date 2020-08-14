import reducer from '@/redux-store/reducer';
import createSagaMockStore from '@/test/createSagaMockStore';
import type { SagaMockStoreType } from '@/test/types';
import type { Dispatch } from 'redux';
import { actions as questionActions } from '@/questions/slice';
import { actions as playerActions } from './slice';
import { watchPlayersUpdate } from './saga';

type ReducerType = typeof reducer;

describe('players saga', () => {
  let store: SagaMockStoreType<ReducerType>;
  let dispatch: Dispatch;

  beforeEach(() => {
    const { add: addPlayer } = playerActions;
    const { add: addQuestion } = questionActions;

    store = createSagaMockStore(reducer, watchPlayersUpdate);
    ({ dispatch } = store);

    dispatch(addPlayer({ id: '1', name: 'Shrek' }));
    dispatch(addPlayer({ id: '2', name: 'Fiona' }));
    dispatch(addPlayer({ id: '3', name: 'Donkey' }));
    dispatch(
      addQuestion({
        id: '1',
        playerId: '1',
        pieces: ['weapons.pistol', 'suspects.white'],
        answer: 1,
      })
    );
    dispatch(
      addQuestion({
        id: '2',
        playerId: '1',
        pieces: ['locations.study', 'suspects.green'],
        answer: 1,
      })
    );
    dispatch(
      addQuestion({
        id: '3',
        playerId: '1',
        pieces: ['weapons.pistol', 'locations.courtyard'],
        answer: 1,
      })
    );
    dispatch(
      addQuestion({
        id: '4',
        playerId: '2',
        pieces: ['weapons.pistol', 'locations.bedroom'],
        answer: 1,
      })
    );

    const { questions, players } = store.getState();
    expect(players).toHaveLength(5);
    expect(questions).toHaveLength(4);
  });

  describe('watchPlayersUpdate', () => {
    it("should remove player's related questions and update other players if status === true", () => {
      const { update: updatePlayer } = playerActions;
      const { remove: removeQuestion } = questionActions;

      dispatch(
        updatePlayer({
          id: '1',
          pieceId: 'weapons.pistol',
          status: true,
        })
      );
      store.runner.cancel();

      expect(store.output).toEqual([
        removeQuestion({
          id: '1',
        }),
        removeQuestion({
          id: '3',
        }),
        updatePlayer({ id: 'table', pieceId: 'weapons.pistol', status: false }),
        updatePlayer({ id: 'me', pieceId: 'weapons.pistol', status: false }),
        updatePlayer({ id: '2', pieceId: 'weapons.pistol', status: false }),
        updatePlayer({ id: '3', pieceId: 'weapons.pistol', status: false }),
      ]);
    });

    it("should only update other players if status === true and there aren't related questions", () => {
      const { update } = playerActions;

      dispatch(update({ id: '1', pieceId: 'weapons.wrench', status: true }));
      store.runner.cancel();

      expect(store.output).toEqual([
        update({ id: 'table', pieceId: 'weapons.wrench', status: false }),
        update({ id: 'me', pieceId: 'weapons.wrench', status: false }),
        update({ id: '2', pieceId: 'weapons.wrench', status: false }),
        update({ id: '3', pieceId: 'weapons.wrench', status: false }),
      ]);
    });

    it("should update only player's related questions if status === false", () => {
      const { update: updatePlayer } = playerActions;
      const { update: updateQuestion } = questionActions;

      dispatch(
        updatePlayer({ id: '1', pieceId: 'weapons.pistol', status: false })
      );
      store.runner.cancel();

      expect(store.output).toEqual([
        updateQuestion({ id: '1', pieceId: 'weapons.pistol' }),
        updateQuestion({ id: '3', pieceId: 'weapons.pistol' }),
      ]);
    });

    it("should mark false all unmarked player's pieces when status === true and player's hand is known", () => {
      const { update } = playerActions;

      // There are 4 players, exluding table, and there is 18 pieces to share
      // 21 altogether - 3 in the envelope.
      // That means floor((21 - 3) / 4) = 4 pieces per player.
      dispatch(update({ id: '3', pieceId: 'weapons.wrench', status: true }));
      dispatch(update({ id: '3', pieceId: 'weapons.rope', status: true }));
      dispatch(update({ id: '3', pieceId: 'suspects.mustard', status: true }));
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
        update({ id: '3', pieceId: 'suspects.scarlet', status: false }),
        update({ id: '3', pieceId: 'suspects.peacock', status: false }),
        update({ id: '3', pieceId: 'suspects.plum', status: false }),
        update({ id: '3', pieceId: 'weapons.candlestick', status: false }),
        update({ id: '3', pieceId: 'weapons.dagger', status: false }),
        update({ id: '3', pieceId: 'weapons.leadPipe', status: false }),
        update({ id: '3', pieceId: 'weapons.pistol', status: false }),
        update({ id: '3', pieceId: 'locations.livingRoom', status: false }),
        update({ id: '3', pieceId: 'locations.diningRoom', status: false }),
        update({ id: '3', pieceId: 'locations.gamesRoom', status: false }),
        update({ id: '3', pieceId: 'locations.courtyard', status: false }),
        update({ id: '3', pieceId: 'locations.bathroom', status: false }),
        update({ id: '3', pieceId: 'locations.bedroom', status: false }),
        update({ id: '3', pieceId: 'locations.kitchen', status: false }),
        update({ id: '3', pieceId: 'locations.study', status: false }),
      ]);
    });

    it("should mark false all unmarked table's pieces when status === true and table's hand is known", () => {
      const { update } = playerActions;

      // There are 4 players, excluding table, and there is 18 pieces to share
      // 21 altogether - 3 in the envelope.
      // That means floor((21 - 3) / 4) = 4 pieces per player,
      // and (21 - 3) % 4 = 2 pieces for the table
      dispatch(
        update({ id: 'table', pieceId: 'weapons.wrench', status: true })
      );
      dispatch(update({ id: 'table', pieceId: 'weapons.rope', status: true }));
      store.runner.cancel();

      expect(store.output).toEqual([
        // First table piece.
        // Updating all other players.
        update({ id: 'me', pieceId: 'weapons.wrench', status: false }),
        update({ id: '1', pieceId: 'weapons.wrench', status: false }),
        update({ id: '2', pieceId: 'weapons.wrench', status: false }),
        update({ id: '3', pieceId: 'weapons.wrench', status: false }),

        // Second table piece
        // Updating all other players.
        update({ id: 'me', pieceId: 'weapons.rope', status: false }),
        update({ id: '1', pieceId: 'weapons.rope', status: false }),
        update({ id: '2', pieceId: 'weapons.rope', status: false }),
        update({ id: '3', pieceId: 'weapons.rope', status: false }),
        // Now updating all pieces not marked.
        update({ id: 'table', pieceId: 'suspects.white', status: false }),
        update({ id: 'table', pieceId: 'suspects.green', status: false }),
        update({ id: 'table', pieceId: 'suspects.mustard', status: false }),
        update({ id: 'table', pieceId: 'suspects.scarlet', status: false }),
        update({ id: 'table', pieceId: 'suspects.peacock', status: false }),
        update({ id: 'table', pieceId: 'suspects.plum', status: false }),
        update({ id: 'table', pieceId: 'weapons.candlestick', status: false }),
        update({ id: 'table', pieceId: 'weapons.dagger', status: false }),
        update({ id: 'table', pieceId: 'weapons.leadPipe', status: false }),
        update({ id: 'table', pieceId: 'weapons.pistol', status: false }),
        update({ id: 'table', pieceId: 'locations.livingRoom', status: false }),
        update({ id: 'table', pieceId: 'locations.diningRoom', status: false }),
        update({ id: 'table', pieceId: 'locations.gamesRoom', status: false }),
        update({ id: 'table', pieceId: 'locations.courtyard', status: false }),
        update({ id: 'table', pieceId: 'locations.bathroom', status: false }),
        update({ id: 'table', pieceId: 'locations.bedroom', status: false }),
        update({ id: 'table', pieceId: 'locations.garage', status: false }),
        update({ id: 'table', pieceId: 'locations.kitchen', status: false }),
        update({ id: 'table', pieceId: 'locations.study', status: false }),
      ]);
    });
  });
});
