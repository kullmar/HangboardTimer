import { Component } from 'react';
import { SOUND_ID_ONE, SOUND_ID_TWO, SOUND_ID_THREE, SOUND_ID_TICK } from '../constants';

class HangboardSound extends Component {
  componentDidMount() {
    this.isFirstSound = true;
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
          this.playSound(SOUND_ID_THREE);
          break;
        case 2:
          this.playSound(SOUND_ID_TWO);
          break;
        case 1:
          this.playSound(SOUND_ID_ONE);
          break;
        default:
          this.playSound(SOUND_ID_TICK);
      }
    }
  }

  componentWillUnmount() {
    this.releaseSounds();
  }

  playSound(soundId) {
    this.props.queueSound(soundId);
  }

  render() {
    return null;
  }
}

export default HangboardSound;
