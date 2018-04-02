// @flow
import { connect } from 'react-redux';
import actions from '../redux-store/actions';
import Notes from './notes.component';

function mapStateToProps(state) {
  return {
    isStarted: state.game.isStarted,
    piecesByGroup: state.pieces,
    players: state.players
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onStart() {
      dispatch(actions.game.start());
    },
    onFinish() {
      dispatch(actions.game.finish());
    },
    onStatusToggle(playerId, pieceId) {
      dispatch(actions.players.update({ id: playerId, pieceId, status: true }));
    },
    onAnswer(playerId, pieces, answer) {
      dispatch(actions.questions.add({ playerId, pieces, answer }));
    }
  };
}

const NotesContainer = connect(mapStateToProps, mapDispatchToProps)(Notes);

export default NotesContainer;
