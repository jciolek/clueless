import { createSelector } from 'reselect';
import { getPlayersPiecesByPieceId } from '../players/selectors';

const getPiecesGroupIds = createSelector(
  (state) => state.pieces,
  (groups) => groups.map((group) => group.id)
);

const getPiecesIdsByGroup = createSelector(
  (state) => state.pieces,
  (groups) => groups.map((group) => group.items.map((piece) => piece.id))
);

const getPiecesIds = createSelector(getPiecesIdsByGroup, (groups) =>
  groups.reduce((result, group) => result.concat(group))
);

const getPiecesNumberPerPlayer = createSelector(
  (state) => state.players,
  getPiecesIds,
  (players, piecesIds) => {
    // We subtract 1, because table does not count as a regular player.
    const playersLength = players.length - 1;
    // We subtract 3, because that's how many pieces are in the envelope.
    const piecesLength = piecesIds.length - 3;

    return Math.floor(piecesLength / playersLength);
  }
);

function getMurderStatus(statusList = [], playerCount) {
  // If any of the players has the piece, then murderer does not have it.
  if (statusList.some((status) => status)) {
    return false;
  }

  // If we don't have information on all the players, then we still don't know.
  if (statusList.length < playerCount) {
    return undefined;
  }

  // Otherwise we found it.
  return true;
}

const getPiecesForMurdererById = createSelector(
  getPiecesIdsByGroup,
  getPlayersPiecesByPieceId,
  (state) => state.players.length,
  (groups, pieces, playerCount) => {
    const statsAll = {};

    groups.forEach((group) => {
      const stats = group.reduce(
        (result, pieceId) => {
          const status = getMurderStatus(pieces[pieceId], playerCount);

          result[status].push(pieceId);

          if (status !== undefined) {
            Object.assign(result.all, {
              [pieceId]: status
            });
          }

          return result;
        },
        { false: [], undefined: [], true: [], all: statsAll }
      );

      if (!stats.true.length && stats.false.length === group.length - 1) {
        const murderPieceId = stats.undefined.pop();
        stats.all[murderPieceId] = true;
      }

      return stats.all;
    });

    return statsAll;
  }
);

export {
  getPiecesIds,
  getPiecesGroupIds,
  getPiecesIdsByGroup,
  getPiecesNumberPerPlayer,
  getPiecesForMurdererById
};
