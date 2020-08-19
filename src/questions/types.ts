export type QuestionPiecesType = string[];

export type QuestionType = {
  id: string;
  playerId: string;
  pieces: QuestionPiecesType;
};

export type QuestionAnswerType = 0 | 1 | string;

export type AddQuestionPayloadType = {
  id: string;
  playerId: string;
  answer: QuestionAnswerType;
  pieces: QuestionPiecesType;
};
