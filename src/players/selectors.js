import { createSelector } from 'reselect';

const getPlayersIds = createSelector(
  (state) => state.players,
  (players) => players.map((player) => player.id)
);

const getPlayersById = createSelector(
  (state) => state.players,
  (players) =>
    players.reduce(
      (result, player) => Object.assign(result, { [player.id]: player }),
      {}
    )
);

const getPlayersPiecesByPlayerId = createSelector(
  (state) => state.players,
  (players) =>
    players.reduce(
      (result, player) => Object.assign(result, { [player.id]: player.pieces }),
      {}
    )
);

const getPlayersPiecesByPieceId = createSelector(
  (state) => state.players,
  getPlayersById,
  (players, playersById) =>
    players.reduce((result, player) => {
      const tablePieces = playersById.table.pieces;

      Object.keys(player.pieces).forEach((pieceId) => {
        if (!result[pieceId]) {
          Object.assign(result, { [pieceId]: [] });
          // We need to special case the table user
          // because we know all of the table's pieces up front.
          if (!tablePieces[pieceId]) {
            result[pieceId].push(false);
          }
        }
        result[pieceId].push(player.pieces[pieceId]);
      });

      return result;
    }, {})
);

export {
  getPlayersIds,
  getPlayersById,
  getPlayersPiecesByPlayerId,
  getPlayersPiecesByPieceId
};
