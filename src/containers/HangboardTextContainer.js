import { connect } from 'react-redux';
import HangboardText from '../components/HangboardText';
import { getExercise } from '../utils';

const mapStateToProps = state => {
  const { workout } = state;
  const { currentRep, currentSet, routine } = workout;
  const exercise = getExercise(routine, currentSet);
  const { grip, weight, reps } = exercise;
  const sets = routine.sets.length;
  return {
    currentRep,
    currentSet,
    grip,
    totalReps: reps,
    totalSets: sets,
    weight,
  };
}

export default connect(
  mapStateToProps,
  null,
)(HangboardText);
