// @flow
import type { PieceIdType } from '../pieces/types';

export type PlayerIdType = string;
export type PlayerNameType = string;
export type PlayerPiecesType = { [pieceId: PieceIdType]: boolean };
export type PlayerType = {
  id: PlayerIdType,
  name: PlayerNameType,
  isProtected: boolean,
  pieces: PlayerPiecesType,
};
