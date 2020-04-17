// @flow
import _ from 'lodash';

import type { PieceIdType, PieceNameType } from './types';

type Props = {
  name: PieceNameType,
  groupId: PieceIdType
};

function Piece({ name, groupId }: Props) {
  return {
    id: `${groupId}.${_.camelCase(name)}`,
    name
  };
}

export default Piece;
