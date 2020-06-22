/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PieceGroupType, PieceGroupIdType, isPieceGroupId } from './types';
import Piece from './piece';

type State = [
  PieceGroupType<'suspects'>,
  PieceGroupType<'weapons'>,
  PieceGroupType<'locations'>
];

const initialState: State = [
  {
    id: 'suspects',
    name: 'Suspects',
    items: [
      'White',
      'Green',
      'Mustard',
      'Scarlet',
      'Peacock',
      'Plum',
    ].map((name) => Piece({ groupId: 'suspects', name })),
  },
  {
    id: 'weapons',
    name: 'Weapons',
    items: [
      'Candlestick',
      'Dagger',
      'Wrench',
      'Rope',
      'Lead pipe',
      'Pistol',
    ].map((name) => Piece({ groupId: 'weapons', name })),
  },
  {
    id: 'locations',
    name: 'Locations',
    items: [
      'Living room',
      'Dining room',
      'Games room',
      'Courtyard',
      'Bathroom',
      'Bedroom',
      'Garage',
      'Kitchen',
      'Study',
    ].map((name) => Piece({ groupId: 'locations', name })),
  },
];

function findGroup(state: State, groupId: PieceGroupIdType) {
  return state.find(({ id }) => id === groupId) as PieceGroupType<
    PieceGroupIdType
  >;
}

const slice = createSlice({
  name: 'pieces',
  reducers: {
    add(
      state,
      action: PayloadAction<{ groupId: PieceGroupIdType; name: string }>
    ) {
      const { groupId, name } = action.payload;

      findGroup(state, groupId).items.push(Piece({ groupId, name }));
    },
    replace(state, action: PayloadAction<{ id: string; name: string }>) {
      const { id, name } = action.payload;
      const [groupId] = id.split('.');

      if (!isPieceGroupId(groupId)) {
        throw new Error(`${groupId} is not a correct group id.`);
      }

      const group = findGroup(state, groupId);

      group.items = group.items.map((item) =>
        item.id === id ? Piece({ groupId, name }) : item
      );
    },
    remove(state, action: PayloadAction<{ id: string }>) {
      const { id } = action.payload;
      const [groupId] = id.split('.');

      if (!isPieceGroupId(groupId)) {
        throw new Error(`${groupId} is not a correct group id.`);
      }

      const group = findGroup(state, groupId);

      group.items = group.items.filter((item) => item.id !== id);
    },
  },
  initialState,
});

export default slice;
export const { reducer, actions } = slice;
