// @flow
import type { PieceIdType } from '../../pieces/types/piece';
import type { PlayerIdType } from '../../players/types/player';

export type QuestionIdType = string;
export type QuestionPiecesType = PieceIdType[];
export type QuestionType = {
  id: QuestionIdType,
  playerId: PlayerIdType,
  pieces: QuestionPiecesType
};
export type QuestionAnswerType = 0 | 1 | PieceIdType;
