import React, { Component } from 'react';
import { View } from 'react-native';
import { toggleTimer, tickTimer, setTimer, completeTimer } from '../actions';
import { connect } from 'react-redux';
import Timer from '../components/Timer';
import { getInitialTime } from '../reducers';
import HangboardTextContainer from './HangboardTextContainer';


class HangboardTimerLocal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeRemaining: this.props.initialTime,
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

  isTimeZero() {
    return this.state.timeRemaining <= 0;
  }

  start() {
    if (this.interval) return;
    this.lastActionAt = Date.now();
    this.interval = setInterval(() => {
      if (this.isTimeZero()) {
        this.stop();
        this.setState({
          timeRemaining: this.props.nextInitialTime,
        });
        this.start();
        this.props.completeTimer();
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

    return(
      <View style={{flex: 1}}>
        <Timer
          time={timeRemaining}
          active={active}
          onToggle={this.props.toggleTimer}
        />
        <HangboardTextContainer />
      </View>
    )
  }
}

const mapStateToProps = state => {
  const {
    timer: { active, timeRemaining},
    workout: { nextInitialTime, resting },
  } = state;
  const initialTime = getInitialTime(state);
  return {
    timeRemaining,
    active,
    initialTime,
    nextInitialTime,
    resting,
  };
};

export default connect(
  mapStateToProps,
  {
    completeTimer,
    setTimer,
    tick: tickTimer,
    toggleTimer,
  },
)(HangboardTimerLocal);
