import {
  getQuestionsById,
  getQuestionsByPieceId,
  getQuestionsByPlayerIdByPieceId
} from './selectors';
import reducer from '../redux-store/reducer';
import actions from '../redux-store/actions';

describe('questions selectors', () => {
  let state;

  function dispatch(action) {
    state = reducer(state, action);
  }

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  beforeEach(() => {
    state = undefined;
    dispatch({});
    dispatch(actions.players.add({ id: 1, name: 'Shrek' }));
    dispatch(actions.players.add({ id: 2, name: 'Fiona' }));
    dispatch(
      actions.questions.add({
        id: 2,
        playerId: 1,
        pieces: ['weapons.dagger', 'locations.study', 'suspects.green'],
        answer: 1
      })
    );
    dispatch(
      actions.questions.add({
        id: 5,
        playerId: 2,
        pieces: ['weapons.wrench', 'locations.study', 'suspects.white'],
        answer: 1
      })
    );

    const { players, questions } = state;
    expect(players).toHaveLength(3);
    expect(questions).toHaveLength(2);
  });

  describe('getQeustionsById', () => {
    it('should return an object { [questionId]: <Question>, ... }', () => {
      const questions = clone(state.questions);

      expect(getQuestionsById(state)).toEqual({
        2: questions[0],
        5: questions[1]
      });
    });
  });

  describe('getQuestionsByPlayerIdByPieceId', () => {
    it('should return an object { [playerId]: { [pieceId]: [<Question>, ...], ... }, ... }', () => {
      dispatch(
        actions.questions.add({
          id: 3,
          playerId: 1,
          pieces: ['weapons.dagger', 'locations.study', 'suspects.white'],
          answer: 1
        })
      );
      const questions = clone(state.questions);

      expect(getQuestionsByPlayerIdByPieceId(state)).toEqual({
        table: {},
        1: {
          'weapons.dagger': [questions[0], questions[2]],
          'locations.study': [questions[0], questions[2]],
          'suspects.green': [questions[0]],
          'suspects.white': [questions[2]]
        },
        2: {
          'weapons.wrench': [questions[1]],
          'locations.study': [questions[1]],
          'suspects.white': [questions[1]]
        }
      });
    });
  });
});
