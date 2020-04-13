// @flow
import { connect } from 'react-redux';
import List from '../item-list/list.component';
import actions from '../redux-store/actions';

function mapStateToProps(state) {
  return {
    items: state.players,
    isStarted: state.game.isStarted
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
  const props = {
    title: 'Players',
    ...ownProps,
    ...stateProps,
    ...(!stateProps.isStarted
      ? dispatchProps
      : { onSave: dispatchProps.onSave })
  };

  delete props.isStarted;
  return props;
}

const PlayerListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(List);

export default PlayerListContainer;
