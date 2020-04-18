import { createSelector } from 'reselect';
import { getPlayersIds } from '../players/selectors';

const getQuestionsById = createSelector(
  (state) => state.questions,
  (questions) =>
    questions.reduce(
      (result, question) =>
        Object.assign(result, {
          [question.id]: question,
        }),
      {}
    )
);

const getQuestionsByPlayerIdByPieceId = createSelector(
  (state) => state.questions,
  getPlayersIds,
  (questions, playerIds) => {
    const playersQuestions = playerIds.reduce(
      (result, playerId) => Object.assign(result, { [playerId]: {} }),
      {}
    );

    questions.forEach((question) => {
      const { playerId, pieces } = question;
      const pieceQuestions = playersQuestions[playerId];

      pieces.forEach((pieceId) => {
        if (!pieceQuestions[pieceId]) {
          Object.assign(pieceQuestions, { [pieceId]: [] });
        }
        pieceQuestions[pieceId].push(question);
      });
    });

    return playersQuestions;
  }
);

export { getQuestionsById, getQuestionsByPlayerIdByPieceId };
