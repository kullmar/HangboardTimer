import { toggleTimer } from '../actions';
import { connect } from 'react-redux';
import Timer from '../components/Timer';

class HangboardTimer extends Component {
  
}

const mapStateToProps = state => {
  const {
    timer: { time, active},
  } = state;
  return {
    time,
    active,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onPauseClick: () => {
      dispatch(toggleTimer());
    },
  };
};

HangboardTimer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Timer);

export default HangboardTimer;
