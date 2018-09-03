import { connect } from 'react-redux';
import HangboardText from '../components/HangboardText';
import { getExercise } from '../utils';
import { getNumberOfReps } from '../reducers';

const mapStateToProps = state => {
  const { workout } = state;
  const { currentExercise, currentRep, currentSet, routine } = workout;
  const exercise = getExercise(routine, currentExercise);
  const { grip, baseline } = exercise;
  const { baselineIncrementPerSet } = routine;
  const weight = baseline + (currentSet - 1) * baselineIncrementPerSet;
  const sets = exercise.sets;
  const nextExercise = getExercise(routine, currentExercise + 1);
  const nextGrip = nextExercise.grip;
  const nextWeight = nextExercise.baseline + currentSet * baselineIncrementPerSet;
  return {
    currentRep,
    currentSet,
    grip,
    nextGrip,
    nextWeight,
    totalReps: getNumberOfReps(state),
    totalSets: sets,
    weight,
  };
}

export default connect(
  mapStateToProps,
  null,
)(HangboardText);
