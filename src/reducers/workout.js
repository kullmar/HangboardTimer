import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { persistReducer } from 'redux-persist';
import {
  TIMER_COMPLETE,
  SET_SKIP,
  SET_PREVIOUS,
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
  const exercise = getCurrentExercise(state);
  switch (action.type) {
    case TIMER_COMPLETE:
      const isLastRep = state.currentRep % getNumberOfReps(state) === 0;
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
        shouldIncrementSet && newSet === 1
          ? state.currentExercise + 1
          : state.currentExercise;
      const showUpdateBaseline = isLastRep && !state.resting;
      return {
        ...state,
        currentExercise: newExercise,
        currentRep: newRep,
        currentSet: newSet,
        resting: !state.resting,
        showUpdateBaseline
      };
    case SET_SKIP:
      return {
        ...state,
        currentRep: getNumberOfReps(state),
        resting: true
      };
    case BASELINE_UPDATE:
      let newRoutine = { ...state.routine };
      newRoutine.exercise[action.id].baseline = action.baseline;
      return {
        ...state,
        routine: newRoutine,
        showUpdateBaseline: false
      };
    case SET_PREVIOUS:
    default:
      return state;
  }
};

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
