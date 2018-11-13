import React from 'react';
import { connect } from 'react-redux';
import { getCurrentExercise } from '../reducers';
import UpdateBaselineModal from '../components/UpdateBaselineModal';
import { updateBaseline } from '../actions';

const UpdateBaseline = ({
  showUpdateBaseline,
  baseline,
  grip,
  id,
  updateBaseline
}) => {
  if (!showUpdateBaseline) {
    return null;
  }
  return (
    <UpdateBaselineModal
      baseline={baseline}
      grip={grip}
      onSave={newBaseline => updateBaseline(id, newBaseline)}
    />
  );
};

export default connect(
  state => {
    const exercise = getCurrentExercise(state);
    const { baseline, grip } = exercise;
    const { showUpdateBaseline, currentExercise } = state.workout;
    return {
      baseline,
      grip,
      id: currentExercise - 1,
      showUpdateBaseline
    };
  },
  {
    updateBaseline
  }
)(UpdateBaseline);
