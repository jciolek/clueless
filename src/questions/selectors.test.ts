import reducer from '@/redux-store/reducer';
import type { MockStoreType } from '@/test/types';
import type { Dispatch } from 'redux';
import createMockStore from '@/test/createMockStore';
import { actions as playerActions } from '@/players/slice';
import { getQuestionsById, getQuestionsByPlayerIdByPieceId } from './selectors';
import { actions as questionActions } from './slice';

type ReducerType = typeof reducer;

describe('questions selectors', () => {
  let store: MockStoreType<ReducerType>;
  let dispatch: Dispatch;

  function clone(value: unknown) {
    return JSON.parse(JSON.stringify(value));
  }

  beforeEach(() => {
    const { add: addPlayer } = playerActions;
    const { add: addQuestion } = questionActions;

    store = createMockStore(reducer);
    ({ dispatch } = store);

    dispatch(addPlayer({ id: '1', name: 'Shrek' }));
    dispatch(addPlayer({ id: '2', name: 'Fiona' }));
    dispatch(
      addQuestion({
        id: '2',
        playerId: '1',
        pieces: ['weapons.dagger', 'locations.study', 'suspects.green'],
        answer: 1,
      })
    );
    dispatch(
      addQuestion({
        id: '5',
        playerId: '2',
        pieces: ['weapons.wrench', 'locations.study', 'suspects.white'],
        answer: 1,
      })
    );

    const { players, questions } = store.getState();
    expect(players).toHaveLength(4);
    expect(questions).toHaveLength(2);
  });

  describe('getQeustionsById', () => {
    it('should return an object { [questionId]: <Question>, ... }', () => {
      const questions = clone(store.getState().questions);

      expect(getQuestionsById(store.getState())).toEqual({
        2: questions[0],
        5: questions[1],
      });
    });
  });

  describe('getQuestionsByPlayerIdByPieceId', () => {
    it('should return an object { [playerId]: { [pieceId]: [<Question>, ...], ... }, ... }', () => {
      const { add } = questionActions;

      dispatch(
        add({
          id: '3',
          playerId: '1',
          pieces: ['weapons.dagger', 'locations.study', 'suspects.white'],
          answer: 1,
        })
      );
      const questions = clone(store.getState().questions);

      expect(getQuestionsByPlayerIdByPieceId(store.getState())).toEqual({
        table: {},
        me: {},
        1: {
          'weapons.dagger': [questions[0], questions[2]],
          'locations.study': [questions[0], questions[2]],
          'suspects.green': [questions[0]],
          'suspects.white': [questions[2]],
        },
        2: {
          'weapons.wrench': [questions[1]],
          'locations.study': [questions[1]],
          'suspects.white': [questions[1]],
        },
      });
    });
  });
});
