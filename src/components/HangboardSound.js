import { Component } from 'react';
import { SOUND_ID_ONE, SOUND_ID_TWO, SOUND_ID_THREE, SOUND_ID_THIRTY, SOUND_ID_TICK } from '../constants';

class HangboardSound extends Component {
  componentDidMount() {
    this.isFirstSound = true;
  }

  componentDidUpdate(prevProps) {
    let { seconds } = this.props;
    if (
      prevProps.seconds !== this.props.seconds ||
      (this.isFirstSound && prevProps.active !== this.props.active)
    ) {
      let soundToBePlayed;
      if (seconds === 30) {
        soundToBePlayed = SOUND_ID_THIRTY;
      }
      else if (seconds === 3) {
        soundToBePlayed = SOUND_ID_THREE;
      }
      else if (seconds === 2) {
        soundToBePlayed = SOUND_ID_TWO;
      }
      else if (seconds === 1) {
        soundToBePlayed = SOUND_ID_ONE;
      }
      else if (seconds > 3 && seconds < 10) {
        soundToBePlayed = SOUND_ID_TICK;
      }
      else {
        return;
      }
      this.playSound(soundToBePlayed);
    }
  }

  playSound(soundId) {
    this.props.queueSound(soundId);
  }

  render() {
    return null;
  }
}

export default HangboardSound;
