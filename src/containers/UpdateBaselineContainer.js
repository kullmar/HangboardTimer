import { connect } from 'react-redux';
import { getExercise } from '../utils';
import UpdateBaseline from '../components/UpdateBaseline';

const mapStateToProps = ({ workout }) => {
  const { routine, currentExercise } = workout;
  const exercise = getExercise(routine, currentExercise);
  const { grip, baseline } = exercise;
  return ({
    grip,
    baseline,
  });
}

export default connect(
  mapStateToProps,
  null,
)(UpdateBaseline);
