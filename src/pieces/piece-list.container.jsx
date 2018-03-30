// @flow
import { connect } from 'react-redux';
import PieceList from './piece-list.component';
import actions from '../redux-store/actions';

function mapStateToProps(state) {
  return {
    groups: state.pieces
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

const PieceListContainer = connect(mapStateToProps, mapDispatchToProps)(
  PieceList
);

export default PieceListContainer;
