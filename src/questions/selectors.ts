import { createSelector } from 'reselect';
import { getPlayersIds } from '@/players/selectors';
import type { StateType } from '@/redux-store/types';
import type { Dictionary } from '@reduxjs/toolkit';
import type { QuestionType } from './types';

const getQuestionsById = createSelector(
  (state: StateType) => state.questions,
  (questions) =>
    Object.fromEntries(questions.map((question) => [question.id, question]))
);

const getQuestionsByPlayerIdByPieceId = createSelector(
  (state: StateType) => state.questions,
  getPlayersIds,
  (questions, playerIds) => {
    const questionsByPlayerIdByPieceId = Object.fromEntries<
      Dictionary<Array<QuestionType>>
    >(playerIds.map((playerId) => [playerId, {}]));

    questions.forEach((question) => {
      const { playerId, pieces } = question;
      const questionsByPieceId = questionsByPlayerIdByPieceId[playerId];

      pieces.forEach((pieceId) => {
        const pieceQuestions = questionsByPieceId[pieceId] || [];

        pieceQuestions.push(question);
        questionsByPieceId[pieceId] = pieceQuestions;
      });
    });

    return questionsByPlayerIdByPieceId;
  }
);

export { getQuestionsById, getQuestionsByPlayerIdByPieceId };
