// @flow
import type { PieceType } from './piece';

export type PieceGroupIdType = string;
export type PieceGroupNameType = string;
export type PieceGroupType = {
  id: PieceGroupIdType,
  name: PieceGroupNameType,
  items: PieceType[]
};
