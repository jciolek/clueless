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
      const mePieces = playersById.me.pieces;

      Object.keys(player.pieces).forEach((pieceId) => {
        if (!result[pieceId]) {
          Object.assign(result, { [pieceId]: [] });
          // We need to special case the table and me players
          // because we know all of their pieces up front.
          // Please note that the order of the values returned
          // does not have to reflect the order of players.
          if (tablePieces[pieceId] === undefined) {
            result[pieceId].push(false);
          }
          if (mePieces[pieceId] === undefined) {
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
