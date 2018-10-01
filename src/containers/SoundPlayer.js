import { Component } from 'react';
import Sound from 'react-native-sound';
import { connect } from 'react-redux';
import { SOUND_ID_ONE, SOUND_ID_TWO, SOUND_ID_THREE, SOUND_ID_TICK } from '../constants';
import { playSound } from '../actions';

import one from '../assets/sounds/one.wav';
import two from '../assets/sounds/two.wav';
import three from '../assets/sounds/three.wav';
import tick from '../assets/sounds/tick.wav';
// const one = 'one.wav';
// const two = 'two.wav';
// const three = 'three.wav';
// const tick = 'tick.wav';

const soundsMapping = {
  SOUND_ID_ONE: one,
  SOUND_ID_TWO: two,
  SOUND_ID_THREE: three,
  SOUND_ID_TICK: tick,
};

class SoundPlayer extends Component {
  componentDidMount() {
    Sound.setCategory('Playback');
    this.sounds = {};
    for (const [key, soundFile] of Object.entries(soundsMapping)) {
      this.loadSound(soundFile, key);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.pendingSounds.length < this.props.pendingSounds.length) {
      this.playSound(this.props.pendingSounds[0]);
    }
  }

  componentWillUnmount() {
    this.releaseSounds();
  }

  loadSound(sound, soundKey) {
    const soundObj = new Sound(sound, error => {
      if (error) {
        console.log('Failed to load the sound', error);
        return;
      }
      console.log(`Sound loaded: ${soundKey}`);
      this.sounds[soundKey] = soundObj;
    });
  }

  playSound(soundId) {
    const soundObj = this.sounds[soundId];
    soundObj.stop(() => {
      soundObj.play();
      this.props.playSound(soundId);
    });
  }

  releaseSounds() {
    for (const [key, soundObj] of Object.entries(this.sounds)) {
      soundObj.release();
      console.log(`Released sound: ${key}`);
    }
  }

  render() {
    return null;
  }
}

export default connect(
  state => ({
    pendingSounds: state.sound.soundQueue,
  }),
  {
    playSound,
  }
)(SoundPlayer);
