// @flow
import { connect } from 'react-redux';
import Router from './router.component';
import actions from '../redux-store/actions';

function mapStateToProps(state) {
  return {
    path: state.router.path
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onNavigate(path) {
      dispatch(actions.router.navigate({ path }));
    }
  };
}

const RouterContainer = connect(mapStateToProps, mapDispatchToProps)(Router);

export default RouterContainer;
