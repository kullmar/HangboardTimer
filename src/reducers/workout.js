import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import  { persistReducer } from 'redux-persist';
import { TIMER_COMPLETE, SET_SKIP, SET_PREVIOUS, BASELINE_UPDATE } from '../actions';
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
      const isLastRep = state.currentRep % set.reps === 0;
      const shouldIncrementSet = isLastRep && state.resting;
      const newRep = shouldIncrementSet ? 1 : state.resting ? state.currentRep + 1 : state.currentRep;
      const newSet = shouldIncrementSet ? state.currentSet + 1 : state.currentSet;
      const showUpdateBaseline = isLastRep && !state.resting;
      return ({
        ...state,
        currentRep: newRep,
        currentSet: newSet,
        resting: !state.resting,
        showUpdateBaseline,
      });
    case SET_SKIP:
      return({
        ...state,
        currentRep: set.reps,
        resting: true,
      });
    case BASELINE_UPDATE:
      let newRoutine = {...state.routine};
      newRoutine.sets[action.id].weight = action.baseline;
      return ({
        ...state,
        routine: newRoutine,
        showUpdateBaseline: false,
      });
    case SET_PREVIOUS:
    default:
      return state;
  }
};

export const getCurrentSet = state => state.routine.sets[state.currentSet - 1];
export const getInitialTime = state => state.routine.sets[state.currentSet].hangTime;

const persistConfig = {
  key: 'workout',
  storage: storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ['routine'],
};

export default persistReducer(persistConfig, workout);

