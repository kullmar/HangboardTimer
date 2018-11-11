import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { persistReducer } from 'redux-persist';
import {
  TIMER_COMPLETE,
  SET_FAIL,
  EXERCISE_SKIP,
  EXERCISE_PREVIOUS,
  BASELINE_UPDATE
} from '../actions';

import defaultProfile from '../profiles/intermediate.json';

const initialState = {
  routine: defaultProfile,
  currentExercise: 1,
  currentSet: 1,
  currentRep: 1,
  resting: false,
  showUpdateBaseline: false
};

const workout = (state = initialState, action) => {
  switch (action.type) {
    case TIMER_COMPLETE:
      return getNextStateFromComplete(state);
    case SET_FAIL:
      return getNextStateFromFail(state);
    case EXERCISE_SKIP:
      return getNextStateFromSkip(state);
    case EXERCISE_PREVIOUS:
      return getNextStateFromPrevious(state);
    case BASELINE_UPDATE:
      let newRoutine = { ...state.routine };
      newRoutine.exercises[action.id].baseline = action.baseline;
      return {
        ...state,
        routine: newRoutine,
        showUpdateBaseline: false,
      };
    default:
      return state;
  }
};

const getNextStateFromComplete = state => {
  const isLastRep = state.currentRep % getNumberOfReps(state) === 0;
  const exercise = getCurrentExercise(state);
  const isLastSet = state.currentSet % exercise.sets === 0;
  const shouldIncrementSet = isLastRep && state.resting;
  const newRep = shouldIncrementSet
    ? 1
    : state.resting
      ? state.currentRep + 1
      : state.currentRep;
  const newSet = shouldIncrementSet
    ? (state.currentSet % exercise.sets) + 1
    : state.currentSet;
  const newExercise =
    shouldIncrementSet && isLastSet
      ? state.currentExercise + 1
      : state.currentExercise;
  const showUpdateBaseline = isLastRep && isLastSet && !state.resting;
  return {
    ...state,
    currentExercise: newExercise,
    currentRep: newRep,
    currentSet: newSet,
    resting: !state.resting,
    showUpdateBaseline
  };
}

const getNextStateFromSkip = state => {
  const exercise = getCurrentExercise(state);
  return {
    ...state,
    currentExercise: Math.min(state.currentExercise + 1, state.routine.exercises.length),
    currentRep: 1,
    currentSet: 1,
    resting: false,
  };
};

const getNextStateFromFail = state => ({
  ...state,
  currentRep: getNumberOfReps(state),
  resting: true,
  showUpdateBaseline: true,
});

const getNextStateFromPrevious = state => ({
  ...state,
  currentRep: 1,
  currentSet: 1,
  currentExercise: Math.max(state.currentExercise - 1, 1),
  resting: false,
});

export const getNumberOfReps = state =>
  state.routine.repsBase -
  (state.currentSet - 1) * state.routine.repsDecrementPerSet;
export const getCurrentExercise = state =>
  state.routine.exercises[state.currentExercise - 1];
export const getInitialTime = state =>
  state.routine.exercise[state.currentSet].hangTime;

const persistConfig = {
  key: 'workout',
  storage: storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ['routine']
};

export default persistReducer(persistConfig, workout);
