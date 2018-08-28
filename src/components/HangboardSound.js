import { Component } from 'react';
import Sound from 'react-native-sound';

import one from '../assets/sounds/one.wav';
import two from '../assets/sounds/two.wav';
import three from '../assets/sounds/three.wav';
import tick from '../assets/sounds/tick.wav';

const SOUND_KEY_ONE = 'one';
const SOUND_KEY_TWO = 'two';
const SOUND_KEY_THREE = 'three';
const SOUND_KEY_TICK = 'tick';

class HangboardSound extends Component {
  componentDidMount() {
  }

  loadSound(sound) {

  }

  componentDidUpdate(prevProps) {
    if (prevProps.seconds !== this.props.seconds) {
      if (this.props.seconds > 10) return;
      switch(this.props.seconds) {
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

  playSound(sound) {

  }

  render() {
    return null;
  }
}
