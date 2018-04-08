// @flow
import { connect } from 'react-redux';
import actions from '../redux-store/actions';
import Notes from './notes.component';

function mapStateToProps(state) {
  return {
    isStarted: state.game.isStarted,
    hasUndo: !!state.undoable.past.length,
    hasRedo: !!state.undoable.future.length,
    piecesByGroup: state.pieces,
    players: state.players
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onStart() {
      dispatch(actions.game.start(undefined, { isUndoable: true }));
    },
    onFinish() {
      dispatch(actions.game.finish(undefined, { isUndoable: true }));
    },
    onUndo() {
      dispatch(actions.undoable.undo());
    },
    onRedo() {
      dispatch(actions.undoable.redo());
    },
    onStatusToggle(playerId, pieceId) {
      dispatch(
        actions.players.update(
          { id: playerId, pieceId, status: true },
          { isUndoable: true }
        )
      );
    },
    onAnswer(playerId, pieces, answer) {
      dispatch(
        actions.questions.add(
          { playerId, pieces, answer },
          { isUndoable: true }
        )
      );
    }
  };
}

const NotesContainer = connect(mapStateToProps, mapDispatchToProps)(Notes);

export default NotesContainer;