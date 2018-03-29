// @flow
export type PlayerType = {
  id: string,
  name: string,
  isProtected: boolean,
  pieces: { [pieceId: string]: boolean }
};
type Props = {
  id: string,
  name: string,
  isProtected: boolean
};

function Player({ id, name, isProtected = false }: Props): PlayerType {
  return {
    id,
    name,
    isProtected,
    pieces: {}
  };
}

export default Player;
