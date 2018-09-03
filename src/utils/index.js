/**
 * Returns the exercise for given set.
 * @param  {[type]} routine   [description]
 * @param  {[type]} setNumber [description]
 * @return {[type]}           [description]
 */
export const getExercise = (routine, exerciseNo) => routine.exercises[exerciseNo - 1];

/**
 * Creates a hangboard routine from a template
 * @param  {[type]} profile [description]
 * @return {[type]}         [description]
 */
export const createRoutine = profile => {
  if (!profile) return;
  const {
    name, sets, hangTime, restTime, warmupSets, exercises,
  } = profile;
  const baseSet = {
    finalRest: 180000,
    hangTime,
    restTime,
    reps: 7,
  };
  const routine = {}
  routine.name = name;
  routine.sets = [];
  exercises.forEach((exercise, index) => {
    let repsMultiplier = 1;
    let weightMultiplier = 5;
    let numSets = sets;
    if (index === 0) {
      repsMultiplier = 2;
      weightMultiplier = 10;
      numSets = warmupSets;
    }
    for (let i = 0; i < numSets; ++i) {
      const set = Object.assign({}, baseSet);
      set.reps -= repsMultiplier * i;
      set.grip = exercise.grip;
      set.weight = exercise.baseline + i * weightMultiplier;
      routine.sets.push(set);
    }
  });
  return routine;
}