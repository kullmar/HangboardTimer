import { connect } from 'react-redux';
import HangboardText from '../components/HangboardText';
import { getExercise } from '../utils';

const mapStateToProps = state => {
  const { workout } = state;
  const { currentRep, currentSet, routine } = workout;
  const exercise = getExercise(routine, currentSet);
  const { grip, weight, reps } = exercise;
  const sets = routine.sets.length;
  const nextExercise = getExercise(routine, currentSet + 1);
  const nextGrip = nextExercise.grip;
  const nextWeight = nextExercise.weight;
  return {
    currentRep,
    currentSet,
    grip,
    nextGrip,
    nextWeight,
    totalReps: reps,
    totalSets: sets,
    weight,
  };
}

export default connect(
  mapStateToProps,
  null,
)(HangboardText);
