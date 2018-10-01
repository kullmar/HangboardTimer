import { SOUND_PLAY, SOUND_QUEUE } from '../actions';

const SOUNDS = {
  one: 'one.wav',
  two: 'two.wav',
  three: 'three.wav',
  tick: 'tick.wav',
};

const initialState = {
  basePath: '../assets/sounds/',
  sounds: SOUNDS,
  soundQueue: [],
};

const sound = (state = initialState, action) => {
  switch(action.type) {
    case SOUND_PLAY:
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
