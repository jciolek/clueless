/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PieceGroupIdType, isPieceGroupId } from '@/pieces/types';

type GameSliceState = {
  isStarted: boolean;
  selectedPlayerId: null | string;
  selectedPieceIds: {
    [key in PieceGroupIdType]?: string;
  };
};

const initialState: GameSliceState = {
  isStarted: false,
  selectedPlayerId: null,
  selectedPieceIds: {},
};

const slice = createSlice({
  name: 'game',
  reducers: {
    start(state) {
      state.isStarted = true;
    },
    finish(state) {
      state.isStarted = false;
    },
    togglePlayer(state, action: PayloadAction<{ id: string }>) {
      const { id } = action.payload;

      state.selectedPlayerId = state.selectedPlayerId === id ? null : id;
    },
    undo(state) {
      return state;
    },
    togglePiece(state, action: PayloadAction<{ id: string }>) {
      const { id } = action.payload;
      const [groupId] = id.split('.');

      if (!isPieceGroupId(groupId)) {
        throw new Error(`${groupId} is not a correct group id.`);
      }

      if (state.selectedPieceIds[groupId] === id) {
        delete state.selectedPieceIds[groupId];
      } else {
        state.selectedPieceIds[groupId] = id;
      }
    },
    unselectAllPieces(state) {
      state.selectedPieceIds = initialState.selectedPieceIds;
    },
  },
  initialState,
});

export default slice;
export const { reducer, actions } = slice;
