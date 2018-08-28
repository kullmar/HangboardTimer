import { TIMER_COMPLETE, SET_SKIP, SET_PREVIOUS } from '../actions';

import defaultProfile from '../profiles/intermediate.json';

const defaultRoutine = createRoutine(defaultProfile);

const initialState = {
  routine: defaultRoutine,
  currentSet: 1,
  currentRep: 1,
  resting: false,
};

const workout = (state = initialState, action) => {
  const set = getCurrentSet(state);
  switch(action.type) {
    case TIMER_COMPLETE:
      if (!state.resting) {
        return ({
          ...state,
          resting: !state.resting,
        });
      }
      const shouldIncrementSet = state.currentRep % set.reps === 0 ? true : false;
      const newRep = shouldIncrementSet ? 1 : state.currentRep % set.reps + 1;
      const newSet = shouldIncrementSet ? state.currentSet + 1 : state.currentSet;
      return ({
        ...state,
        currentRep: newRep,
        currentSet: newSet,
        resting: !state.resting,
      });
    case SET_SKIP:
      return({
        ...state,
        currentRep: set.reps,
        resting: true,
      });
    case SET_PREVIOUS:
    default:
      return state;
  }
};

export default workout;

const getCurrentSet = state => state.routine.sets[state.currentSet - 1];

export const getInitialTime = state => state.routine.sets[state.currentSet].hangTime;

function createRoutine(profile) {
  if (!profile) return;
  const {
    name, sets, hangTime, restTime, warmupSets, exercises,
  } = profile;
  const baseSet = {
    finalRest: 180000,
    hangTime,
    restTime,
    reps: 7,
  };
  const routine = {}
  routine.name = name;
  routine.sets = [];
  exercises.forEach((exercise, index) => {
    let repsMultiplier = 1;
    let weightMultiplier = 5;
    let numSets = sets;
    if (index === 0) {
      repsMultiplier = 2;
      weightMultiplier = 10;
      numSets = warmupSets;
    }
    for (let i = 0; i < numSets; ++i) {
      const set = Object.assign({}, baseSet);
      set.reps -= repsMultiplier * i;
      set.grip = exercise.grip;
      set.weight = exercise.baseline + i * weightMultiplier;
      routine.sets.push(set);
    }
  });
  return routine;
}
