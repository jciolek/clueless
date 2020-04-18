// @flow
import * as React from 'react';

import type { PlayerType, PlayerIdType } from '../players/types';
import type { PieceType, PieceIdType } from '../pieces/types';
import type { QuestionType } from '../questions/types';

type Props = {
  piece: PieceType,
  players: PlayerType[],
  selectedPlayerId: ?PlayerIdType,
  isSelected: boolean,
  murderStatus: ?boolean,
  questionsByPlayerIdByPieceId: {
    [PlayerIdType]: {
      [PieceIdType]: QuestionType[],
    },
  },
  onPieceToggle: (PieceIdType) => void,
  onStatusToggle: (PieceIdType, PlayerIdType) => void,
};

const statusMap = {
  undefined: 'fa-question',
  true: 'fa-check',
  questions: 'fa-search',
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
    const {
      piece,
      players,
      isSelected,
      murderStatus,
      selectedPlayerId,
      questionsByPlayerIdByPieceId,
    } = this.props;
    const statusNodes = players.map((player) => {
      const isPlayerSelected = selectedPlayerId === player.id;
      const isActive = isSelected && isPlayerSelected;
      const status = questionsByPlayerIdByPieceId[player.id][piece.id]
        ? 'questions'
        : String(player.pieces[piece.id]);
      const statusIcon = statusMap[status];
      const iconNode =
        !murderStatus && statusIcon ? (
          <i className={`fa fa-fw ${statusIcon}`} />
        ) : (
          '\u00A0'
        );

      return (
        <td
          key={player.id}
          className={`notes-piece-status ${
            isPlayerSelected ? 'secondary' : ''
          }`}
        >
          {isActive ? (
            <button
              type="button"
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
            type="button"
            className={`${murderStatus ? 'alert' : ''} clear button expanded`}
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
