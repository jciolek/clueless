// @flow
import _ from 'lodash';

export type IdType = string;
export type NameType = string;
export type PieceType = {
  id: IdType,
  name: NameType
};

type Props = {
  name: NameType,
  groupId: IdType
};

function Piece({ name, groupId }: Props) {
  return {
    id: `${groupId}.${_.camelCase(name)}`,
    name
  };
}

export default Piece;
