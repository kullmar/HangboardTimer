/**
 * Timer actions
 */
export const TIMER_SET = 'TIMER_SET';
export const TIMER_TICK = 'TIMER_TICK';
export const TIMER_TOGGLE = 'TIMER_TOGGLE';
export const TIMER_COMPLETE  = 'TIMER_COMPLETE';

/**
 * Timer action creators
 */
export const setTimer = (time) => ({
  type: TIMER_SET,
  now: Date.now(),
  time,
});
export const tickTimer = () => ({
  type: TIMER_TICK,
  now: Date.now(),
});
export const toggleTimer = () => ({
  type: TIMER_TOGGLE,
  now: Date.now(),
});
export const completeTimer = () => ({
  type: TIMER_COMPLETE,
});

/**
 * Training actions
 */
export const SET_SKIP = 'SET_SKIP';
export const SET_PREVIOUS = 'SET_PREVIOUS';
export const SET_COMPLETE = 'SET_COMPLETE';
export const BASELINE_UPDATE = 'UPDATE_BASELINE';

/**
 * Training action creators
 */
export const skipSet = () => ({
  type: SET_SKIP,
});
export const previousSet = () => ({
  type: SET_PREVIOUS,
});
export const completeSet = () => ({
  type: SET_COMPLETE
});
export const updateBaseline = (id, baseline) => ({
  type: BASELINE_UPDATE,
  baseline,
  id,
});
