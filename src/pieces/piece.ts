import { camelCase } from 'lodash';
import type { PieceType, PieceGroupIdType } from './types';

type Props = {
  name: string;
  groupId: PieceGroupIdType;
};

function Piece({ name, groupId }: Props): PieceType {
  return {
    id: `${groupId}.${camelCase(name)}`,
    name,
  };
}

export default Piece;
