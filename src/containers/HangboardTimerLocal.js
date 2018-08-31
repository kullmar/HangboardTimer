import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { toggleTimer, tickTimer, setTimer, completeTimer, skipSet } from '../actions';
import { connect } from 'react-redux';
import Timer from '../components/Timer';
import HangboardTextContainer from './HangboardTextContainer';
import HangboardControls from '../components/HangboardControls';
import HangboardSound from '../components/HangboardSound';
import VisibleUpdateBaseline from './VisibleUpdateBaseline';
import { getExercise } from '../utils';

class HangboardTimerLocal extends Component {
  constructor(props) {
    super(props);
    const { routine } = this.props;
    const exercise = getExercise(routine, 1);
    this.state = {
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
    const { currentSet } = this.props;
    return getExercise(routine, currentSet);
  }

  getNextTime() {
    const exercise = this.getCurrentExercise();
    const { currentRep, currentSet } = this.props;
    if (!this.props.resting) {
      return currentRep === exercise.reps ? exercise.finalRest : exercise.restTime;
    }
    const nextSetIndex = this.shouldIncrementSet() ? currentSet + 1 : currentSet;
    return getExercise(this.props.routine, nextSetIndex).hangTime;
  }

  isTimeZero() {
    return this.state.timeRemaining <= 0;
  }

  shouldIncrementSet() {
    const { currentRep, resting } = this.props;
    const exercise = this.getCurrentExercise();
    return currentRep % exercise.reps === 0 && resting;
  }

  handlePrevious = () => {
    this.props.previousSet();
    this.setState({
      timeRemaining: this.getCurrentExercise().hangTime,
    });
  }

  handleSkip = () => {
    this.props.skipSet();
    this.setState({
      timeRemaining: this.getCurrentExercise().finalRest,
    });
  }

  start() {
    if (this.interval) return;
    this.lastActionAt = Date.now();
    this.interval = setInterval(() => {
      if (this.isTimeZero()) {
        this.stop();
        this.setState({
          timeRemaining: this.getNextTime(),
        });
        this.props.completeTimer();
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
      <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
        <Text style={{ fontWeight: 'bold' }}>{this.props.routine.name}</Text>
        <Timer
          time={timeRemaining}
          active={active}
          onToggle={this.props.toggleTimer}
        />
        <HangboardTextContainer />
        <HangboardControls onNextSet={this.handleSkip} onPreviousSet={this.handlePrevious} />
        <HangboardSound seconds={timeInSeconds} active={active} />
        <VisibleUpdateBaseline />
      </View>
    )
  }
}

const mapStateToProps = state => {
  const {
    timer: { active },
    workout: { currentRep, currentSet, resting, routine },
  } = state;
  return {
    active,
    currentRep,
    currentSet,
    resting,
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
