import defaultProfile from '../profiles/intermediate.json';

const initialState = createRoutine(defaultProfile);

const routine = (state = initialState, action) => {
  switch(action.type) {
    default:
      return state;
  }
}

export default routine;

function createRoutine(profile) {
  if (!profile) return;
  const {
    name, sets, hangTime, rest, warmupSets, exercises,
  } = profile;
  const baseSet = {
    finalRest: 180,
    hangTime,
    rest,
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