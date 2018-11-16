import { Component } from 'react';
import Sound from 'react-native-sound';
import { connect } from 'react-redux';
import { SOUND_ID_ONE, SOUND_ID_TWO, SOUND_ID_THREE, SOUND_ID_THIRTY, SOUND_ID_TICK } from '../constants';
import { removeSound } from '../actions';

const soundsMapping = {
  [SOUND_ID_ONE]: one,
  [SOUND_ID_TWO]: two,
  [SOUND_ID_THREE]: three,
  [SOUND_ID_THIRTY]: thirty,
  [SOUND_ID_TICK]: tick,
};

async const importSound = path => {
  import(path)
    .then(sound => sound)
    .catch(err => console.log(err));
}

class SoundPlayer extends Component {
  componentDidMount() {

    this.initializeSounds();
  }

  componentDidUpdate(prevProps) {
    // A new sound has been queued
    if (prevProps.pendingSounds.length < this.props.pendingSounds.length) {
      this.playSound(this.props.pendingSounds[0]);
    }
  }

  componentWillUnmount() {
    this.releaseAllSounds();
  }

  async initializeSounds() {
    Sound.setCategory('Playback');
    this.sounds = {};
    const { basePath, announcerPath } = this.props;
    for (const [key, soundFile] of Object.entries(this.props.sounds.announcerSounds)) {
      importSound(`../${basePath}${announcerPath}${soundFile}`)
      .then(sound => this.loadSound(sound, key))
    }
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
    this.props.removeSound(soundId);
    console.log(`Playing sound: ${soundId}`);
    const soundObj = this.sounds[soundId];
    if (!soundObj) return;
    soundObj.play();
  }

  releaseAllSounds() {
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
    announcerPath: state.sound.announcerPath,
    basePath: state.sound.basePath,
    pendingSounds: state.sound.soundQueue,
    sounds: state.sound.sounds,
  }),
  {
    removeSound,
  }
)(SoundPlayer);
