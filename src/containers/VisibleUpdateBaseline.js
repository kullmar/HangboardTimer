import React from 'react';
import { connect } from 'react-redux';
import { getCurrentSet } from '../reducers';
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
    const exercise = getCurrentSet(state);
    const { weight, grip } = exercise;
    const { showUpdateBaseline, currentSet } = state.workout;
    return {
      baseline: weight,
      grip,
      id: currentSet - 1,
      showUpdateBaseline
    };
  },
  {
    updateBaseline
  }
)(VisibleUpdateBaseline);
