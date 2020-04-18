// @flow
import type { PlayerType, PlayerIdType, PlayerNameType } from './types';

type Props = {
  id: PlayerIdType,
  name: PlayerNameType,
  isProtected: boolean,
};

function Player({ id, name, isProtected = false }: Props): PlayerType {
  return {
    id,
    name,
    isProtected,
    pieces: {},
  };
}

export default Player;
