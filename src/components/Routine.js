import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import EditSet from './EditSet';
import PropTypes from 'prop-types';

const Routine = ({ routine }) => {
  const sets = routine.sets.map((set, index) => (
    <EditSet set={set} key={index} />
  ));
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{routine.name}</Text>
      <Text style={styles.subtitle}>{routine.board}</Text>
      {sets}
    </ScrollView>
  );
};

export default Routine;

Routine.propTypes = {
  routine: PropTypes.shape({
    name: PropTypes.string,
    board: PropTypes.string,
    sets: PropTypes.array,
  })
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  set: {

  },
  title: {
    fontWeight: 'bold'
  }
});
