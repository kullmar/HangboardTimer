import React from 'react';
import { connect } from 'react-redux';
import { getCurrentExercise } from '../reducers';
import ModalBaseline from '../components/ModalBaseline';
import { updateBaseline } from '../actions';

const VisibleUpdateBaseline = ({
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
    <ModalBaseline
      baseline={baseline}
      grip={grip}
      onSave={newBaseline => updateBaseline(id, newBaseline)}
    />
  );
};

export default connect(
  state => {
    const exercise = getCurrentExercise(state);
    console.log(exercise);
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
)(VisibleUpdateBaseline);
