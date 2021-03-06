import { SOUND_DEQUEUE, SOUND_QUEUE } from '../actions';

const SOUNDS = {
  announcerSounds: {
    one: 'one.wav',
    two: 'two.wav',
    three: 'three.wav',
    thirty: '30sec.wav',
  },
  tick: 'tick.wav',
};

const initialState = {
  announcerPath: 'ut2003/evil/',
  basePath: 'assets/sounds/',
  soundQueue: [],
  sounds: SOUNDS,
};

const sound = (state = initialState, action) => {
  switch(action.type) {
    case SOUND_DEQUEUE:
      return ({
        ...state,
        soundQueue: state.soundQueue.slice(1),
      });
    case SOUND_QUEUE:
      return ({
        ...state,
        soundQueue: [...state.soundQueue, action.sound]
      });
    default:
      return state;
  }
}

export default sound;
