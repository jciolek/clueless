// @flow
import { connect } from 'react-redux';
import actions from '../redux-store/actions';
import App from './app.component';

function mapDispatchToProps(dispatch) {
  return {
    onNavigate(route) {
      dispatch(actions.router.navigate({ route }));
    }
  };
}

const AppContainer = connect(undefined, mapDispatchToProps)(App);

export default AppContainer;
