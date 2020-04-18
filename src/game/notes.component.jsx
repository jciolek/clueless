// @flow
import * as React from 'react';
import NotesRow from './notes-row.component';
import type {
  PieceIdType,
  PieceGroupType,
  PieceGroupIdType,
} from '../pieces/types';
import type { PlayerType, PlayerIdType } from '../players/types';
import type {
  QuestionType,
  QuestionPiecesType,
  QuestionAnswerType,
} from '../questions/types';

type Props = {
  piecesByGroup: PieceGroupType[],
  questionsByPlayerIdByPieceId: {
    [PlayerIdType]: {
      [PieceIdType]: QuestionType[],
    },
  },
  murderPiecesById: {
    [PieceIdType]: ?boolean,
  },
  players: PlayerType[],
  isStarted: boolean,
  isQuestion: boolean,
  hasUndo: boolean,
  hasRedo: boolean,
  onStart: () => void,
  onFinish: () => void,
  onUndo: () => void,
  onRedo: () => void,
  onAnswer: (PlayerIdType, QuestionPiecesType, QuestionAnswerType) => void,
  onPlayerToggle: (PlayerIdType) => void,
  onPieceToggle: (PieceIdType) => void,
  onAllPiecesUnselect: () => void,
  onStatusToggle: (PlayerIdType, PieceIdType) => void,
  selectedPlayerId: ?PlayerIdType,
  selectedPieceIds: {
    [PieceGroupIdType]: PieceIdType,
  },
};

class Notes extends React.Component<Props> {
  getPlayersRow() {
    const { players, selectedPlayerId, isQuestion } = this.props;
    const playerNodes = players.map((player) => (
      <th key={player.id} className="notes-player">
        <button
          type="button"
          className={`button ${
            selectedPlayerId === player.id ? 'warning' : 'clear'
          }`}
          data-player-id={player.id}
          onClick={this.handlePlayerToggleClick}
        >
          {player.name}
        </button>
        {isQuestion && selectedPlayerId === player.id && (
          <>
            <button
              type="button"
              className="clear button"
              data-answer={1}
              onClick={this.handleAnswerClick}
            >
              1
            </button>
            <button
              type="button"
              className="clear button"
              data-answer={0}
              onClick={this.handleAnswerClick}
            >
              0
            </button>
          </>
        )}
      </th>
    ));

    return (
      <tr>
        <td className="notes-piece-name-placeholder" />
        {playerNodes}
      </tr>
    );
  }

  getGroupRows = (group: PieceGroupType) => {
    const {
      players,
      questionsByPlayerIdByPieceId,
      murderPiecesById,
      selectedPlayerId,
      selectedPieceIds: { [group.id]: selectedPieceId },
    } = this.props;
    const notesRowNodes = group.items.map((piece) => (
      <NotesRow
        key={piece.id}
        piece={piece}
        murderStatus={murderPiecesById[piece.id]}
        players={players}
        selectedPlayerId={selectedPlayerId}
        questionsByPlayerIdByPieceId={questionsByPlayerIdByPieceId}
        onPieceToggle={this.handlePieceToggle}
        onStatusToggle={this.handleStatusToggle}
        isSelected={selectedPieceId === piece.id}
      />
    ));

    return (
      <React.Fragment key={group.id}>
        <tr>
          <th className="notes-group-heading" colSpan={players.length + 1}>
            {group.name}
          </th>
        </tr>
        {notesRowNodes}
      </React.Fragment>
    );
  };

  handleAnswerClick = (evt: SyntheticEvent<HTMLButtonElement>) => {
    const answer = +evt.currentTarget.getAttribute('data-answer');

    if (answer === 0 || answer === 1) {
      this.handleAnswer(answer);
    }
  };

  handleAnswer = (answer: QuestionAnswerType) => {
    const {
      onAnswer,
      onPlayerToggle,
      onAllPiecesUnselect,
      selectedPlayerId: playerId,
      selectedPieceIds,
      isQuestion,
    } = this.props;
    const pieceIds = Object.keys(selectedPieceIds).map(
      (groupId) => selectedPieceIds[groupId]
    );

    if (playerId && isQuestion) {
      onAnswer(playerId, pieceIds, answer);
      onPlayerToggle(playerId);

      if (answer !== 0) {
        onAllPiecesUnselect();
      }
    }
  };

  handlePieceToggle = (pieceId: PieceIdType) => {
    const { onPieceToggle } = this.props;
    onPieceToggle(pieceId);
  };

  handleStatusToggle = (playerId: PlayerIdType, pieceId: PieceIdType) => {
    const { onStatusToggle, onPieceToggle, isQuestion } = this.props;

    if (isQuestion) {
      this.handleAnswer(pieceId);
    } else {
      onStatusToggle(playerId, pieceId);
      onPieceToggle(pieceId);
    }
  };

  handlePlayerToggleClick = (evt: SyntheticEvent<HTMLButtonElement>) => {
    const playerId = evt.currentTarget.getAttribute('data-player-id');
    const { onPlayerToggle } = this.props;

    if (typeof playerId === 'string') {
      onPlayerToggle(playerId);
    }
  };

  render() {
    const {
      piecesByGroup,
      players,
      isStarted,
      onStart,
      onFinish,
      hasUndo,
      hasRedo,
      onUndo,
      onRedo,
    } = this.props;
    const playersRowNode = this.getPlayersRow();
    const groupRowNodes = piecesByGroup.map(this.getGroupRows);
    const undoButton = (
      <button
        type="button"
        className="button"
        disabled={!hasUndo}
        onClick={onUndo}
      >
        Undo
      </button>
    );
    const redoButton = (
      <button
        type="button"
        className="button"
        disabled={!hasRedo}
        onClick={onRedo}
      >
        Redo
      </button>
    );

    return !isStarted ? (
      <div className="button-group">
        <button type="button" className="alert button" onClick={onStart}>
          Start the game
        </button>
        {undoButton}
        {redoButton}
      </div>
    ) : (
      <>
        <div className="button-group">
          <button type="button" className="alert button" onClick={onFinish}>
            Finish the game
          </button>
          {undoButton}
          {redoButton}
        </div>
        <table className={`notes unstriped players-${players.length}`}>
          <thead>{playersRowNode}</thead>
          <tbody>{groupRowNodes}</tbody>
        </table>
      </>
    );
  }
}

export default Notes;
