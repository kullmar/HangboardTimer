import { connect } from 'react-redux';
import HangboardText from '../components/HangboardText';

const mapStateToProps = state => {
  const { workout } = state;
  const { currentRep, currentSet } = workout;
  return {
    currentRep,
    currentSet,
    totalReps: 7,
    totalSets: 10,
  };
}

export default connect(
  mapStateToProps,
  null,
)(HangboardText);