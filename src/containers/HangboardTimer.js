import React, { Component } from 'react';
import { toggleTimer, tickTimer, setTimer } from '../actions';
import { connect } from 'react-redux';
import Timer from '../components/Timer';

class HangboardTimer extends Component {
  componentDidMount() {
    this.props.setTimer(10000);
    this.start();
  }

  componentWillUnmount() {
    this.stop();
  }

  isTimeZero() {
    return this.props.timeRemaining <= 0;
  }

  start() {
    if (this.interval) return;
    this.interval = setInterval(() => {
      if (this.props.active) this.props.tick();
    }, 50);
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval)
      this.interval = null;
    }
  }

  render() {
    const { timeRemaining, active } = this.props;

    return(
      <Timer
        time={timeRemaining}
        active={active}
        onToggle={this.props.toggleTimer}
      />
    )
  }
}

const mapStateToProps = state => {
  const {
    timer: { active, timeRemaining},
  } = state;
  return {
    timeRemaining,
    active,
  };
};

export default connect(
  mapStateToProps,
  {
    setTimer,
    tick: tickTimer,
    toggleTimer,
  },
)(HangboardTimer);
