export type PieceType = {
  id: string;
  name: string;
  [key: string]: any;
};

export type PieceGroupType = {
  id: string;
  name: string;
  items: PieceType[];
};
