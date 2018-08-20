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
