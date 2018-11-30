import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import EditExercise from './EditExercise';
import PropTypes from 'prop-types';

const Routine = ({ routine }) => {
  const { baseReps, hangTime, restTime, finalRest } = routine;
  const exercises = routine.exercises.map((exercise, index) => {
    const { grip, baseline, sets } = exercise;
    return (
      <EditExercise
        grip={grip}
        baseline={baseline}
        sets={sets}
        reps={baseReps}
        hangTime={hangTime}
        restTime={restTime}
        finalRest={finalRest}
        key={index}
      />
    );
  });
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{routine.name}</Text>
      <Text style={styles.subtitle}>{routine.board}</Text>
      {exercises}
    </ScrollView>
  );
};

export default Routine;

Routine.propTypes = {
  routine: PropTypes.shape({
    name: PropTypes.string,
    board: PropTypes.string,
    sets: PropTypes.array
  })
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  set: {},
  title: {
    fontWeight: 'bold'
  }
});
