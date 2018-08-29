import { Component } from 'react';
import Sound from 'react-native-sound';

const SOUND_KEY_ONE = 'one';
const SOUND_KEY_TWO = 'two';
const SOUND_KEY_THREE = 'three';
const SOUND_KEY_TICK = 'tick';

class HangboardSound extends Component {
  componentDidMount() {
    this.sounds = {};
    this.isFirstSound = true;
    this.loadSound('one.wav', SOUND_KEY_ONE);
    this.loadSound('two.wav', SOUND_KEY_TWO);
    this.loadSound('three.wav', SOUND_KEY_THREE);
    this.loadSound('tick.wav', SOUND_KEY_TICK);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.seconds !== this.props.seconds ||
      (this.isFirstSound && prevProps.active !== this.props.active)
    ) {
      this.isFirstSound = false;
      if (this.props.seconds > 10 || this.props.seconds <= 0) return;
      switch (this.props.seconds) {
        case 3:
          this.playSound(SOUND_KEY_THREE);
          break;
        case 2:
          this.playSound(SOUND_KEY_TWO);
          break;
        case 1:
          this.playSound(SOUND_KEY_ONE);
          break;
        default:
          this.playSound(SOUND_KEY_TICK);
      }
    }
  }

  componentWillUnmount() {
    this.releaseSounds();
  }

  loadSound(sound, soundKey) {
    const soundObj = new Sound(sound, Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('Failed to load the sound', error);
        return;
      }
      console.log(`Sound loaded: ${soundKey}`);
      this.sounds[soundKey] = soundObj;
    });
  }

  playSound(soundKey) {
    const soundObj = this.sounds[soundKey];
    soundObj.stop(() => soundObj.play());
  }

  releaseSounds() {
    for (const sound in Object.values(this.sounds)) {
      sound.release();
    }
  }

  render() {
    return null;
  }
}

export default HangboardSound;
