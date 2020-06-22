export type PieceType = {
  id: string;
  name: string;
  [key: string]: any;
};

export type PieceGroupIdType = 'weapons' | 'suspects' | 'locations';

export type PieceGroupType<T extends PieceGroupIdType> = {
  id: T;
  name: string;
  items: PieceType[];
};

function isPieceGroupId(id: string): id is PieceGroupIdType {
  return ['weapons', 'suspects', 'locations'].includes(id);
}

export { isPieceGroupId };
