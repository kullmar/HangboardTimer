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
      this.sounds = { }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.time !== this.props.time) {

    }
  }

  render() {
    return null;
  }
}
