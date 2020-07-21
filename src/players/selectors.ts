import { createSelector } from 'reselect';
import type { StateType } from '@/redux-store/types';

type PlayersPiecesByIdType = {
  [id: string]: Array<boolean>;
};

const getPlayersIds = createSelector(
  (state: StateType) => state.players,
  (players) => players.map((player) => player.id)
);

const getPlayersById = createSelector(
  (state: StateType) => state.players,
  (players) => Object.fromEntries(players.map((player) => [player.id, player]))
);

const getPlayersPiecesByPlayerId = createSelector(
  (state: StateType) => state.players,
  (players) =>
    Object.fromEntries(players.map((player) => [player.id, player.pieces]))
);

const getPlayersPiecesByPieceId = createSelector(
  (state) => state.players,
  getPlayersById,
  (players, playersById) =>
    players.reduce((result: PlayersPiecesByIdType, player) => {
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
  getPlayersPiecesByPieceId,
};
