// @flow
import { connect } from 'react-redux';
import List from '../item-list/list.component';
import actions from '../redux-store/actions';

function mapStateToProps(state) {
  return {
    items: state.players
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSave(id, name) {
      const action = actions.players.rename({ id, name });
      dispatch(action);
    },

    onAdd(name) {
      const action = actions.players.add({ name });
      dispatch(action);
    },

    onRemove(id) {
      const action = actions.players.remove({ id });
      dispatch(action);
    }
  };
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return {
    title: 'Players',
    ...ownProps,
    ...stateProps,
    ...dispatchProps
  };
}

const PlayerListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(List);

export default PlayerListContainer;
