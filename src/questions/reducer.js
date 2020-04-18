import { handleActions } from 'redux-actions';
import { types } from '../redux-store/actions';
import Question from './question';

const defaultQuestions = [];

const reducer = handleActions(
  {
    [types.QUESTIONS.ADD](state, action) {
      const { answer } = action.payload;

      // We only add to the store question with an answer === 1.
      // That's because other questions (with answer === 0 and typeof answer === 'string')
      // don't have to be stored - they simply serve as a trigger for sagas.
      if (answer !== 1) {
        return state;
      }

      return state.concat(Question(action.payload));
    },

    [types.QUESTIONS.REMOVE](state, action) {
      const { id } = action.payload;
      return state.filter((question) => question.id !== id);
    },

    [types.QUESTIONS.UPDATE](state, action) {
      const { id, pieceId } = action.payload;

      return state.map((question) => {
        if (question.id !== id) {
          return question;
        }

        return {
          ...question,
          pieces: question.pieces.filter((item) => item !== pieceId),
        };
      });
    },

    [types.QUESTIONS.RESET]() {
      return defaultQuestions;
    },
  },
  defaultQuestions
);

export default reducer;
