import { END_TIMER } from '../actions';

const initialState = {
  currentSet: 1,
  currentRep: 1,
  resting: false,
};

const training = (state = initialState, action) => {
  switch(action.type) {
    case END_TIMER:
      
    default:
      return state;
  }
};
