/**
 * Routine actions
 */
export const ROUTINE_ADD = 'ROUTINE_ADD';
export const ROUTINE_DELETE = 'ROUTINE_DELETE';

/**
 * Routine action creators
 */
export const addRoutine = id => {
  type: ROUTINE_ADD,
  id,
}
exprot const deleteRoutine = id => {
  type: ROUTINE_DELETE,
  id,
};

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
export const EXERCISE_SKIP = 'EXERCISE_SKIP';
export const EXERCISE_PREVIOUS = 'EXERCISE_PREVIOUS';
export const SET_COMPLETE = 'SET_COMPLETE';
export const SET_FAST_FORWARD = 'SET_FAST_FORWARD';
export const BASELINE_UPDATE = 'UPDATE_BASELINE';

/**
 * Training action creators
 */
export const skipExercise = () => ({
  type: EXERCISE_SKIP,
});
export const previousExercise = () => ({
  type: EXERCISE_PREVIOUS,
});
export const completeSet = () => ({
  type: SET_COMPLETE
});
export const updateBaseline = (id, baseline) => ({
  type: BASELINE_UPDATE,
  baseline,
  id,
});
export const failSet = () => ({
  type: SET_FAIL,
});

/**
 * Sound actions
 */
export const SOUND_QUEUE = 'SOUND_QUEUE';
export const SOUND_REMOVE = 'SOUND_REMOVE';

/**
 * Sound action creators
 */
export const queueSound = sound => ({
  type: SOUND_QUEUE,
  sound,
});
export const removeSound = sound => ({
  type: SOUND_REMOVE,
  sound,
});
