import { combineReducers } from 'redux';
import timer from './timer';
import workout, * as fromWorkout from './workout';
import sound from './sound';

export default combineReducers({
  sound,
  timer,
  workout,
});

export const getInitialTime = state => fromWorkout.getInitialTime(state.workout);
export const getCurrentExercise = state => fromWorkout.getCurrentExercise(state.workout);
export const getNumberOfReps = state => fromWorkout.getNumberOfReps(state.workout);