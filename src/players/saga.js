import { takeEvery, select, all, put } from 'redux-saga/effects';
import actions, { types } from '../redux-store/actions';
import { getPlayersIds, getPlayersPiecesByPlayerId } from './selectors';
import { getQuestionsByPlayerIdByPieceId } from '../questions/selectors';
import {
  getPiecesIds,
  getPiecesNumberPerPlayer,
  getPiecesNumberForTable
} from '../pieces/selectors';

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

    const pieceIds = yield select(getPiecesIds);
    const piecesNumberForPlayer =
      id === 'table'
        ? yield select(getPiecesNumberForTable)
        : yield select(getPiecesNumberPerPlayer);
    const { [id]: playerPiecesById } = yield select(getPlayersPiecesByPlayerId);
    const playerPiecesIds = Object.keys(playerPiecesById);
    const playerOwnedPieceIds = playerPiecesIds.filter(
      (playerPieceId) => playerPiecesById[playerPieceId]
    );

    // The player has got the piece, so:
    // - all of their questions pertaining that piece can be removed...
    yield all(
      questions.map((question) =>
        put(actions.questions.remove({ id: question.id }))
      )
    );

    // -  all of the other players have to be updated...
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
    // - check if we know all of the players pieces already.
    if (playerOwnedPieceIds.length === piecesNumberForPlayer) {
      // The player cannot have any more pieces,
      // so we marked all of unknown player's pieces as not had.
      yield all(
        pieceIds
          .filter(
            (localPieceId) => playerPiecesById[localPieceId] === undefined
          )
          .map((localPieceId) =>
            put(
              actions.players.update({
                id,
                pieceId: localPieceId,
                status: false
              })
            )
          )
      );
    }
  });
}

function* saga() {
  yield all([watchPlayersUpdate()]);
}

export default saga;
export { watchPlayersUpdate };
