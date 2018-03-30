// @flow
import { connect } from 'react-redux';
import Route from './route.component';

function mapStateToProps(state) {
  return {
    activeRoute: state.router.activeRoute
  };
}

const RouteContainer = connect(mapStateToProps)(Route);

export default RouteContainer;
