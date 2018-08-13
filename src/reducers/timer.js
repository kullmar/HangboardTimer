import { TOGGLE_TIMER, SET_TIME } from '../actions';

const initialState = {
  time: 0,
  active: false,
};

const timer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_TIMER:
      return ({
        ...state,
        active: !state.active,
      });
    case SET_TIME:
      return ({
        ...state,
        time: action.time,
      });
    default:
      return state;
  }
};

export default timer;
