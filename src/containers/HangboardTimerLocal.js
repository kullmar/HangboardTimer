import React, { Component } from 'react';
import { View } from 'react-native';
import { toggleTimer, tickTimer, setTimer, completeTimer, skipSet } from '../actions';
import { connect } from 'react-redux';
import Timer from '../components/Timer';
import HangboardTextContainer from './HangboardTextContainer';
import HangboardControls from '../components/HangboardControls';
import HangboardSound from '../components/HangboardSound';
import { getExercise } from '../utils';

class HangboardTimerLocal extends Component {
  constructor(props) {
    super(props);
    const { routine } = this.props;
    const exercise = getExercise(routine, 1);
    this.state = {
      currentRep: 1,
      currentSet: 1,
      resting: false,
      timeRemaining: exercise.hangTime,
    };
  }

  componentDidMount() {
    if (this.props.active) this.start();
  }

  componentWillUnmount() {
    this.stop();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.active !== this.props.active) {
      this.props.active ? this.start() : this.stop();
    }
  }

  getCurrentExercise() {
    const { routine } = this.props;
    const { currentSet } = this.state;
    return getExercise(routine, currentSet);
  }

  getNextTime() {
    const { currentRep, currentSet } = this.state;
    const exercise = this.getCurrentExercise();
    if (!this.state.resting) {
      return currentRep === exercise.reps ? exercise.finalRest : exercise.restTime;
    }
    const nextSet = this.shouldIncrementSet() ? currentSet + 1 : currentSet;
    return getExercise(this.props.routine, nextSet).hangTime;
  }

  isTimeZero() {
    return this.state.timeRemaining <= 0;
  }

  shouldIncrementSet() {
    const { currentRep } = this.state;
    const exercise = this.getCurrentExercise();
    return currentRep % exercise.reps === 0;
  }

  handlePrevious = () => {
    this.setState({
      currentRep: 1,
      resting: false,
      timeRemaining: this.getCurrentExercise().hangTime,
    });
  }

  handleSkip = () => {
    const exercise = this.getCurrentExercise();
    const currentRep = exercise.reps;
    const timeRemaining = exercise.finalRest;
    this.setState({
      currentRep,
      resting: true,
      timeRemaining,
    });
  }

  start() {
    if (this.interval) return;
    this.lastActionAt = Date.now();
    this.interval = setInterval(() => {
      if (this.isTimeZero()) {
        this.stop();
        this.setState(prevState => ({
          currentRep: this.shouldIncrementSet() ? 1 : prevState.currentRep + 1,
          currentSet: this.shouldIncrementSet() ? prevState.currentSet + 1 : prevState.currentSet,
          timeRemaining: this.getNextTime(),
          resting: !prevState.resting,
        }));
        this.start();
      }
      this.tick();
    }, 50);
  }

  stop() {
    if (!this.interval) return;
    clearInterval(this.interval)
    this.interval = null;
  }

  tick() {
    const now = Date.now();
    this.setState(prevState => ({
      timeRemaining: prevState.timeRemaining - (now - this.lastActionAt)
    }));
    this.lastActionAt = now;
  }

  render() {
    const { active } = this.props;
    const { timeRemaining } = this.state;
    const timeInSeconds = Math.ceil(timeRemaining / 1000);

    return(
      <View style={{flex: 1}}>
        <Timer
          time={timeRemaining}
          active={active}
          onToggle={this.props.toggleTimer}
        />
        <HangboardTextContainer />
        <HangboardControls onNextSet={this.handleSkip} onPreviousSet={this.handlePrevious} />
        <HangboardSound seconds={timeInSeconds} />
      </View>
    )
  }
}

const mapStateToProps = state => {
  const {
    timer: { active },
    workout: { routine },
  } = state;
  return {
    active,
    routine,
  };
};

export default connect(
  mapStateToProps,
  {
    completeTimer,
    setTimer,
    skipSet,
    tick: tickTimer,
    toggleTimer,
  },
)(HangboardTimerLocal);
