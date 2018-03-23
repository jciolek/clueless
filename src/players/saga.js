import { takeEvery, select, all, put } from 'redux-saga/effects';
import actions, { types } from '../redux-store/actions';
import { getPlayersIds } from './selectors';
import { getQuestionsByPlayerIdByPieceId } from '../questions/selectors';

function* watchPlayersUpdate() {
  yield takeEvery(types.PLAYERS.UPDATE, function* playersUpdate(action) {
    const { id, pieceId, status } = action.payload;
    const playerIds = yield select(getPlayersIds);
    const { [id]: { [pieceId]: questions = [] } } = yield select(
      getQuestionsByPlayerIdByPieceId
    );

    if (!status) {
      // The player hasn't got the piece, so all of their related questions
      // have to be updated and maybe we'll get lucky.
      yield all(
        questions.map((question) =>
          put(actions.questions.update({ id: question.id, pieceId }))
        )
      );
      return;
    }

    // The player has got the piece, so:
    // - all of their questions pertaining that piece can be removed...
    yield all(
      questions.map((question) =>
        put(actions.questions.remove({ id: question.id }))
      )
    );

    // -  all of the other players have to be updated.
    yield all(
      playerIds.filter((playerId) => playerId !== id).map((playerId) =>
        put(
          actions.players.update({
            id: playerId,
            pieceId,
            status: false
          })
        )
      )
    );
  });
}

function* saga() {
  yield all([watchPlayersUpdate()]);
}

export default saga;
export { watchPlayersUpdate };
