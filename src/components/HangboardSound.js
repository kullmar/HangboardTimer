import { Component } from 'react';
import { SOUND_ID_ONE, SOUND_ID_TWO, SOUND_ID_THREE, SOUND_ID_THIRTY, SOUND_ID_TICK } from '../constants';

class HangboardSound extends Component {
  componentDidMount() {
    this.playSound(this.getCurrentSound());
  }

  componentDidUpdate(prevProps) {
    if (prevProps.seconds !== this.props.seconds) {
      this.playSound(this.getCurrentSound());
    }
  }

  getCurrentSound() {
    let { seconds } = this.props;
    let soundId;
    switch(seconds) {
      case 30:
        soundId = SOUND_ID_THIRTY;
        break;
      case 10:
      case 9:
      case 8:
      case 7:
      case 6:
      case 5:
      case 4:
        soundId = SOUND_ID_TICK;
        break;
      case 3:
        soundId = SOUND_ID_THREE;
        break;
      case 2:
        soundId = SOUND_ID_TWO;
        break;
      case 1:
        soundId = SOUND_ID_ONE;
        break;
      default:
        soundId = null;
        break;
      }
    return soundId;
  }

  playSound(soundId) {
    if (!soundId) return;
    this.props.queueSound(soundId);
  }

  render() {
    return null;
  }
}

export default HangboardSound;
