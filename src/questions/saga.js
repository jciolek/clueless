import { takeEvery, put, select, all } from 'redux-saga/effects';
import actions from '@/redux-store/actions';
import { getPlayersPiecesByPlayerId } from '@/players/selectors';
import { getQuestionsById } from './selectors';

function* watchQuestionsAdd() {
  yield takeEvery(actions.questions.add.type, function* questionsAdd(action) {
    const { id, answer, pieces, playerId } = action.payload;

    if (typeof answer === 'string') {
      yield put(
        actions.players.update({ id: playerId, pieceId: answer, status: true })
      );
      return;
    }

    if (answer === 0) {
      yield all(
        pieces.map((pieceId) =>
          put(actions.players.update({ id: playerId, pieceId, status: false }))
        )
      );
      return;
    }

    if (answer === 1) {
      const { [playerId]: playerPiecesById = {} } = yield select(
        getPlayersPiecesByPlayerId
      );

      // If the player has got any of the pieces,
      // then this questions is not going to yield more information.
      if (pieces.some((pieceId) => playerPiecesById[pieceId]) === true) {
        yield put(actions.questions.remove({ id }));
        return;
      }

      // Update the question with information about pieces missing by the player.
      // This way we narrow down the scope of the question.
      yield all(
        pieces
          .filter((pieceId) => playerPiecesById[pieceId] === false)
          .map((pieceId) => put(actions.questions.update({ id, pieceId })))
      );
    }
  });
}

function* watchQuestionsUpdate() {
  yield takeEvery(actions.questions.update.type, function* questionsUpdate(
    action
  ) {
    const { id } = action.payload;
    const { [id]: question } = yield select(getQuestionsById);

    if (!question) {
      return;
    }

    const { pieces, playerId } = question;
    // If there is only one piece left in the question,
    // then bingo - that's the one the player had.
    if (pieces.length === 1) {
      const [pieceId] = pieces;

      yield put(actions.questions.remove({ id }));
      yield put(
        actions.players.update({ id: playerId, pieceId, status: true })
      );
    }
  });
}

function* saga() {
  yield all([watchQuestionsAdd(), watchQuestionsUpdate()]);
}

export default saga;
export { watchQuestionsUpdate, watchQuestionsAdd };
