import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { toggleTimer, tickTimer, setTimer, completeTimer, skipSet, failSet, queueSound } from '../actions';
import { connect } from 'react-redux';
import Timer from '../components/Timer';
import HangboardTextContainer from './HangboardTextContainer';
import HangboardControls from '../components/HangboardControls';
import HangboardSound from '../components/HangboardSound';
import VisibleUpdateBaseline from './VisibleUpdateBaseline';
import Countdown from '../components/Countdown';
import { getExercise } from '../utils';

class HangboardTimer extends Component {
  constructor(props) {
    super(props);
    const {
      routine: {
        hangTime
      }
    } = this.props;
    this.state = {
      inCountdown: false,
      timeRemaining: hangTime,
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
      this.props.active ? this.setState({ inCountdown: true }) : this.stop();
    }
  }

  getCurrentExercise() {
    const { routine } = this.props;
    const { currentExercise } = this.props;
    return getExercise(routine, currentExercise);
  }

  getNextTime() {
    const { hangTime, restTime, finalRest } = this.props.routine;
    if (!this.props.resting) {
      return this.props.currentRep === this.getNumberOfReps() ? finalRest : restTime;
    }
    return hangTime;
  }

  getNumberOfReps() {
    const { routine } = this.props;
    return routine.repsBase -
    (this.props.currentSet - 1) * routine.repsDecrementPerSet;
  }

  isTimeZero() {
    return this.state.timeRemaining <= 0;
  }

  shouldIncrementSet() {
    const { currentRep, resting } = this.props;
    const exercise = this.getCurrentExercise();
    return currentRep % exercise.reps === 0 && resting;
  }

  handleFailure = () => {
    this.props.failSet();
    this.setState({
      timeRemaining: this.getCurrentExercise().hangTime,
    });
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

  renderCountdown() {
    if (!this.state.inCountdown) return null;
    return <Countdown seconds={5} onFinished={this.start} />
  }

  start = () => {
    this.setState({ inCountdown: false });
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
    this.setState({ inCountdown: false });
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
        {this.renderCountdown()}
        <Timer
          time={timeRemaining}
          active={active}
          onToggle={this.props.toggleTimer}
        />
        <HangboardTextContainer />
        <HangboardControls onNextSet={this.handleSkip} onPreviousSet={this.handlePrevious} />
        <HangboardSound seconds={timeInSeconds} active={active} queueSound={this.props.queueSound} />
        <VisibleUpdateBaseline />
      </View>
    )
  }
}

const mapStateToProps = state => {
  const {
    timer: { active },
    workout: { currentRep, currentSet, currentExercise, resting, routine },
  } = state;
  return {
    active,
    currentExercise,
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
    failSet,
    queueSound,
    setTimer,
    skipSet,
    tick: tickTimer,
    toggleTimer,
  },
)(HangboardTimer);
