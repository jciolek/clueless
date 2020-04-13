// @flow
import { connect } from 'react-redux';
import PieceList from './piece-list.component';
import actions from '../redux-store/actions';

function mapStateToProps(state) {
  return {
    groups: state.pieces,
    isStarted: state.game.isStarted
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onAdd(groupId, name) {
      dispatch(actions.pieces.add({ groupId, name }));
    },
    onSave(id, name) {
      dispatch(actions.pieces.replace({ id, name }));
    },
    onRemove(id) {
      dispatch(actions.pieces.remove({ id }));
    }
  };
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  const props = {
    ...ownProps,
    ...stateProps,
    ...(!stateProps.isStarted ? dispatchProps : null)
  };

  delete props.isStarted;
  return props;
}

const PieceListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(PieceList);

export default PieceListContainer;
