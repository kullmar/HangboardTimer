import { TIMER_COMPLETE, SET_SKIP, SET_PREVIOUS } from '../actions';
import { createRoutine } from '../utils';

import defaultProfile from '../profiles/intermediate.json';

const defaultRoutine = createRoutine(defaultProfile);

const initialState = {
  routine: defaultRoutine,
  currentSet: 1,
  currentRep: 1,
  resting: false,
  showUpdateBaseline: false,
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

