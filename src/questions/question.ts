import type { QuestionType, QuestionPiecesType } from './types';

type Props = {
  id: string;
  playerId: string;
  pieces: QuestionPiecesType;
};

function Question({ id, playerId, pieces }: Props): QuestionType {
  return {
    id,
    playerId,
    pieces,
  };
}

export default Question;
