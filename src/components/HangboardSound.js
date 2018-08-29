import { Component } from 'react';
import { Audio } from 'expo';

import one from '../assets/sounds/one.mp3';
import two from '../assets/sounds/two.mp3';
import three from '../assets/sounds/three.mp3';
import tick from '../assets/sounds/tick.mp3';

// const one = require('../assets/sounds/one.mp3');
// const two = require('../assets/sounds/two.mp3');
// const three = require('../assets/sounds/three.mp3');
// const tick = require('../assets/sounds/tick.mp3');

const SOUND_KEY_ONE = 'one';
const SOUND_KEY_TWO = 'two';
const SOUND_KEY_THREE = 'three';
const SOUND_KEY_TICK = 'tick';

class HangboardSound extends Component {
  async componentDidMount() {
    this.sounds = {};
    await Audio.setIsEnabledAsync(true);
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
    });
    await this.loadSound(one, SOUND_KEY_ONE);
    await this.loadSound(two, SOUND_KEY_TWO);
    await this.loadSound(three, SOUND_KEY_THREE);
    await this.loadSound(tick, SOUND_KEY_TICK);
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

  componentWillUnmount() {
    this.releaseSounds();
  }

  async loadSound(sound, soundKey) {
    try {
      this.sounds[soundKey] = await new Audio.Sound();
      await this.sounds[soundKey].loadAsync(sound);
      console.log(`Sound loaded: ${soundKey}`);
    } catch (error) {
      console.log(error);
    }
  }

  async playSound(soundKey) {
    // try {
    //   const soundObject = await new Audio.Sound();
    //   await soundObject.loadAsync(tick);
    //   await soundObject.setPositionAsync(0);
    //   await soundObject.playAsync();
    // } catch (error) {
    //   console.log(error);
    // }
    const soundObject = this.sounds[soundKey];
    console.log(soundObject);
    if (!soundObject) {
      console.log('Sound not found');
      return;
    }
    try {
      await soundObject.setPositionAsync(0);
      await soundObject.playAsync();
    } catch (error) {
      console.log(error);
    }
  }

  releaseSounds() {
    if (!this.sounds) return;
    for (const sound of Object.values(this.sounds)) {
      sound.release();
    }
  }

  render() {
    return null;
  }
}

export default HangboardSound;
