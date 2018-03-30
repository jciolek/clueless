// @flow
import { connect } from 'react-redux';
import actions from '../redux-store/actions';
import Link from './link.component';

function mapDispatchToProps(dispatch) {
  return {
    onNavigate(route) {
      dispatch(actions.router.navigate({ route }));
    }
  };
}

const LinkContainer = connect(undefined, mapDispatchToProps)(Link);

export default LinkContainer;
