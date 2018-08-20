import { TIMER_COMPLETE } from '../actions';

const initialState = {
  currentSet: 1,
  currentRep: 1,
  duration: 10,
  resting: false,
};

const training = (state = initialState, action) => {
  switch(action.type) {
    case TIMER_COMPLETE:
      return ({
        ...state,
        resting: !state.resting,
      });
    default:
      return state;
  }
};

export default training;
