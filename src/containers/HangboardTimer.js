import { toggleTimer } from '../actions';
import { connect } from 'react-redux';
import Timer from '../components/Timer';

const mapStateToProps = state => {
  console.log(state);
  const { time, paused } = state.timer;
  return {
    time,
    paused,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onPauseClick: () => {
      dispatch(toggleTimer());
    },
  };
};

const HangboardTimer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Timer);

export default HangboardTimer;
