// @flow
import type { QuestionType, QuestionIdType, QuestionPiecesType } from './types';
import type { PlayerIdType } from '../players/types';

type Props = {
  id: QuestionIdType,
  playerId: PlayerIdType,
  pieces: QuestionPiecesType,
};

function Question({ id, playerId, pieces }: Props): QuestionType {
  return {
    id,
    playerId,
    pieces,
  };
}

export default Question;
