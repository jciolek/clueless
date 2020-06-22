import _ from 'lodash';
import type { PieceGroupIdType } from './types';

type Props = {
  name: string;
  groupId: PieceGroupIdType;
};

function Piece({ name, groupId }: Props) {
  return {
    id: `${groupId}.${_.camelCase(name)}`,
    name,
  };
}

export default Piece;
