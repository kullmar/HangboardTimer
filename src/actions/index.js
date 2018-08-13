export const TOGGLE_TIMER = 'TOGGLE_TIMER';
export const END_TIMER = 'END_TIMER';
export const SET_TIME = 'SET_TIME';
export const SKIP_SET = 'SKIP_SET';
export const INCREMENT_REP = 'INCREMENT_REP';
export const TOGGLE_REST = 'TOGGLE_REST';

export const setTime = (time) => ({
  type: SET_TIME,
  time,
});
export const endTimer = () => ({ type: END_TIMER });
export const incrementRep = () => ({ type: INCREMENT_REP });
export const toggleTimer = () => ({ type: TOGGLE_TIMER });
export const skipSet = () => ({ type: SKIP_SET });
