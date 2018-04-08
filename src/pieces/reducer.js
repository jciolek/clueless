import { handleActions } from 'redux-actions';
import { types } from '../redux-store/actions';
import Piece from './piece';

const defaultPieces = [
  {
    id: 'suspects',
    name: 'Suspects',
    items: ['White', 'Green', 'Mustard', 'Scarlet', 'Peacock', 'Plum']
  },
  {
    id: 'weapons',
    name: 'Weapons',
    items: ['Candlestick', 'Dagger', 'Wrench', 'Rope', 'Lead pipe', 'Pistol']
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
      'Study'
    ]
  }
].map((group) => ({
  ...group,
  items: group.items.map((item) => Piece({ groupId: group.id, name: item }))
}));

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
        items: group.items.concat(Piece({ name, groupId }))
      }));
    },
    [types.PIECES.REPLACE](state, action) {
      const { id, name } = action.payload;
      const [groupId] = id.split('.');

      return selectMap(state, groupId, (group) => ({
        ...group,
        items: group.items.map(
          (item) => (item.id !== id ? item : Piece({ name, groupId }))
        )
      }));
    },
    [types.PIECES.REMOVE](state, action) {
      const { id } = action.payload;
      const [groupId] = id.split('.');

      return selectMap(state, groupId, (group) => ({
        ...group,
        items: group.items.filter((item) => item.id !== id)
      }));
    }
  },
  defaultPieces
);

export default reducer;
