/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Player from './player';
import { PlayerType } from './types';

type PlayerSliceState = Array<PlayerType>;

type AddPlayerPayloadType = {
  id?: string;
  name: string;
  isProtected?: boolean;
};

const getAutoid = (() => {
  let autoid = 0;
  return () => {
    autoid += 1;
    return String(autoid);
  };
})();

const initialState: PlayerSliceState = [
  Player({ id: 'table', name: 'Table', isProtected: true }),
  Player({ id: 'me', name: 'Me', isProtected: true }),
];

const slice = createSlice({
  name: 'players',
  reducers: {
    add: {
      reducer(
        state,
        action: PayloadAction<AddPlayerPayloadType & { id: string }>
      ) {
        state.push(Player(action.payload));
      },
      prepare(payload: AddPlayerPayloadType, meta?) {
        return {
          payload: { ...payload, id: payload.id ?? getAutoid() },
          meta,
        };
      },
    },
    rename(state, action: PayloadAction<{ id: string; name: string }>) {
      const { id, name } = action.payload;
      const player = state.find(({ id: currId }) => currId === id);

      if (player) {
        player.name = name;
      }
    },
    remove(state, action: PayloadAction<{ id: string }>) {
      const { id } = action.payload;

      return state.filter((player) => player.id !== id || player.isProtected);
    },
    update(
      state,
      action: PayloadAction<{ id: string; pieceId: string; status: boolean }>
    ) {
      const { id, pieceId, status } = action.payload;
      const player = state.find(({ id: currId }) => currId === id);

      if (player) {
        player.pieces[pieceId] = status;
      }
    },
    reset(state) {
      state.forEach((player) => {
        player.pieces = {};
      });
    },
  },
  initialState,
});

export default slice;
export const { reducer, actions } = slice;
