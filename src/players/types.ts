export type PlayerPiecesType = { [pieceId: string]: boolean };
export type PlayerType = {
  id: string;
  name: string;
  isProtected: boolean;
  pieces: PlayerPiecesType;
};
