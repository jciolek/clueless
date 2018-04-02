// @flow
import * as React from 'react';
import NotesRow from './notes-row.component';
import type { PieceIdType } from '../pieces/types/piece';
import type {
  PieceGroupType,
  PieceGroupIdType
} from '../pieces/types/piece-group';
import type { PlayerType, PlayerIdType } from '../players/types/player';
import type {
  QuestionPiecesType,
  QuestionAnswerType
} from '../questions/types/question';

type Props = {
  piecesByGroup: PieceGroupType[],
  players: PlayerType[],
  isStarted: boolean,
  onStart: () => void,
  onAnswer: (PlayerIdType, QuestionPiecesType, QuestionAnswerType) => void,
  onStatusToggle: (PlayerIdType, PieceIdType) => void
};

type State = {
  selectedPlayerId: ?PlayerIdType,
  selectedPieceIds: {
    [PieceGroupIdType]: PieceIdType
  }
};

function getIsQuestion(state, props) {
  return (
    Object.keys(state.selectedPieceIds).length === props.piecesByGroup.length &&
    state.selectedPlayerId !== null
  );
}

class Notes extends React.Component<Props, State> {
  state = {
    selectedPlayerId: null,
    selectedPieceIds: {}
  };

  getPlayersRow() {
    const { players } = this.props;
    const { selectedPlayerId } = this.state;
    const isQuestion = getIsQuestion(this.state, this.props);
    const playerNodes = players.map((player) => (
      <th key={player.id} className="notes-player">
        <button
          className={`button ${
            selectedPlayerId === player.id ? 'warning' : 'clear'
          }`}
          data-player-id={player.id}
          onClick={this.handlePlayerToggle}
        >
          {player.name}
        </button>
        {isQuestion &&
          selectedPlayerId === player.id && (
            <React.Fragment>
              <button
                className="clear button"
                data-answer={1}
                onClick={this.handleAnswer}
              >
                1
              </button>
              <button
                className="clear button"
                data-answer={0}
                onClick={this.handleAnswer}
              >
                0
              </button>
            </React.Fragment>
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
    const { players } = this.props;
    const {
      selectedPlayerId,
      selectedPieceIds: { [group.id]: selectedPieceId }
    } = this.state;
    const notesRowNodes = group.items.map((piece) => (
      <NotesRow
        key={piece.id}
        piece={piece}
        players={players}
        selectedPlayerId={selectedPlayerId}
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

  handleAnswer = (evt: SyntheticEvent<HTMLButtonElement>) => {
    const answer = +evt.currentTarget.getAttribute('data-answer');
    const { onAnswer } = this.props;
    const { selectedPlayerId: playerId, selectedPieceIds } = this.state;
    const pieceIds = Object.keys(selectedPieceIds).map(
      (groupId) => selectedPieceIds[groupId]
    );
    const isQuestion = getIsQuestion(this.state, this.props);

    if (playerId && isQuestion && (answer === 1 || answer === 0)) {
      onAnswer(playerId, pieceIds, answer);
      if (answer === 1) {
        this.setState({
          selectedPlayerId: null,
          selectedPieceIds: {}
        });
      } else {
        this.setState({ selectedPlayerId: null });
      }
    }
  };

  handlePieceToggle = (pieceId: PieceIdType) => {
    const [groupId] = pieceId.split('.');

    this.setState((prevState) => {
      const selectedPieceIds = { ...prevState.selectedPieceIds };

      if (prevState.selectedPieceIds[groupId] !== pieceId) {
        selectedPieceIds[groupId] = pieceId;
      } else {
        delete selectedPieceIds[groupId];
      }

      return { selectedPieceIds };
    });
  };

  handleStatusToggle = (playerId: PlayerIdType, pieceId: PieceIdType) => {
    this.props.onStatusToggle(playerId, pieceId);
    this.setState((prevState) => ({
      selectedPieceIds: {},
      selectedPlayerId: getIsQuestion(prevState, this.props)
        ? null
        : prevState.selectedPlayerId
    }));
  };

  handlePlayerToggle = (evt: SyntheticEvent<HTMLButtonElement>) => {
    const playerId = evt.currentTarget.getAttribute('data-player-id');

    this.setState((prevState) => ({
      selectedPlayerId:
        prevState.selectedPlayerId === playerId ? null : playerId
    }));
  };

  render() {
    const { piecesByGroup, players, isStarted, onStart } = this.props;
    const playersRowNode = this.getPlayersRow();
    const groupRowNodes = piecesByGroup.map(this.getGroupRows);

    return (
      <React.Fragment>
        {!isStarted ? (
          <button className="alert button" onClick={onStart}>
            Start the game
          </button>
        ) : (
          <table className={`notes unstriped players-${players.length}`}>
            <thead>{playersRowNode}</thead>
            <tbody>{groupRowNodes}</tbody>
          </table>
        )}
      </React.Fragment>
    );
  }
}

export default Notes;
