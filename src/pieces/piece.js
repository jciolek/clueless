import _ from 'lodash';

function Piece(name) {
  return {
    id: _.camelCase(name),
    name
  };
}

export default Piece;
