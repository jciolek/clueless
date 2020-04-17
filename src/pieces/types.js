// @flow

export type PieceIdType = string;
export type PieceNameType = string;
export type PieceType = {
  id: PieceIdType,
  name: PieceNameType,
  [string]: any
};

export type PieceGroupIdType = string;
export type PieceGroupNameType = string;
export type PieceGroupType = {
  id: PieceGroupIdType,
  name: PieceGroupNameType,
  items: PieceType[]
};
