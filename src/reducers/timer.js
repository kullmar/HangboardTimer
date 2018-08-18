import { TIMER_TOGGLE, TIMER_SET, TIMER_TICK, TIMER_COMPLETE } from '../actions';

const initialState = {
  active: false,
  lastActionAt: undefined,
  timeRemaining: 0,
};

const timer = (state = initialState, action) => {
  switch (action.type) {
    case TIMER_TOGGLE:
      return ({
        ...state,
        active: !state.active,
        lastActionAt: action.now,
      });
    case TIMER_SET:
      return ({
        ...state,
        timeRemaining: action.time,
      });
    case TIMER_TICK:
      return({
        ...state,
        lastActionAt: action.now,
        timeRemaining: state.timeRemaining - (action.now - state.lastActionAt),
      })
    default:
      return state;
  }
};

export default timer;
