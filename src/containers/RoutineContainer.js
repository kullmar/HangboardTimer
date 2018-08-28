import { connect } from 'react-redux';
import Routine from '../components/Routine';

const mapStateToProps = state => ({ routine: state.workout.routine });

export default connect(
  mapStateToProps,
  null,
)(Routine);