import type { PlayerType } from './types';

type Props = {
  id: string;
  name: string;
  isProtected: boolean;
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
