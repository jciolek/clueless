// @flow
import type { PieceIdType } from '../../pieces/types/piece';

export type PlayerIdType = string;
export type PlayerNameType = string;
export type PlayerType = {
  id: PlayerIdType,
  name: PlayerNameType,
  isProtected: boolean,
  pieces: { [pieceId: PieceIdType]: boolean }
};
