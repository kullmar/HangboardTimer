import React, { Component } from 'react';
import { View } from 'react-native';
import { toggleTimer, tickTimer, setTimer, completeTimer } from '../actions';
import { connect } from 'react-redux';
import Timer from '../components/Timer';
import HangboardTextContainer from './HangboardTextContainer';

class HangboardTimer extends Component {
  componentDidMount() {
    this.props.setTimer(this.props.duration*1000);
    if (this.props.active) this.start();
  }

  componentWillUnmount() {
    this.stop();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.active !== this.props.active) {
      this.props.active ? this.start() : this.stop();
    }
    if (prevProps.resting !== this.props.resting) {
      this.props.setTimer(this.props.duration*1000);
      this.start();
    }
  }

  isTimeZero() {
    return this.props.timeRemaining <= 0;
  }

  start() {
    if (this.interval) return;
    this.interval = setInterval(() => {
      if (this.isTimeZero()) {
        this.stop();
        this.props.completeTimer();
      }
      this.props.tick();
    }, 50);
  }

  stop() {
    if (!this.interval) return;
    clearInterval(this.interval)
    this.interval = null;
  }

  render() {
    const { timeRemaining, active } = this.props;

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
    training: { duration, resting },
  } = state;
  return {
    timeRemaining,
    active,
    duration,
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
)(HangboardTimer);
