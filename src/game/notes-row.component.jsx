// @flow
import * as React from 'react';

import type { PlayerType, PlayerIdType } from '../players/types/player';
import type { PieceType, PieceIdType } from '../pieces/types/piece';

type Props = {
  piece: PieceType,
  players: PlayerType[],
  selectedPlayerId: ?PlayerIdType,
  isSelected: boolean,
  onPieceToggle: (PieceIdType) => void,
  onStatusToggle: (PieceIdType, PlayerIdType) => void
};

const statusMap = {
  undefined: 'fa-question',
  true: 'fa-check'
};

class NotesRow extends React.Component<Props> {
  handlePieceToggle = () => {
    const { piece, onPieceToggle } = this.props;
    onPieceToggle(piece.id);
  };

  handleStatusToggle = (evt: SyntheticEvent<HTMLButtonElement>) => {
    const playerId = evt.currentTarget.getAttribute('data-player-id');
    const { piece, onStatusToggle } = this.props;

    if (typeof playerId === 'string') {
      onStatusToggle(playerId, piece.id);
    }
  };

  render() {
    const { piece, players, isSelected, selectedPlayerId } = this.props;
    const statusNodes = players.map((player) => {
      const isPlayerSelected = selectedPlayerId === player.id;
      const isActive = isSelected && isPlayerSelected;
      const statusIcon = statusMap[String(player.pieces[piece.id])];
      const iconNode = statusIcon && <i className={`fa fa-fw ${statusIcon}`} />;

      return (
        <td
          key={player.id}
          className={`notes-piece-status ${
            isPlayerSelected ? 'secondary' : ''
          }`}
        >
          {isActive ? (
            <button
              className="warning button"
              data-player-id={player.id}
              onClick={this.handleStatusToggle}
            >
              {iconNode}
            </button>
          ) : (
            iconNode
          )}
        </td>
      );
    });

    return (
      <tr className={`${isSelected ? 'secondary' : ''} notes-piece`}>
        <td className="notes-piece-name">
          <button
            className="clear button expanded"
            onClick={this.handlePieceToggle}
          >
            {piece.name}
          </button>
        </td>
        {statusNodes}
      </tr>
    );
  }
}

export default NotesRow;
