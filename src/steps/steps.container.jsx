import { connect } from 'react-redux';
import Steps from './steps.component';

function mapStateToProps(state) {
  return {
    activeRoute: state.router.activeRoute
  };
}

const StepsContainer = connect(mapStateToProps)(Steps);

export default StepsContainer;
