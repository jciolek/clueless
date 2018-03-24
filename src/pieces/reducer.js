import { handleActions } from 'redux-actions';
import { types } from '../redux-store/actions';
import Piece from './piece';

const defaultPieces = [
  {
    id: 'weapons',
    name: 'Weapons',
    items: [
      'Candlestick',
      'Dagger',
      'Wrench',
      'Rope',
      'Lead pipe',
      'Pistol'
    ].map(Piece)
  },
  {
    id: 'suspects',
    name: 'Suspects',
    items: ['White', 'Green', 'Mustard', 'Scarlet', 'Peacock', 'Plum'].map(
      Piece
    )
  },
  {
    id: 'locations',
    name: 'Locations',
    items: [
      'Living room',
      'Dining room',
      'Games room',
      'Courtyard',
      'Bahtroom',
      'Bedroom',
      'Garage',
      'Kitchen',
      'Study'
    ].map(Piece)
  }
];

function selectMap(list, id, mapper) {
  return list.map((item) => {
    if (item.id !== id) {
      return item;
    }

    return mapper(item);
  });
}

const reducer = handleActions(
  {
    [types.PIECES.ADD](state, action) {
      const { groupId, name } = action.payload;

      return selectMap(state, groupId, (group) => ({
        ...group,
        items: group.items.concat(Piece(name))
      }));
    },
    [types.PIECES.REPLACE](state, action) {
      const { id, name } = action.payload;
      const [groupId, pieceId] = id.split('.');

      return selectMap(state, groupId, (group) => ({
        ...group,
        items: group.items.map(
          (item) => (item.id !== pieceId ? item : Piece(name))
        )
      }));
    },
    [types.PIECES.REMOVE](state, action) {
      const { id } = action.payload;
      const [groupId, pieceId] = id.split('.');

      return selectMap(state, groupId, (group) => ({
        ...group,
        items: group.items.filter((item) => item.id !== pieceId)
      }));
    }
  },
  defaultPieces
);

export default reducer;
