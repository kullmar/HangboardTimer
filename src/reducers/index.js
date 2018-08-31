import { combineReducers } from 'redux';
import timer from './timer';
import workout, * as fromWorkout from './workout';

export default combineReducers({
  timer,
  workout,
});

export const getInitialTime = state => fromWorkout.getInitialTime(state.workout);
export const getCurrentSet = state => fromWorkout.getCurrentSet(state.workout);