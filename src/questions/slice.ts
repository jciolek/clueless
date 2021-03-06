/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { QuestionType, AddQuestionPayloadType } from './types';
import Question from './question';

type QuestionsSliceState = Array<QuestionType>;

const initialState: QuestionsSliceState = [];

const slice = createSlice({
  name: 'questions',
  reducers: {
    add: {
      reducer(state, action: PayloadAction<AddQuestionPayloadType>) {
        const { answer } = action.payload;
        // We only add to the store question with an answer === 1.
        // That's because other questions (with answer === 0 and typeof answer === 'string')
        // don't have to be stored - they simply serve as a trigger for sagas.
        if (answer === 1) {
          state.push(Question(action.payload));
        }
      },
      prepare(payload: AddQuestionPayloadType, meta?) {
        return {
          payload,
          meta: { ...meta, autoid: true },
        };
      },
    },
    remove(state, action: PayloadAction<{ id: string }>) {
      const { id } = action.payload;

      return state.filter((question) => question.id !== id);
    },
    update(state, action: PayloadAction<{ id: string; pieceId: string }>) {
      const { id, pieceId } = action.payload;
      const question = state.find(({ id: currId }) => id === currId);

      if (question) {
        question.pieces = question.pieces.filter(
          (currId) => currId !== pieceId
        );
      }
    },
    reset() {
      return initialState;
    },
  },
  initialState,
});

export default slice;
export const { reducer, actions } = slice;
