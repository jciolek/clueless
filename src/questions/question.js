// @flow
import type {
  QuestionType,
  QuestionIdType,
  QuestionPiecesType
} from './types/question';
import type { PlayerIdType } from '../players/types/player';

type Props = {
  id: QuestionIdType,
  playerId: PlayerIdType,
  pieces: QuestionPiecesType
};

function Question({ id, playerId, pieces }: Props): QuestionType {
  return {
    id,
    playerId,
    pieces
  };
}

export default Question;
