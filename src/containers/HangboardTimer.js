import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { toggleTimer, tickTimer, setTimer, completeTimer, skipExercise, failSet, queueSound, previousExercise } from '../actions';
import { connect } from 'react-redux';
import Timer from '../components/Timer';
import HangboardTextContainer from './HangboardTextContainer';
import HangboardControls from '../components/HangboardControls';
import HangboardSound from '../components/HangboardSound';
import UpdateBaseline from './UpdateBaseline';
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
      timeRemaining: this.props.routine.finalRest,
    });
  }

  handlePrevious = () => {
    this.props.previousExercise();
    this.stopAndPause();
    this.setState({
      timeRemaining: this.props.routine.hangTime,
    });
  }

  handleSkip = () => {
    this.props.skipExercise();
    this.stopAndPause();
    this.setState({
      timeRemaining: this.props.routine.hangTime,
    });
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

  stopAndPause() {
    this.stop();
    if (this.props.active) {
      this.props.toggleTimer();
    }
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
        <HangboardControls
          onNextSet={this.handleSkip}
          onpreviousExercise={this.handlePrevious}
          onFailSet={this.handleFailure}
        />
        {this.renderSound()}
        <UpdateBaseline />
      </View>
    )
  }

  renderCountdown() {
    if (!this.state.inCountdown) return null;
    return <Countdown seconds={5} onFinished={this.start} />
  }

  renderSound() {
    if (this.props.active && !this.state.inCountdown) {
      const { timeRemaining } = this.state;
      const timeInSeconds = Math.ceil(timeRemaining / 1000);
      return (
        <HangboardSound
          seconds={timeInSeconds}
          queueSound={this.props.queueSound}
        />
      );
    }
    return null;
  }
}

const mapStateToProps = state => {
  const {
    timer: { active },
    workout: {
      currentRep,
      currentSet,
      currentExercise,
      resting,
      routine
    },
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
    previousExercise,
    queueSound,
    setTimer,
    skipExercise,
    tick: tickTimer,
    toggleTimer,
  },
)(HangboardTimer);
